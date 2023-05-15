import { View, Text, SafeAreaView, ScrollView, StyleSheet } from 'react-native'
import React, { useState } from 'react'
import Header from '../../../components/Header'
import { Searchbar } from 'react-native-paper'
import StudyList from '../../../components/StudyList'
import { DataItem } from '../../../components/types'
import styles from '../../../styles'
import { testTrials } from '../../../utils/testObjs'
import { Trial, User } from '../../../utils/types'
import AppNavigator from '../../../components/AppNavigator'

const screenName='MyStudies'

export default function MyStudiesScreen({ navigation }: {navigation: any}) {
  const [user, setUser] = useState<User | null>(null);
  const [study, setStudy] = useState<Trial | null>(null);

  const onStudyCardPress = ({trial}: {trial: Trial}) => {
    setStudy(trial);
    navigation.navigate('StudyInfoScreen' + screenName);
  }

  const onUserPress : ({user}: {user: User}) => void = ({user}: {user: User}) => {
    setUser(user);
    navigation.navigate('ProfileInfoScreen' + screenName);
  }

  function MainPage() {
    return (
      <View style={styles.container}>
        <Header title='My Studies'/>
        <ScrollView showsVerticalScrollIndicator={false} style={{flex: 1, width: '100%'}}>
          <Text style={{fontSize: 20, fontWeight: 'bold', paddingVertical: 16}}>Pending</Text>
          <StudyList data={testTrials} horizontal onCardPress={onStudyCardPress}/>
  
          <Text style={{fontSize: 20, fontWeight: 'bold', paddingVertical: 16}}>Upcoming</Text>
          <StudyList data={testTrials} onCardPress={onStudyCardPress}/>     
  
          <Text style={{fontSize: 20, fontWeight: 'bold', paddingVertical: 16}}>All Studies</Text>
          <StudyList data={testTrials} onCardPress={onStudyCardPress}/>   
        </ScrollView>
      </View>
    )
  }

  return (
    <AppNavigator 
      name={screenName} 
      components={[MainPage]} 
      profileFocusable 
      studyFocusable 
      user={user} 
      trial={study}
      onUserPress={onUserPress}
      />
  )
}
