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

import MessagesScreen from '../screens/general/MessageScreen';
import NotificationsScreen from '../screens/general/NotificationScreen';

import RegisterScreen from '../screens/authentication/RegisterScreen';
import LoginScreen from '../screens/authentication/LoginScreen';

type InboxStackParamList = {
    Messages: undefined;
    Notifications: undefined;
};

type AuthStackParamList = {
    Register: undefined;
    Login: undefined;
};

type MainStackParamList = {
    Auth: undefined;
    ParticipantTabs: undefined;
    ResearcherTabs: undefined;
};

type ParticipantTabParamList = {
    Explore: undefined;
    Saved: undefined;
    MyStudies: undefined;
    ParticipantInbox: undefined;
    ParticipantProfile: undefined;
}
type ResearcherTabParamList = {
    Studies: undefined;
    Upcoming: undefined;
    Create: undefined;
    ResearcherInbox: undefined;
    ResearcherProfile: undefined;
};

const ParticipantTab = createBottomTabNavigator<ParticipantTabParamList>();
const ResearcherTab = createBottomTabNavigator<ResearcherTabParamList>();
const InboxStack = createStackNavigator<InboxStackParamList>();
const AuthStack = createStackNavigator<AuthStackParamList>();
const MainStack = createStackNavigator<MainStackParamList>();


const InboxStackScreen = () => {
  return (
    <InboxStack.Navigator>
      <InboxStack.Screen name="Messages" component={MessagesScreen} />
      <InboxStack.Screen name="Notifications" component={NotificationsScreen} />
    </InboxStack.Navigator>
  );
};

const AuthStackScreen = () => {
    return (
    <AuthStack.Navigator>
      <AuthStack.Screen name="Register" component={RegisterScreen} />
      <AuthStack.Screen name="Login" component={LoginScreen} />
    </AuthStack.Navigator>
    )
}

const ResearcherTabScreen = () => {
    return (
        <ResearcherTab.Navigator>
            <ResearcherTab.Screen name="Studies" component={StudiesScreen} />
            <ResearcherTab.Screen name="Upcoming" component={UpcomingScreen} />
            <ResearcherTab.Screen name="Create" component={CreateScreen} />
            <ResearcherTab.Screen name="ResearcherInbox" component={InboxStackScreen} />
            <ResearcherTab.Screen name="ResearcherProfile" component={ResearcherProfileScreen} />
        </ResearcherTab.Navigator>
    )
}

const ParticipantTabScreen = () => {
    return (
        <ParticipantTab.Navigator>
            <ParticipantTab.Screen name="Explore" component={ExploreScreen} />
            <ParticipantTab.Screen name="Saved" component={SavedScreen} />
            <ParticipantTab.Screen name="MyStudies" component={MyStudiesScreen} />
            <ParticipantTab.Screen name="ParticipantInbox" component={InboxStackScreen} />
            <ParticipantTab.Screen name="ParticipantProfile" component={ParticipantProfileScreen} />
        </ParticipantTab.Navigator>
    )
}

const Navigation = () => {
  return (
    <NavigationContainer>
        <MainStack.Navigator>
            <MainStack.Screen name="Auth" component={AuthStackScreen} />
            <MainStack.Screen name="ParticipantTabs" component={ParticipantTabScreen} />
            <MainStack.Screen name="ResearcherTabs" component={ResearcherTabScreen} />
        </MainStack.Navigator>
    </NavigationContainer>
  );
};

export default Navigation;
