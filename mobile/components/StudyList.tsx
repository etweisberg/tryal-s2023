import { View, Text, StyleSheet, FlatList, Pressable } from 'react-native'
import React from 'react'
import { Card, Divider } from 'react-native-paper'
import { DataItem } from './types';

type RenderItemProps = {
  item: DataItem;
};

const renderItem = ({ item }: RenderItemProps) => (
  <Card style={styles.card1} mode='contained'>
    <Card.Title title={item.title} />
    <Card.Content>
      <Text>{item.description}</Text>
    </Card.Content>
  </Card>
);

export default function StudyList(
  {data, horizontal=false, onPress}: 
  {data: DataItem[], horizontal?: boolean, onPress?: ({studyID}: {studyID: string}) => void}) {

  // TODO: change horizontal from flatlist...
  return (
    <View >
      {
        horizontal ? 
        <FlatList
          showsHorizontalScrollIndicator={false}
          horizontal
          data={data}
          renderItem={renderItem}
          keyExtractor={(item: DataItem) => item.id}
          scrollEnabled={true}
        /> : 
        <View>
        { data ?
          data.map((item: DataItem)=> {
            const handleCardPress = () => {
              if (onPress) {
                onPress({studyID: item.id});
              }
            }
            return (
              <Pressable key={item.id} onPress={handleCardPress}>
                <Card style={styles.card} mode='contained'>
                  <Card.Title title={item.title} />
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