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

type InboxStackParamList = {
  Messages: undefined;
  Notifications: undefined;
};

type MainTabsParamList = {
  Explore: undefined;
  Saved: undefined;
  MyStudies: undefined;
  ParticipantInbox: undefined;
  ParticipantProfile: undefined;

  Studies: undefined;
  Upcoming: undefined;
  Create: undefined;
  ResearcherInbox: undefined;
  ResearcherProfile: undefined;
};

const Tab = createBottomTabNavigator<MainTabsParamList>();
const Stack = createStackNavigator<InboxStackParamList>();

const InboxStack = () => {
  return (
    <Stack.Navigator>
      <Stack.Screen name="Messages" component={MessagesScreen} />
      <Stack.Screen name="Notifications" component={NotificationsScreen} />
    </Stack.Navigator>
  );
};

const Navigation = () => {
  return (
    <NavigationContainer>
        <Stack.Navigator>
            <Tab.Navigator>
                <Tab.Screen name="Explore" component={ExploreScreen} />
                <Tab.Screen name="Saved" component={SavedScreen} />
                <Tab.Screen name="MyStudies" component={MyStudiesScreen} />
                <Tab.Screen name="ParticipantInbox" component={InboxStack} />
                <Tab.Screen name="ParticipantProfile" component={ParticipantProfileScreen} />
            </Tab.Navigator>
            <Tab.Navigator>
                <Tab.Screen name="Studies" component={StudiesScreen} />
                <Tab.Screen name="Upcoming" component={UpcomingScreen} />
                <Tab.Screen name="Create" component={CreateScreen} />
                <Tab.Screen name="ResearcherInbox" component={InboxStack} />
                <Tab.Screen name="ResearcherProfile" component={ResearcherProfileScreen} />
            </Tab.Navigator>
        </Stack.Navigator>
    </NavigationContainer>
  );
};

export default Navigation;
