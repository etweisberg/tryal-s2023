import { View, Text, SafeAreaView, ScrollView } from 'react-native'
import React, { useState } from 'react'
import AppNavigator from '../../../components/AppNavigator';
import StudyList from '../../../components/StudyList';
import styles from '../../../styles';
import { testTrials } from '../../../utils/testObjs';
import { User, Trial } from '../../../utils/types';
import Header from '../../../components/Header';

const screenName = 'Upcoming'

export default function UpcomingScreen({ navigation }: { navigation: any}) {
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
        <Header title='Upcoming'/>
        <ScrollView showsVerticalScrollIndicator={false} style={{flex: 1, width: '100%'}}>
          {/* <Text style={{fontSize: 20, fontWeight: 'bold', paddingVertical: 16}}>Upcoming</Text> */}
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