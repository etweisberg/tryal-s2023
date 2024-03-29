import React, { useEffect, useState } from 'react';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { createStackNavigator } from '@react-navigation/stack';
import { NavigationContainer } from '@react-navigation/native';

import ExploreScreen from '../screens/participant/ExploreScreen';
import SavedScreen from '../screens/participant/SavedScreen';
import MyStudiesScreen from '../screens/participant/MyStudiesScreen';
import ParticipantProfileScreen from '../screens/participant/ParticipantProfileScreen';

import StudiesScreen from '../screens/researcher/StudiesScreen';
import UpcomingScreen from '../screens/researcher/UpcomingScreen';
import CreateScreen from '../screens/researcher/CreateScreen';
import ResearcherProfileScreen from '../screens/researcher/ResearcherProfileScreen';

import RegisterScreen from '../screens/authentication/RegisterScreen';
import LoginScreen from '../screens/authentication/LoginScreen';

import Icon from "react-native-vector-icons/Ionicons";
import {
  MainStackParamList, 
  ParticipantTabParamList, 
  ResearcherTabParamList, 
  ProfileStackParamList, 
  AuthStackParamList} from './types';
import SettingsScreen from '../screens/general/SettingsScreen';
import PushNotifsScreen from '../screens/general/PushNotifsScreen';
import EditProfileScreen from '../screens/general/EditProfileScreen';

import { useSelector } from 'react-redux';
import { RootState } from '../stores';
import { getCurrentUser, getView } from '../stores/userReducer';
import LoadingScreen from '../screens/general/LoadingScreen';
import ChatScreen from '../screens/common/ChatScreen';
import MessageScreen from '../screens/general/MessageScreen';
import ResearcherAuthScreen from '../screens/authentication/ResearcherAuthScreen';
import { TouchableOpacity, View, Text } from 'react-native';
import styles from '../styles';
import RedirectScreen from '../screens/authentication/RedirectScreen';


const ParticipantTab = createBottomTabNavigator<ParticipantTabParamList>();
const ResearcherTab = createBottomTabNavigator<ResearcherTabParamList>();
const ProfileStack = createStackNavigator<ProfileStackParamList>();
const MainStack = createStackNavigator<MainStackParamList>();
const AuthStack = createStackNavigator<AuthStackParamList>();


function ProfileStackScreen({navigation}: {navigation: any}) {
  const view = useSelector(getView);
    return (
      <ProfileStack.Navigator screenOptions={{
        headerShown: false
      }}>
        {/* Show Participant Profile if participant, Researcher Profile otherwise */}
        {view === "participant" ? (
          <ProfileStack.Screen name="MainProfile" component={ParticipantProfileScreen} />
        ) : (
          <ProfileStack.Screen name="MainProfile" component={ResearcherProfileScreen} />
        )}
        <ProfileStack.Screen name="Settings">
          {() => <SettingsScreen navigation={navigation}/>}
        </ProfileStack.Screen>
        <ProfileStack.Screen name="PushNotifs" component={PushNotifsScreen} />
        <ProfileStack.Screen name="EditProfile" component={EditProfileScreen} />
      </ProfileStack.Navigator>
    );
  };

function AuthStackScreen() {
  return (
    <AuthStack.Navigator screenOptions={{
      headerShown: false
    }}>
      <AuthStack.Screen name="Login" component={LoginScreen} />
      <AuthStack.Screen name="Register" component={RegisterScreen} />
    </AuthStack.Navigator>
  );
};
  

