import { View, Text, TouchableOpacity, SafeAreaView } from 'react-native'
import React from 'react'
import { ProfileStackParamList } from '../../../navigation/types';
import { StackScreenProps } from '@react-navigation/stack';

type ProfileScreenProps = StackScreenProps<ProfileStackParamList, 'MainProfile'>;

export default function ParticipantProfileScreen({ navigation }: ProfileScreenProps) {

  const toSettings = () => { 
    navigation.navigate('Settings')
  }

  return (
    <SafeAreaView>
      <Text>ParticipantProfileScreen</Text>
      <TouchableOpacity onPress={toSettings} >
        <Text>Settings</Text>
      </TouchableOpacity>
    </SafeAreaView>
  )
}