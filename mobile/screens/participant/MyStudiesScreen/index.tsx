import { View, Text, SafeAreaView, ScrollView, StyleSheet } from 'react-native'
import React, { useEffect, useState } from 'react'
import Header from '../../../components/Header'
import { Searchbar } from 'react-native-paper'
import StudyList from '../../../components/StudyList'
import { DataItem } from '../../../components/types'
import styles from '../../../styles'
import { testTrials } from '../../../utils/testObjs'
import { Trial, User } from '../../../utils/types'
import AppNavigator from '../../../components/AppNavigator'
import { getCurrentUser } from '../../../stores/userReducer'
import { useSelector } from 'react-redux'
import { getTrialFromId } from '../../../utils/apiCalls'

const screenName='MyStudies'

export default function MyStudiesScreen({ navigation }: {navigation: any}) {
  const [user, setUser] = useState<User | null>(null);
  const [study, setStudy] = useState<Trial | null>(null);

  // Create states for pending, upcoming
  const [pending, setPending] = useState<Trial[]>([]);
  const [upcoming, setUpcoming] = useState<Trial[]>([]);

  // Get current user
  const currentUser = useSelector(getCurrentUser);

  // Function to set pending, upcoming, and all studies
  const setStudies = async () => {
    // Get trials from user
    const newPending: Trial[] = [];
    const newUpcoming: Trial[] = []; 

    // Get upcoming studies from current user's trials
    for (const trial_id in (currentUser?.trials)) {
      const trial_obj = await getTrialFromId(trial_id);
      if (trial_obj) {
          newUpcoming.push(trial_obj);
      }
    }

    // Get pending studies from current user's requested trials (once it's implemented)
    for (const trial_id in (currentUser?.requestedTrials)) {
      const trial_obj = await getTrialFromId(trial_id);
      if (trial_obj) {
          newPending.push(trial_obj);
      }
    }

    // Order upcoming studies by start date
    newUpcoming.sort((a, b) => {
      const aDate = new Date(a.date[0]);
      const bDate = new Date(b.date[0]);
      return aDate.getTime() - bDate.getTime();
    });

    // Set states
    setPending(newPending);
    setUpcoming(newUpcoming);
  }

  // Set studies on load
  useEffect(() => {
    setStudies();
  }, [])

  const onStudyCardPress = ({trial}: {trial: Trial}) => {
    setStudy(trial);
    navigation.navigate('StudyInfoScreen' + screenName);
  }

  const onUserPress = ({user}: {user: User | null}) => {
    setUser(user);
    navigation.navigate('ProfileInfoScreen' + screenName);
  }

  function MainPage() {
    return (
      <View style={styles.container}>
        <Header title='My Studies'/>
        <ScrollView showsVerticalScrollIndicator={false} style={{flex: 1, width: '100%'}}>
          <Text style={{fontSize: 20, fontWeight: 'bold', paddingVertical: 16}}>Pending</Text>
          <StudyList data={pending} horizontal onCardPress={onStudyCardPress}/>
  
          <Text style={{fontSize: 20, fontWeight: 'bold', paddingVertical: 16}}>Upcoming</Text>
          <StudyList data={upcoming} onCardPress={onStudyCardPress}/>     
  
          {/* <Text style={{fontSize: 20, fontWeight: 'bold', paddingVertical: 16}}>All Studies</Text>
          <StudyList data={testTrials} onCardPress={onStudyCardPress}/>    */}
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
