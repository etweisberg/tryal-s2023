import { View, Text, TouchableOpacity } from 'react-native'
import React from 'react'
import { StackScreenProps } from '@react-navigation/stack';
import { ProfileStackParamList } from '../../../navigation/types';

type EditProfileScreenProps = StackScreenProps<ProfileStackParamList, 'EditProfile'>;

export default function EditProfileScreen({ navigation }: EditProfileScreenProps) {
  
  const toSettings = () => {
    navigation.navigate('Settings')
  }

  return (
    <View>
      <Text>EditProfileScreen</Text>

      <TouchableOpacity onPress={toSettings} >
        <Text>Back</Text>
      </TouchableOpacity>
    </View>
    
  )
}