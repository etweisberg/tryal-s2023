import { View, Text, TouchableOpacity, SafeAreaView } from 'react-native'
import React, { useState } from 'react'
import AppNavigator from '../../../components/AppNavigator'
import ProfileScreen from '../../common/ProfileScreen'
import { useDispatch, useSelector } from 'react-redux'
import { getCurrentUser } from '../../../stores/userReducer'

const screenName = 'ParticipantProfile'

export default function ParticipantProfileScreen({ navigation }: {navigation: any}) {
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