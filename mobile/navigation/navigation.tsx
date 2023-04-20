import React from 'react';
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

import MessageScreen from '../screens/general/MessageScreen';
import NotificationsScreen from '../screens/general/NotificationScreen';

import RegisterScreen from '../screens/authentication/RegisterScreen';
import LoginScreen from '../screens/authentication/LoginScreen';

import Icon from "react-native-vector-icons/Ionicons";
import { InboxStackParamList, MainStackParamList, ParticipantTabParamList, ResearcherTabParamList, SettingsStackParamList } from './types';
import SettingsScreen from '../screens/authentication/SettingsScreen';
import PushNotifsScreen from '../screens/authentication/PushNotifsScreen';

const ParticipantTab = createBottomTabNavigator<ParticipantTabParamList>();
const ResearcherTab = createBottomTabNavigator<ResearcherTabParamList>();
const InboxStack = createStackNavigator<InboxStackParamList>();
const SettingsStack = createStackNavigator<SettingsStackParamList>();
const MainStack = createStackNavigator<MainStackParamList>();

function InboxStackScreen() {
  return (
    <InboxStack.Navigator>
      <InboxStack.Screen name="Messages" component={MessageScreen} />
      <InboxStack.Screen name="Notifications" component={NotificationsScreen} />
    </InboxStack.Navigator>
  );
};

function SettingsStackScreen() {
    return (
      <SettingsStack.Navigator>
        <SettingsStack.Screen name="Settings" component={SettingsScreen} />
        <SettingsStack.Screen name="PushNotifs" component={PushNotifsScreen} />
        <SettingsStack.Screen name="EditProfile" component={NotificationsScreen} />
      </SettingsStack.Navigator>
    );
  };
  

function ResearcherTabScreen() {
    return (
        <ResearcherTab.Navigator
        initialRouteName="Studies"
        screenOptions={({ route }) => ({
          tabBarIcon: ({ color, size }) => {
            let iconName = '';
            if (route.name === 'Studies') {
              iconName = "search-circle-outline";
            } else if (route.name === "Upcoming") {
              iconName = "calendar-outline";
            } else if (route.name === "Create") {
              iconName = "add-circle-outline";
            } else if (route.name === "ResearcherInbox") {
              iconName = "chatbox-outline";
            } else if (route.name === "ResearcherProfile") {
              iconName = "person-outline";
            }
            return <Icon name={iconName} size={size} color={color} />;
          },
        })}
        >
            <ResearcherTab.Screen name="Studies" component={StudiesScreen} />
            <ResearcherTab.Screen name="Upcoming" component={UpcomingScreen} />
            <ResearcherTab.Screen name="Create" component={CreateScreen} />
            <ResearcherTab.Screen name="ResearcherInbox" component={InboxStackScreen} />
            <ResearcherTab.Screen name="ResearcherProfile" component={ResearcherProfileScreen} />
        </ResearcherTab.Navigator>
    )
}

function ParticipantTabScreen() {
    return (
        <ParticipantTab.Navigator
        initialRouteName="Explore"
        screenOptions={({ route }) => ({
          tabBarIcon: ({ color, size }) => {
            let iconName = '';
            if (route.name === 'Explore') {
              iconName = "search-circle-outline";
            } else if (route.name === "Saved") {
              iconName = "bookmark-outline";
            } else if (route.name === "MyStudies") {
              iconName = "book-outline";
            } else if (route.name === "ParticipantInbox") {
              iconName = "chatbox-outline";
            } else if (route.name === "ParticipantProfile") {
              iconName = "person-outline";
            }
            return <Icon name={iconName} size={size} color={color} />;
          },
        })}
        >
            <ParticipantTab.Screen name="Explore" component={ExploreScreen} />
            <ParticipantTab.Screen name="Saved" component={SavedScreen} />
            <ParticipantTab.Screen name="MyStudies" component={MyStudiesScreen} />
            <ParticipantTab.Screen name="ParticipantInbox" component={InboxStackScreen} />
            <ParticipantTab.Screen name="ParticipantProfile" component={ParticipantProfileScreen} />
        </ParticipantTab.Navigator>
    )
}

export default function Navigation() {
  return (
    <NavigationContainer>
        <MainStack.Navigator>
            <MainStack.Screen name="Register" component={RegisterScreen} />
            <MainStack.Screen name="Login" component={LoginScreen} />
            <MainStack.Screen name="ParticipantTabs" component={ParticipantTabScreen} />
            <MainStack.Screen name="ResearcherTabs" component={ResearcherTabScreen} />
        </MainStack.Navigator>
    </NavigationContainer>
  );
};