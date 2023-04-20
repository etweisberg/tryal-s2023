import { View, Text, TouchableOpacity } from 'react-native'
import React from 'react'
import { ResearcherTabParamList } from '../../../navigation/types';
import { StackScreenProps } from '@react-navigation/stack';

type ProfileScreenProps = StackScreenProps<ResearcherTabParamList, 'ResearcherProfile'>;

export default function ResearcherProfileScreen({ navigation }: ProfileScreenProps) {
  
  const toParticipantTabs = () => {
    navigation.navigate('ParticipantTabs')
  }

  return (
    <View>
      <Text>ResearcherProfileScreen</Text>
      <TouchableOpacity onPress={toParticipantTabs} >
        <Text>Switch to Researcher Screen</Text>
      </TouchableOpacity>
    </View>
  )
}