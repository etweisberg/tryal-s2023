import { View, Text, TouchableOpacity } from 'react-native'
import React from 'react'
import { StackScreenProps } from '@react-navigation/stack';
import { SettingsStackParamList } from '../../../navigation/types';


type EditProfileScreenProps = StackScreenProps<SettingsStackParamList, 'EditProfile'>;

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