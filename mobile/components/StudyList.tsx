import { View, Text, StyleSheet, FlatList, Pressable, Image } from 'react-native'
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
                <Card style={styles.squareCard} contentStyle={styles.squareCardContent} mode='contained'>
                  <Card.Cover 
                    style={styles.squareImage}
                    source={require('../assets/penn-med.png')}
                  />
                  <Card.Content>
                    <Text style={styles.squareTitleText}>{item.name}</Text>
                    <Text style={styles.squarePayText}>$17/hr</Text>
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
                <Card style={styles.longCard} contentStyle={styles.longContent} mode='contained'>
                  <Image  
                    style={styles.longImage}
                    source={require('../assets/profile-pic.png')}
                  />
                  <View style={styles.longView}>
                    <Text style={styles.longTitleText}>{item.name}</Text>
                    <Text style={styles.longDescriptionText}>{item.description}</Text>
                  </View>
                  <Text style={styles.longPayText}>$17/hr</Text>
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
  longCard: {
    width: '100%',
    height: 80,
    marginVertical: 4,
    backgroundColor: 'transparent',
  },
  longContent:{
    marginVertical: 10,
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  longImage: {
    width: 55,
    height: 55,
    borderRadius: 10,

  },
  longView: {
    width: '65%',
    height: '100%',
  },
  longTitleText: {
    fontWeight: 'bold',
  },
  longDescriptionText: {
    fontWeight: '300',
  },
  longPayText: {
    fontWeight: '300',
    color: '#D2328D',
  },
  squareCard: {
    width: 120,
    margin: 10,
    backgroundColor: 'transparent',
  },
  squareCardContent: {
    margin: 0,
    borderWidth: 0,
    padding:0 ,
  },
  squareImage: {
    width: '100%',
    height: 120,
    marginBottom: 10,
    borderRadius: 10,
  },
  squareTitleText: {
    fontWeight: 'normal',
  },
  squarePayText: {
    fontWeight: 'bold',
    color: '#D2328D',
    marginTop: 5,
  }
});