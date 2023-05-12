import { View, Text } from 'react-native'
import React from 'react'
import { Trial } from '../../../utils/types'

export default function StudyScreen({trial}: {trial: Trial | null}) {
  return (
    <View>
      <Text>StudyScreen</Text>
    </View>
  )
}