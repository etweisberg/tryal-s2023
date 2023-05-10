import { View, Text, SafeAreaView, FlatList, StyleSheet } from 'react-native'
import React from 'react'
import { useState } from 'react'
import { ScrollView } from 'react-native-gesture-handler'
import Header from '../../../components/Header'
import { Searchbar, Card, Divider } from 'react-native-paper'
import StudyList from '../../../components/StudyList'
import { DataItem } from '../../../components/types'

const DATA: DataItem[] = [
  { id: '1', title: 'Card 1', description: 'This is the first card' },
  { id: '2', title: 'Card 2', description: 'This is the second card' },
  { id: '3', title: 'Card 3', description: 'This is the third card' },
  { id: '4', title: 'Card 4', description: 'This is the fourth card' },
  { id: '5', title: 'Card 5', description: 'This is the fifth card' },
  { id: '6', title: 'Card 6', description: 'This is the sixth card' },
];

export default function ExploreScreen() {
  const [search, setSearch] = useState<string>('');

  const updateSearch: (text: string) => void = (search: string) => {
    setSearch(search);
  };

  return (
    <View style={styles.container}>
      <ScrollView showsVerticalScrollIndicator={false} style={{flex: 1, width: '100%'}}>
        <Header title='Explore'/>
        <Searchbar
          placeholder="Search"
          onChangeText={updateSearch}
          value={search}
          style={{height: 50, backgroundColor: '#e8e8e8', marginHorizontal: 16}}
        />

        <Text style={{fontSize: 20, fontWeight: 'bold', padding: 16}}>Your Recents</Text>
        <StudyList data={DATA} horizontal />

        <Text style={{fontSize: 20, fontWeight: 'bold', padding: 16}}>Suggested Studies</Text>
        <StudyList data={DATA} />        
      </ScrollView>
    </View>
  )
}


const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    marginTop: 24,
    // backgroundColor: 'black',
  },

});