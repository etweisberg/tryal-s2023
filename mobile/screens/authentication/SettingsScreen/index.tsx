import { View, Text, TouchableOpacity } from 'react-native'
import React from 'react'
import { StackScreenProps } from '@react-navigation/stack';
import { SettingsStackParamList } from '../../../navigation/types';


type SettingsScreenProps = StackScreenProps<SettingsStackParamList, 'Settings'>;

export default function SettingsScreen({ navigation }: SettingsScreenProps) {
  
  const toPushNotifs = () => {
    navigation.navigate('PushNotifs')
  }

  const toEditProfile = () => {
    navigation.navigate('PushNotifs')
  }

  return (
    <View>
      <Text>SettingsScreen</Text>

      <TouchableOpacity onPress={toPushNotifs} >
        <Text>Notification</Text>
      </TouchableOpacity>

      <TouchableOpacity onPress={toEditProfile} >
        <Text>Edit Profile</Text>
      </TouchableOpacity>
    </View>
    
  )
}