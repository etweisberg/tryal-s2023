import React, { useState } from 'react';
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
import { getCurrentUser } from '../stores/userReducer';
import LoadingScreen from '../screens/general/LoadingScreen';
import InboxScreen from '../screens/general/InboxScreen';
import AppNavigator from '../components/AppNavigator';


const ParticipantTab = createBottomTabNavigator<ParticipantTabParamList>();
const ResearcherTab = createBottomTabNavigator<ResearcherTabParamList>();
const ProfileStack = createStackNavigator<ProfileStackParamList>();
const MainStack = createStackNavigator<MainStackParamList>();
const AuthStack = createStackNavigator<AuthStackParamList>();


function ProfileStackScreen({userType}: {userType: string}) {
    return (
      <ProfileStack.Navigator screenOptions={{
        headerShown: false
      }}>
        {/* Show Participant Profile if participant, Researcher Profile otherwise */}
        {userType === "participant" ? (
          <ProfileStack.Screen name="MainProfile" component={ParticipantProfileScreen} />
        ) : (
          <ProfileStack.Screen name="MainProfile" component={ResearcherProfileScreen} />
        )}
        <ProfileStack.Screen name="Settings" component={SettingsScreen} />
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
  

function ResearcherTabScreen() {
    return (
      <ResearcherTab.Navigator
      initialRouteName="Studies"
      screenOptions={({ route }) => ({
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
        <ResearcherTab.Screen name="Studies" >
          {() => AppNavigator({components: [StudiesScreen], profileFocusable: true, studyFocusable: true})}
        </ResearcherTab.Screen>

        <ResearcherTab.Screen name="Upcoming">
          {() => AppNavigator({components: [UpcomingScreen], profileFocusable: true, studyFocusable: true})}
        </ResearcherTab.Screen>

        <ResearcherTab.Screen name="Create">
          {() => AppNavigator({components: [CreateScreen], profileFocusable: true, studyFocusable: true})}
        </ResearcherTab.Screen>

        <ResearcherTab.Screen name="Inbox">
          {() => AppNavigator({components: [InboxScreen], profileFocusable: true, studyFocusable: true})}
        </ResearcherTab.Screen>

        <ResearcherTab.Screen name="Profile">
          {() => AppNavigator({components: [<ProfileStackScreen userType='researcher' />], profileFocusable: true, studyFocusable: true})}
        </ResearcherTab.Screen>
      </ResearcherTab.Navigator>
    )
}

function ParticipantTabScreen({navigation}: {navigation: any}) {
    return (
      <ParticipantTab.Navigator
      initialRouteName="Explore"
      screenOptions={({ route }) => ({
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
          {/* {() => AppNavigator({components: [ExploreScreen], profileFocusable: true, studyFocusable: true})} */}
        {/* </ParticipantTab.Screen> */}

        <ParticipantTab.Screen name="Saved">
          {() => AppNavigator({components: [<SavedScreen navigation={navigation}/>], profileFocusable: true, studyFocusable: true})}
        </ParticipantTab.Screen>

        <ParticipantTab.Screen name="My Studies">
        {() => AppNavigator({components: [MyStudiesScreen], profileFocusable: true, studyFocusable: true})}
        </ParticipantTab.Screen>

        <ParticipantTab.Screen name="Inbox">
        {() => AppNavigator({components: [InboxScreen], profileFocusable: true, studyFocusable: true})}
        </ParticipantTab.Screen>

        <ParticipantTab.Screen name="Profile">
          {() => AppNavigator({components: [<ProfileStackScreen userType='participant' />], profileFocusable: true, studyFocusable: true})}
        </ParticipantTab.Screen>        
      </ParticipantTab.Navigator>
    )
}

export default function Navigation() {
  const [loading, setLoading] = useState(false)
  const user = useSelector((state: RootState) => getCurrentUser(state));
  console.log('user');
  console.log(user);

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

        { user && user["admin"] ? (
          <MainStack.Screen name="ResearcherTabs" component={ResearcherTabScreen} />
        ) : null }

      </MainStack.Navigator>
    </NavigationContainer>
  );
};