import { View, Text, SafeAreaView, ScrollView } from 'react-native'
import React, { useEffect, useState } from 'react'
import AppNavigator from '../../../components/AppNavigator';
import StudyList from '../../../components/StudyList';
import styles from '../../../styles';
import { testTrials } from '../../../utils/testObjs';
import { User, Trial } from '../../../utils/types';
import Header from '../../../components/Header';
import { getTrialFromId, getUserFromId } from '../../../utils/apiCalls';
import { useSelector } from 'react-redux';
import { getCurrentUser } from '../../../stores/userReducer';

const screenName='Studies'

export default function StudiesScreen({navigation} : {navigation: any}) {
  const [user, setUser] = useState<User | null>(null);
  const [study, setStudy] = useState<Trial | null>(null);

  // Create states for pending, upcoming
  const [pending, setPending] = useState<User[]>([]);
  const [upcoming, setUpcoming] = useState<Trial[]>([]);

  // Get current user
  const currentUser = useSelector(getCurrentUser);

  // Function to set pending, upcoming, and all studies
  const setStudies = async () => {
    // Get trials from user
    const newPending: User[] = [];
    const newUpcoming: Trial[] = []; 

    // Get upcoming studies from current user's owned trials
    for (const trial_id in (currentUser?.trials)) {
      const trial_obj = await getTrialFromId(trial_id);
      if (trial_obj) {
          newUpcoming.push(trial_obj);
      }
    }

    // Order upcoming studies by start date
    newUpcoming.sort((a, b) => {
      const aDate = new Date(a.date[0]);
      const bDate = new Date(b.date[0]);
      return aDate.getTime() - bDate.getTime();
    });

    // Get pending requests from current user's requested trials (once it's implemented)
    for (const trial_obj of (newUpcoming)) {
      for (const user_id in (trial_obj.participantRequests)) {
        const user_obj = await getUserFromId(user_id);
        if (user_obj) {
            newPending.push(user_obj);
        }
      }
    }

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
        <Header title='Studies'/>
        <ScrollView showsVerticalScrollIndicator={false} style={{flex: 1, width: '100%'}}>
          <Text style={{fontSize: 20, fontWeight: 'bold', paddingVertical: 16}}>Pending Requests</Text>
          {/* TODO: CREATE COMPONENT TO DISPLAY PEOPLE INSTEAD OF STUDIES */}
          {/* <StudyList data={pending} horizontal onCardPress={onStudyCardPress}/> */}
  
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
