import { View, Text, StyleSheet, FlatList, Pressable } from 'react-native'
import React from 'react'
import { Card, Divider } from 'react-native-paper'
import { DataItem } from './types';
import { ScrollView } from 'react-native-gesture-handler';
import { Trial, User } from '../utils/types';

export default function StudyList(
  {
    data, 
    horizontal=false, 
    onCardPress, 
    onUserPress
  }: 
  {
    data: Trial[], 
    horizontal?: boolean, 
    onCardPress?: ({trial}: {trial: Trial}) => void,
    onUserPress?: ({user}: {user: User}) => void,
  }) {

  // TODO: change horizontal from flatlist...
  return (
    <View >
      {
        horizontal ? (
          data ?
          <ScrollView horizontal showsHorizontalScrollIndicator={false}>
          {data.map((item: Trial)=> {
            const handleCardPress = () => {
              if (onCardPress) {
                onCardPress({trial: item});
                }
              }
            return (
              <Pressable key={item._id} onPress={handleCardPress}>
                <Card style={styles.card1} mode='contained'>
                  <Card.Title title={item.name} />
                  <Card.Content>
                    <Text>{item.description}</Text>
                  </Card.Content>
                </Card>
              </Pressable>
            )})
              }
          </ScrollView> : <Text>No studies here!</Text>) :
        <View>
        { data ?
          data.map((item: Trial)=> {
            const handleCardPress = () => {
              if (onCardPress) {
                onCardPress({trial: item});
              }
            }
            return (
              <Pressable key={item._id} onPress={handleCardPress}>
                <Card style={styles.card} mode='contained'>
                  <Card.Title title={item.name} />
                  <Card.Content>
                    <Text>{item.description}</Text>
                  </Card.Content>
                </Card>
                <Divider />
              </Pressable> 
            )
          }
          
          ) :
          <Text>No studies here!</Text>
        }
        </View>
      }
    </View>
  )
}

const styles = StyleSheet.create({
  card: {
    width: '100%',
    height: 80,
    marginVertical: 4,
  },
  card1: {
    width: 115,
    height: 150,
    margin: 4,
  },

});