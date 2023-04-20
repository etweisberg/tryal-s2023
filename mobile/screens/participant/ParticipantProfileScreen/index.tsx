import { View, Text, TouchableOpacity } from 'react-native'
import React from 'react'
import { StackScreenProps } from '@react-navigation/stack';
import { ParticipantTabParamList } from '../../../navigation/types';

type ProfileScreenProps = StackScreenProps<ParticipantTabParamList, 'ParticipantProfile'>;

export default function ParticipantProfileScreen({ navigation }: ProfileScreenProps) {
  const toResearcherTabs = () => {
    navigation.navigate('ResearcherTabs')
  }

  return (
    <View>
      <Text>ParticipantProfileScreen</Text>

      <TouchableOpacity onPress={toResearcherTabs} >
        <Text>Switch to Researcher Screen</Text>
      </TouchableOpacity>
    </View>
  )
}