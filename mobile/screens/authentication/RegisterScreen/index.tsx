import { View, Text, TouchableOpacity, SafeAreaView } from 'react-native'
import React from 'react'
import { StackScreenProps } from '@react-navigation/stack';
import { MainStackParamList } from '../../../navigation/types';


type RegisterScreenProps = StackScreenProps<MainStackParamList, 'Register'>;

export default function RegisterScreen({ navigation }: RegisterScreenProps) {
  
  const toLogin = () => {
    navigation.navigate('Login')
  }

  const toParticipantTabs = () => {
    navigation.navigate('ParticipantTabs')
  }

  return (
    <SafeAreaView>
      <Text>RegisterScreen</Text>

      <TouchableOpacity onPress={toLogin} >
        <Text>Go to Login Screen</Text>
      </TouchableOpacity>

      <TouchableOpacity onPress={toParticipantTabs} >
        <Text>Continue as Guest</Text>
      </TouchableOpacity>
    </SafeAreaView>
    
  )
}