import { View, Text, SafeAreaView, FlatList, StyleSheet } from 'react-native'
import React from 'react'
import { useState } from 'react'
import { ScrollView } from 'react-native-gesture-handler'
import Header from '../../../components/Header'
import { Searchbar, Card, Divider } from 'react-native-paper'
import StudyList from '../../../components/StudyList'
import { DataItem } from '../../../components/types'
import AppNavigator from '../../../components/AppNavigator'

const DATA: DataItem[] = [
  { id: '1', title: 'Card 1', description: 'This is the first card' },
  { id: '2', title: 'Card 2', description: 'This is the second card' },
  { id: '3', title: 'Card 3', description: 'This is the third card' },
  { id: '4', title: 'Card 4', description: 'This is the fourth card' },
  { id: '5', title: 'Card 5', description: 'This is the fifth card' },
  { id: '6', title: 'Card 6', description: 'This is the sixth card' },
];

export default function ExploreScreen({navigation}: {navigation: any}) {
  const [search, setSearch] = useState<string>('');
  const [userID, setUserID] = useState<string>('');
  const [studyID, setStudyID] = useState<string>('');

  const updateSearch: (text: string) => void = (search: string) => {
    setSearch(search);
  };

  const onStudyCardPress = ({studyID}: {studyID: string}) => {
    setStudyID(studyID);
    navigation.navigate('StudyInfoScreen');
  }

  function MainPage() {
    return (
      <View style={styles.container}>
        <Header title='Explore'/>
        <Searchbar
          placeholder="Search"
          onChangeText={updateSearch}
          value={search}
          style={{height: 50, backgroundColor: '#e8e8e8', marginVertical: 4}}
        />
        <ScrollView showsVerticalScrollIndicator={false} style={{flex: 1, width: '100%'}}>
          <Text style={{fontSize: 20, fontWeight: 'bold', paddingVertical: 16}}>Your Recents</Text>
          <StudyList data={DATA} horizontal onPress={onStudyCardPress}/>
  
          <Text style={{fontSize: 20, fontWeight: 'bold', paddingVertical: 16}}>Suggested Studies</Text>
          <StudyList data={DATA} onPress={onStudyCardPress}/>        
        </ScrollView>
      </View>
    )
  }

  return (
    <AppNavigator components={[MainPage]} profileFocusable studyFocusable userID={userID} studyID={studyID}/>
  )
}


const styles = StyleSheet.create({
  container: {
    flex: 1,
    width: '100%',
    justifyContent: 'center',
    marginTop: 24,
    paddingHorizontal: 16,
    // backgroundColor: 'black',
  },

});