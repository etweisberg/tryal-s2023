import { View, Text, StyleSheet } from 'react-native'
import React from 'react'
import { Card, Divider } from 'react-native-paper'

export type DataItem = {
    id: string;
    title: string;
    description: string;
  };

export default function StudyList({data}: {data: DataItem[]}) {
  return (
    <View style={{paddingHorizontal: 16}}>
        {
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
        )}
    </View>
  )
}

const styles = StyleSheet.create({
    card: {
      width: '100%',
      height: 80,
      marginVertical: 4,
    }
  
  });