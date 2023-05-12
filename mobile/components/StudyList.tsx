import { View, Text, StyleSheet, FlatList } from 'react-native'
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

export default function StudyList({data, horizontal=false}: {data: DataItem[], horizontal?: boolean}) {
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
          data.map((item: DataItem)=> 
          <View key={item.id}>
            <Card style={styles.card} mode='contained'>
              <Card.Title title={item.title} />
              <Card.Content>
                <Text>{item.description}</Text>
              </Card.Content>
            </Card>
            <Divider />
          </View> 
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