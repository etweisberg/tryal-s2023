import { View, Text, TouchableOpacity, SafeAreaView } from 'react-native'
import React from 'react'
import { StackScreenProps } from '@react-navigation/stack';
import { ProfileStackParamList } from '../../../navigation/types';


type SettingsScreenProps = StackScreenProps<ProfileStackParamList, 'Settings'>;

export default function SettingsScreen({ navigation }: SettingsScreenProps) {
  
  const toPushNotifs = () => {
    navigation.navigate('PushNotifs')
  }

  const toEditProfile = () => {
    navigation.navigate('EditProfile')
  }

  const switchTabs = (userType: string) => {
    if (userType === 'researcher') {
      navigation.navigate('ParticipantTabs')
    } else {
      navigation.navigate('ResearcherTabs')
    }
  }

  return (
    <SafeAreaView>
      <Text>SettingsScreen</Text>

      <TouchableOpacity onPress={toPushNotifs} >
        <Text>Notifications</Text>
      </TouchableOpacity>

      <TouchableOpacity onPress={toEditProfile} >
        <Text>Edit Profile</Text>
      </TouchableOpacity>

      <TouchableOpacity onPress={toEditProfile} >
        <Text>Edit Profile</Text>
      </TouchableOpacity>
    </SafeAreaView>
    
  )
}