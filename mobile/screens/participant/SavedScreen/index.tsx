import { View, Text, SafeAreaView, ScrollView } from 'react-native'
import React from 'react'
import StudyList, { DataItem } from '../../../components/StudyList'
import Header from '../../../components/Header';

const DATA: DataItem[] = [
  { id: '1', title: 'Card 1', description: 'This is the first card' },
  { id: '2', title: 'Card 2', description: 'This is the second card' },
  { id: '3', title: 'Card 3', description: 'This is the third card' },
];

export default function SavedScreen() {
  return (
    <View>
      <ScrollView showsVerticalScrollIndicator={false} style={{flex: 1, width: '100%'}}>

        <Header title='Saved'/>

        <StudyList data={DATA} />        
      </ScrollView>

    </View>
  )
}