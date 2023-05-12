import { View, Text, SafeAreaView, ScrollView, StyleSheet } from 'react-native'
import React from 'react'
import NotifList from '../../../components/NotifList';
import { DataItem } from '../../../components/types';

const DATA: DataItem[] = [
  { id: '1', title: 'Card 1', description: 'This is the first card' },
  { id: '2', title: 'Card 2', description: 'This is the second card' },
  { id: '3', title: 'Card 3', description: 'This is the third card' },
  { id: '4', title: 'Card 4', description: 'This is the fourth card' },
  { id: '5', title: 'Card 5', description: 'This is the fifth card' },
  { id: '6', title: 'Card 6', description: 'This is the sixth card' },
];

export default function NotificationScreen() {

  return (
    <View style={styles.container}>
      <ScrollView showsVerticalScrollIndicator={false} style={{flex: 1, width: '100%'}}>
        <Text style={{fontSize: 20, fontWeight: 'bold', paddingVertical: 16}}>Recent</Text>
        <NotifList data={DATA} />

        <Text style={{fontSize: 20, fontWeight: 'bold', paddingVertical: 16}}>Older</Text>
        <NotifList data={DATA} />        
      </ScrollView>
    </View>
  )
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    width: '100%',
    justifyContent: 'center',
  },

});