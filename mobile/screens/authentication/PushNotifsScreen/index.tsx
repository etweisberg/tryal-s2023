import { View, Text, TouchableOpacity } from 'react-native'
import React from 'react'
import { StackScreenProps } from '@react-navigation/stack';
import { SettingsStackParamList } from '../../../navigation/types';


type PushNotifsScreenProps = StackScreenProps<SettingsStackParamList, 'PushNotifs'>;

export default function PushNotifsScreen({ navigation }: PushNotifsScreenProps) {
  
  const toSettings = () => {
    navigation.navigate('Settings')
  }

  return (
    <View>
      <Text>PushNotifsScreen</Text>

      <TouchableOpacity onPress={toSettings} >
        <Text>Back</Text>
      </TouchableOpacity>
    </View>
    
  )
}