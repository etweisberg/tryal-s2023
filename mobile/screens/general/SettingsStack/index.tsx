import { View, Text, TouchableOpacity } from 'react-native'
import React from 'react'
import { StackScreenProps } from '@react-navigation/stack';
import { InboxStackParamList } from '../../../navigation/types';

type NotificationScreenProps = StackScreenProps<InboxStackParamList, 'Notifications'>;

export default function NotificationScreen({ navigation }: NotificationScreenProps) {
  const toMessages = () => {
    navigation.navigate('Messages')
  }

  return (
    <View>
      <Text>NotificationScreen</Text>
      <TouchableOpacity onPress={toMessages} >
        <Text>Switch to Researcher Screen</Text>
      </TouchableOpacity>
    </View>
  )
}