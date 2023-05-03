import { RouteProp } from "@react-navigation/native";
import { StackScreenProps } from "@react-navigation/stack";
import { Component, ReactNode } from "react";

export type InboxStackParamList = {
    Messages: undefined;
    Notifications: undefined;
};

export type ProfileStackParamList = {
    ParticipantTabs: undefined;
    ResearcherTabs: undefined;
    MainProfile: undefined;
    Settings: undefined;
    PushNotifs: undefined;
    EditProfile: undefined;
};

export type AuthStackParamList = {
    Register: undefined;
    Login: undefined;
};

export type MainStackParamList = {
    Register: undefined;
    Login: undefined;
    ParticipantTabs: undefined;
    ResearcherTabs: undefined;
};

export type ParticipantTabParamList = {
    Explore: undefined;
    Saved: undefined;
    "My Studies": undefined;
    Inbox: undefined;
    Profile: undefined;
    ResearcherTabs: undefined;
};

export type ResearcherTabParamList = {
    Studies: undefined;
    Upcoming: undefined;
    Create: undefined;
    Inbox: undefined;
    Profile: undefined;
    ParticipantTabs: undefined;
};

export type RootTabNavigationProp = RouteProp<ResearcherTabParamList, keyof ResearcherTabParamList>;
