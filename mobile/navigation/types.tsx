import { RouteProp } from "@react-navigation/native";
import { StackScreenProps } from "@react-navigation/stack";

export type InboxStackParamList = {
    Messages: undefined;
    Notifications: undefined;
};

export type SettingsStackParamList = {
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
    MyStudies: undefined;
    ParticipantInbox: undefined;
    ParticipantProfile: undefined;
    ResearcherTabs: undefined;
};

export type ResearcherTabParamList = {
    Studies: undefined;
    Upcoming: undefined;
    Create: undefined;
    ResearcherInbox: undefined;
    ResearcherProfile: undefined;
    ParticipantTabs: undefined;
};

export type RootTabNavigationProp = RouteProp<ResearcherTabParamList, keyof ResearcherTabParamList>;
// export type AuthStackScreenProps = StackScreenProps<MainStackParamList, 'Auth'>;
