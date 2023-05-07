import { View, Text, TouchableOpacity, SafeAreaView } from 'react-native'
import React from 'react'
import { StackScreenProps } from '@react-navigation/stack';
import { InboxStackParamList } from '../../../navigation/types';

type MessageScreenProps = StackScreenProps<InboxStackParamList, 'Messages'>;

export default function MessageScreen({ navigation }: MessageScreenProps) {
  const toNotifications = () => {
    navigation.navigate('Notifications')
  }

  return (
    <SafeAreaView>
      <Text>MessageScreen</Text>
      <TouchableOpacity onPress={toNotifications} >
        <Text>Switch to Notifications</Text>
      </TouchableOpacity>
    </SafeAreaView>
  )
}