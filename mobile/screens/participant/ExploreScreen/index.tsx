import { View, Text, SafeAreaView, FlatList, StyleSheet } from 'react-native'
import React, { useEffect } from 'react'
import { useState } from 'react'
import { ScrollView } from 'react-native-gesture-handler'
import Header from '../../../components/Header'
import { Searchbar, Card, Divider } from 'react-native-paper'
import StudyList from '../../../components/StudyList'
import AppNavigator from '../../../components/AppNavigator'
import { styles, font_styles } from '../../../styles_temp'
import { Trial, User } from '../../../utils/types'
import { testTrials } from '../../../utils/testObjs'
import { useSelector } from 'react-redux'
import { getCurrentUser } from '../../../stores/userReducer'
import UseFonts from '../../../components/fonts/Fonts'
import AppLoading from 'expo-app-loading';

const screenName = 'Explore'

export default function ExploreScreen({navigation}: {navigation: any}) {
  const [search, setSearch] = useState<string>('');
  const [user, setUser] = useState<User | null>(null);
  const [study, setStudy] = useState<Trial | null>(null);
  const [isReady, setIsReady] = useState(false)

  // Get user from redux store
  const currentUser = useSelector(getCurrentUser);

  // States for recents and suggested studies
  const [recents, setRecents] = useState<Trial[]>([]);
  const [suggested, setSuggested] = useState<Trial[]>([]);

  // Function to get trial from id
  const getTrialFromId = async (id: string) => {
    try {
      const response = await fetch('http://localhost:4000/api/researcher/'+id, {
        method: 'GET',
        });
      const result = await response.json();
      // If response is OK, return trial
      if (response.status === 200) {
        const trial: Trial = result;
        return trial;
      } else if (response.status === 400) {
        console.log('response status 400');
        console.log(result.message);
        return null;
      }
    } catch (error: any) {
      console.log(error)
      return null;
    }
  }

  // Function to set recents and suggested studies
  const setStudies = async () => {
    // Get recents and suggested studies from db
    const recents: Trial[] = [];
    const suggested: Trial[] = [];

    // Get recents from recently clicked on trials
    for (const trial_id in (currentUser?.clickedOnTrials)) {
      const trial_obj = await getTrialFromId(trial_id);
      if (trial_obj) {
        recents.push(trial_obj);
      }
    }

    // Get suggested by searching for trials that match user info
    const todayDate = new Date();
    const location = currentUser?.homeAddress;
    const conditions = currentUser?.medConditions;
    const accepting = true;

    const response = await fetch('http://localhost:4000/api/trial/filter', {
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
        suggested.push(trial_obj);
      }
    } else if (response.status === 400) {
      console.log('response status 400');
      console.log(result.message);
    }

    // Set recents and suggested studies
    setRecents(recents);
    setSuggested(suggested);
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

  const onUserPress : ({user}: {user: User}) => void = ({user}: {user: User}) => {
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
        <ScrollView showsVerticalScrollIndicator={false} style={{flex: 1, width: '100%'}}>
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