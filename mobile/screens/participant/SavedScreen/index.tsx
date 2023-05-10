import { View, Text, SafeAreaView, ScrollView, StyleSheet } from 'react-native'
import React from 'react'
import Header from '../../../components/Header';
import { DataItem } from '../../../components/types';
import SavedList, { DataItemObj } from '../../../components/SavedList';

const DATA2: DataItem[] = [
  { id: '1', title: 'Card 1', description: 'This is the first card' },
  { id: '2', title: 'Card 2', description: 'This is the second card' },
  { id: '3', title: 'Card 3', description: 'This is the third card' },
];

const DATA: DataItemObj[] = [
  { name: 'Group 1', data: DATA2 },
  { name: 'Group 2', data: DATA2 },
  { name: 'Group 3', data: DATA2 },
  { name: 'Group 4', data: DATA2 },
  { name: 'Group 5', data: DATA2 },
]

export default function SavedScreen() {
  return (
    <View style={styles.container}>
      <ScrollView showsVerticalScrollIndicator={false} style={{flex: 1, width: '100%'}}>

        <Header title='Saved'/>

        <SavedList data={DATA} />        
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
  card1: {
    width: 115,
    height: 150,
    margin: 4,
  },
  card2: {
    width: '100%',
    height: 80,
    marginVertical: 4,
  }

});