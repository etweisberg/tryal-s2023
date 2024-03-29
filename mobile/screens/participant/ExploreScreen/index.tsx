import { View, Text, SafeAreaView, FlatList, StyleSheet, RefreshControl } from 'react-native'
import React, { useEffect } from 'react'
import { useState } from 'react'
import { ScrollView } from 'react-native-gesture-handler'
import Header from '../../../components/Header'
import { Searchbar } from 'react-native-paper'
import StudyList from '../../../components/StudyList'
import AppNavigator from '../../../components/AppNavigator'
import { styles, font_styles } from '../../../styles_temp'
import { Trial, User } from '../../../utils/types'
import { useSelector } from 'react-redux'
import { getCurrentUser } from '../../../stores/userReducer'
import UseFonts from '../../../components/fonts/Fonts'
import AppLoading from 'expo-app-loading';
import { getTrialFromId, getUserFromId, serverUrl } from '../../../utils/apiCalls'

const screenName = 'Explore'

export default function ExploreScreen({navigation}: {navigation: any}) {
  const [search, setSearch] = useState<string>('');

  // states for focusable pages (i.e. a study page or a user page)
  const [user, setUser] = useState<User | null>(null);
  const [study, setStudy] = useState<Trial | null>(null);
  const [isReady, setIsReady] = useState(false)

  // Get user from redux store
  const currentUser = useSelector(getCurrentUser);
  // console.log('Current User: ' + currentUser?.firstName + ' ' + currentUser?.lastName)
  // console.log('Clicked Trials: ' + currentUser?.clickedOnTrials);

  const [refreshing, setRefreshing] = useState(false);

  // define a useEffect for recents and suggested studies from db
  useEffect(() => {
    console.log('(useeffect) Current User: ' + currentUser?.firstName + ' ' + currentUser?.lastName)
    setStudies(currentUser);
  }, [currentUser])

  const onRefresh = React.useCallback(() => {
    console.log('(refresh) Current User: ' + currentUser?.firstName + ' ' + currentUser?.lastName)
    setRefreshing(true);
    setStudies(currentUser);
    setRefreshing(false);
  }, []);

  // States for recents, suggested, and all studies
  const [recents, setRecents] = useState<Trial[]>([]);
  const [suggested, setSuggested] = useState<Trial[]>([]);
  const [allStudies, setAllStudies] = useState<Trial[]>([]);

  // Function to set recents and suggested studies
  const setStudies = async (currentUser: User | null) => {
    // Get recents and suggested studies from db
    const newRecents: Trial[] = [];
    const newSuggested: Trial[] = [];
    const newAllStudies: Trial[] = [];

    // Get recents from recently clicked on trials
    for (const trial_id of (currentUser?.clickedOnTrials || [])) {
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

    // Get suggested trials from db
    try {
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
      } else {
        alert(result.message)
        console.log(result.message);
      }
    } catch (error) {
      alert(error)
      console.log(error);
    }

    // Get all studies from db
    try {
      const route2 = serverUrl + "/api/trial/all";
      console.log(route2)
      const response2 = await fetch(route2, {
        method: 'GET',
      });
      const result2 = await response2.json();

      // If response is OK, add trials from result to all studies
      if (response2.status === 200) {
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
      } else {
        alert(result2.message)
        console.log(result2.message);
      }
    } catch (error) {
      alert(error)
      console.log(error);
    }
    

    // Set recents and suggested studies
    setRecents(newRecents);
    setSuggested(newSuggested);
    setAllStudies(newAllStudies);
  }



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

  const loadFonts = async () => {
    await UseFonts()
  }

  if (!isReady) {
    return (
      <AppLoading
      startAsync={loadFonts}
      onFinish={() => setIsReady(true)}
      onError={() => {}}
      />
    )
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
          <Text style={font_styles.section_header}>Your Recents</Text>
          <StudyList data={recents} horizontal onCardPress={onStudyCardPress}/>
  
          <Text style={font_styles.section_header}>Suggested Studies</Text>
          <StudyList data={suggested} onCardPress={onStudyCardPress}/>        
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