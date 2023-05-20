import { View, Text, TouchableOpacity, SafeAreaView } from 'react-native'
import React, { useState } from 'react'
import { ProfileStackParamList } from '../../../navigation/types';
import { StackScreenProps } from '@react-navigation/stack';
import { useDispatch, useSelector } from 'react-redux';
import AppNavigator from '../../../components/AppNavigator';
import { getCurrentUser } from '../../../stores/userReducer';
import ProfileScreen from '../../common/ProfileScreen';

const screenName = 'ResearcherProfile'

export default function ResearcherProfileScreen({ navigation }: { navigation: any}) {
  const [user, setUser] = useState(null)
  const [study, setStudy] = useState(null)

  const dispatch = useDispatch()

  const currentUser = useSelector(getCurrentUser);

  const toSettings = () => { 
    navigation.navigate('Settings')
  }

  function MainPage() {
    return (
      <ProfileScreen navigation={navigation} user={currentUser} editable/>
    )
  }

  return (
    <AppNavigator name={screenName} components={[MainPage]} profileFocusable studyFocusable user={user} trial={study}/>
  )
}