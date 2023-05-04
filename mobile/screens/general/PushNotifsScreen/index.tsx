import { View, Text, TouchableOpacity, SafeAreaView } from 'react-native'
import React from 'react'
import { StackScreenProps } from '@react-navigation/stack';
import { ProfileStackParamList } from '../../../navigation/types';


type PushNotifsScreenProps = StackScreenProps<ProfileStackParamList, 'PushNotifs'>;

export default function PushNotifsScreen({ navigation }: PushNotifsScreenProps) {
  
  const toSettings = () => {
    navigation.navigate('Settings')
  }

  return (
    <SafeAreaView>
      <Text>PushNotifsScreen</Text>

      <TouchableOpacity onPress={toSettings} >
        <Text>Back</Text>
      </TouchableOpacity>
    </SafeAreaView>
    
  )
}