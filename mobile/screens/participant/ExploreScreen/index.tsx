import { View, Text, SafeAreaView, FlatList, StyleSheet, RefreshControl } from 'react-native'
import React, { useEffect } from 'react'
import { useState } from 'react'
import { ScrollView } from 'react-native-gesture-handler'
import Header from '../../../components/Header'
import { Searchbar, Card, Divider } from 'react-native-paper'
import StudyList from '../../../components/StudyList'
import AppNavigator from '../../../components/AppNavigator'
import styles from '../../../styles'
import { Trial, User } from '../../../utils/types'
import { testTrials } from '../../../utils/testObjs'
import { useSelector } from 'react-redux'
import { getCurrentUser } from '../../../stores/userReducer'
import { getTrialFromId, serverUrl } from '../../../utils/apiCalls'

const screenName = 'Explore'

export default function ExploreScreen({navigation}: {navigation: any}) {
  const [refreshing, setRefreshing] = useState(false);

  const onRefresh = React.useCallback(() => {
    setRefreshing(true);
    setStudies();
    setRefreshing(false);
  }, []);

  const [search, setSearch] = useState<string>('');
  const [user, setUser] = useState<User | null>(null);
  const [study, setStudy] = useState<Trial | null>(null);

  // Get user from redux store
  const currentUser = useSelector(getCurrentUser);

  // States for recents, suggested, and all studies
  const [recents, setRecents] = useState<Trial[]>([]);
  const [suggested, setSuggested] = useState<Trial[]>([]);
  const [allStudies, setAllStudies] = useState<Trial[]>([]);

  // Function to set recents and suggested studies
  const setStudies = async () => {
    // Get recents and suggested studies from db
    const newRecents: Trial[] = [];
    const newSuggested: Trial[] = [];
    const newAllStudies: Trial[] = [];

    // Get recents from recently clicked on trials
    for (const trial_id in (currentUser?.clickedOnTrials)) {
      const trial_obj = await getTrialFromId(trial_id);
      if (trial_obj) {
        newRecents.push(trial_obj);
      }
    }

    // Get suggested by searching for trials that match user info
    const todayDate = new Date();
    const location = currentUser?.homeAddress;
    const conditions = currentUser?.medConditions;
    const accepting = true;

    const route = serverUrl + "/api/trial/filter";
    console.log(route);
    const response = await fetch(route, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({todayDate, location, conditions, accepting}),
    });
    const result = await response.json();

    // If response is OK, add trials from result to suggested
    if (response.status === 200) {
      for (const trial of result) {
        const trial_obj: Trial = {
          _id: trial._id,
          name: trial.name,
          description: trial.description,
          researchers: trial.researchers,
          participantRequests: trial.participantRequests,
          participantAccepted: trial.participantAccepted,
          acceptingParticipants: trial.acceptingParticipants,
          date: trial.date,
          location: trial.location,
          eligibleConditions: trial.eligibleConditions,
        }
        newSuggested.push(trial_obj);
      }
    } else if (response.status === 400) {
      console.log('response status 400');
      console.log(result.message);
    }

    // Set all studies
    const route2 = serverUrl + "/api/trial/all";
    const response2 = await fetch(route2, {
      method: 'GET',
      // headers: {
      //   'Content-Type': 'application/json',
      // },
    });
    const result2 = await response2.json();

    // If response is OK, add trials from result to all studies
    if (response2.status === 200) {
      console.log(result2)
      for (const trial of result2) {
        const trial_obj: Trial = {
          _id: trial._id,
          name: trial.name,
          description: trial.description,
          researchers: trial.researchers,
          participantRequests: trial.participantRequests,
          participantAccepted: trial.participantAccepted,
          acceptingParticipants: trial.acceptingParticipants,
          date: trial.date,
          location: trial.location,
          eligibleConditions: trial.eligibleConditions,
        }
        newAllStudies.push(trial_obj);
      }
    } else if (response2.status === 400) {
      console.log('response status 400');
      console.log(result2.message);
    } else {
      console.log('response status not 200 or 400');
      console.log(result2.message);
    }

    // Set recents and suggested studies
    setRecents(newRecents);
    setSuggested(newSuggested);
    setAllStudies(newAllStudies);

    console.log('Studies updated');
  }

  // define a useEffect for recents and suggested studies from db
  useEffect(() => {
    setStudies();
  }, [])

  const updateSearch: (text: string) => void = (search: string) => {
    setSearch(search);
  };

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
        <Header title='Explore'/>
        <Searchbar
          placeholder="Search"
          onChangeText={updateSearch}
          value={search}
          style={styles.searchbar}
        />
        <ScrollView 
          showsVerticalScrollIndicator={false} 
          refreshControl={
            <RefreshControl refreshing={refreshing} onRefresh={onRefresh} />
          }
          style={{flex: 1, width: '100%'}}>
          <Text style={{fontSize: 20, fontWeight: 'bold', paddingVertical: 16}}>Your Recents</Text>
          <StudyList data={recents} horizontal onCardPress={onStudyCardPress}/>
  
          <Text style={{fontSize: 20, fontWeight: 'bold', paddingVertical: 16}}>Suggested Studies</Text>
          <StudyList data={suggested} onCardPress={onStudyCardPress}/>

          <Text style={{fontSize: 20, fontWeight: 'bold', paddingVertical: 16}}>All Studies</Text>
          <StudyList data={allStudies} onCardPress={onStudyCardPress}/>               
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