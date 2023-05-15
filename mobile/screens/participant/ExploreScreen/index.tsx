import { View, Text, SafeAreaView, FlatList, StyleSheet } from 'react-native'
import React from 'react'
import { useState } from 'react'
import { ScrollView } from 'react-native-gesture-handler'
import Header from '../../../components/Header'
import { Searchbar, Card, Divider } from 'react-native-paper'
import StudyList from '../../../components/StudyList'
import { DataItem } from '../../../components/types'
import AppNavigator from '../../../components/AppNavigator'
import styles from '../../../styles'
import { Trial, User } from '../../../utils/types'
import { testTrials } from '../../../utils/testObjs'

const screenName = 'Explore'

export default function ExploreScreen({navigation}: {navigation: any}) {
  const [search, setSearch] = useState<string>('');
  const [user, setUser] = useState<User | null>(null);
  const [study, setStudy] = useState<Trial | null>(null);

  const updateSearch: (text: string) => void = (search: string) => {
    setSearch(search);
  };

  const onStudyCardPress = ({trial}: {trial: Trial}) => {
    setStudy(trial);
    navigation.navigate('StudyInfoScreen' + screenName);
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
          <Text style={{fontSize: 20, fontWeight: 'bold', paddingVertical: 16}}>Your Recents</Text>
          <StudyList data={testTrials} horizontal onPress={onStudyCardPress}/>
  
          <Text style={{fontSize: 20, fontWeight: 'bold', paddingVertical: 16}}>Suggested Studies</Text>
          <StudyList data={testTrials} onPress={onStudyCardPress}/>        
        </ScrollView>
      </View>
    )
  }

  return (
    <AppNavigator name={screenName} components={[MainPage]} profileFocusable studyFocusable user={user} trial={study}/>
  )
}