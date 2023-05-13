import { View, Text, StyleSheet, FlatList, Pressable } from 'react-native'
import React from 'react'
import { Card, Divider } from 'react-native-paper'
import { DataItem } from './types';

export default function MessagesList({data, onPress}: {data: DataItem[], onPress?: ({userid}: {userid: string}) => void}) {
  return (
    <View >
        { data ?
          data.map((item: DataItem)=> {
            const onCardPress = () => {
              if (onPress) {
                onPress({userid: item.id});
              }
            }
            return(
          <Pressable key={item.id} onPress={onCardPress}>
            <Card style={styles.card} mode='contained'>
              <Card.Title title={item.title} />
              <Card.Content>
                <Text>{item.description}</Text>
              </Card.Content>
            </Card>
            <Divider />
          </Pressable> )
          }) :
          <Text>No messages here!</Text>
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

});