function ResearcherTabScreen({navigation}: {navigation: any}) {
    return (
      <ResearcherTab.Navigator
      initialRouteName="Studies"
      screenOptions={({ route }) => ({
        // tabBarActiveBackgroundColor: '#195064',
        // tabBarActiveTintColor: 'white',
        // tabBarInactiveBackgroundColor: '#195064',
        // tabBarStyle: {
        //   height: 50,
        //   borderBottomWidth: 5,
        //   borderTopWidth: 5,
        //   borderColor: '#195064'
        // },
        headerShown: false,
        tabBarIcon: ({ color, size }) => {
          let iconName = '';
          if (route.name === 'Studies') {
            iconName = "search-circle-outline";
          } else if (route.name === "Upcoming") {
            iconName = "calendar-outline";
          } else if (route.name === "Create") {
            iconName = "add-circle-outline";
          } else if (route.name === "Inbox") {
            iconName = "chatbox-outline";
          } else if (route.name === "Profile") {
            iconName = "person-outline";
          }
          return <Icon name={iconName} size={size} color={color} />;
        },
      })}
      >
        <ResearcherTab.Screen name="Studies" component={StudiesScreen}/>
        <ResearcherTab.Screen name="Upcoming" component={RedirectScreen}/>
        <ResearcherTab.Screen name="Create" component={CreateScreen}/>
        <ResearcherTab.Screen name="Inbox" component={MessageScreen}/>
        <ResearcherTab.Screen name="Profile" >
          {() => <ProfileStackScreen navigation={navigation} />}
        </ResearcherTab.Screen>
      </ResearcherTab.Navigator>
    )
}

function ParticipantTabScreen({navigation}: {navigation: any}) {
  const user = useSelector(getCurrentUser);

    return (
      <ParticipantTab.Navigator
      initialRouteName="Explore"
      screenOptions={({ route }) => ({
        // tabBarActiveBackgroundColor: '#195064',
        // tabBarActiveTintColor: 'white',
        // // tabBarInactiveTintColor: 'white',
        // tabBarInactiveBackgroundColor: '#195064',
        // tabBarStyle: {
        //   height: 50,
        //   borderBottomWidth: 5,
        //   borderTopWidth: 5,
        //   borderBottomColor: '#195064',
        //   borderTopColor: '#195064'
        // },
        headerShown: false,
        tabBarIcon: ({ color, size }) => {
          let iconName = '';
          if (route.name === 'Explore') {
            iconName = "search-circle-outline";
          } else if (route.name === "Saved") {
            iconName = "bookmark-outline";
          } else if (route.name === "My Studies") {
            iconName = "book-outline";
          } else if (route.name === "Inbox") {
            iconName = "chatbox-outline";
          } else if (route.name === "Profile") {
            iconName = "person-outline";
          }
          return <Icon name={iconName} size={size} color={color} />;
        },
      })}
      >
        <ParticipantTab.Screen name="Explore" component={ExploreScreen}/>
        <ParticipantTab.Screen name="Saved" component={user ? RedirectScreen : RedirectScreen}/>
        <ParticipantTab.Screen name="My Studies" component={user ? MyStudiesScreen : RedirectScreen}/>
        <ParticipantTab.Screen name="Inbox" component={user ? MessageScreen : RedirectScreen}/>
        <ParticipantTab.Screen name="Profile">
        {  // Show Screen only if logged in 
          user ? 
          () => <ProfileStackScreen navigation={navigation} />
          :
          () => <RedirectScreen navigation={navigation}/>
        }
        </ParticipantTab.Screen>
               
      </ParticipantTab.Navigator>
    )
}

export default function Navigation() {
  const [loading, setLoading] = useState(false)
  const user = useSelector((state: RootState) => getCurrentUser(state));
  // console.log("Current user:" + user?.firstName + " " + user?.lastName);

  return (
    <NavigationContainer>
      <MainStack.Navigator screenOptions={{
        headerShown: false,
        cardStyle: { backgroundColor: 'white', flex: 1 },
        }}>
        
        {loading ? (
          // This screen is only visible while the app is loading
          <MainStack.Screen name="Loading" component={LoadingScreen} />
        ) : (!user) ? (
          <MainStack.Screen name="Auth" component={AuthStackScreen} />
        ) : null }
        
        <MainStack.Screen name="ParticipantTabs" component={ParticipantTabScreen} />
        <MainStack.Screen name="Chat" component={ChatScreen} />
        <MainStack.Screen name="ResearcherAuth" component={ResearcherAuthScreen} />

        { user && user.researcher ? (
          <MainStack.Screen name="ResearcherTabs" component={ResearcherTabScreen} />
        ) : null }

      </MainStack.Navigator>
    </NavigationContainer>
  );
};