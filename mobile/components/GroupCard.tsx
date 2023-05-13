import { View, Text, StyleSheet, Pressable } from 'react-native'
import React from 'react'
import { Card } from 'react-native-paper';
import Icon from 'react-native-vector-icons/Ionicons';

export default function GroupCard({name, icon, onPress}: {name: string, icon: string | null, onPress?: () => void}) {
  return (
    <Pressable style={styles.cardContainer} onPress={onPress}>
        <Card style={styles.card} mode='contained'>
          {/* <Card.Title title={item.name} /> */}
          <Card.Content>
            <Text>{name}</Text>
            {icon ? <Icon name={icon} size={30}/> : null}
          </Card.Content>
        </Card>
    </Pressable>
  )
}

const styles = StyleSheet.create({
    cardContainer: {
      width: '46%',
      aspectRatio: 1,
      marginVertical: 10,
      // backgroundColor: 'green',
    },
    card: {
      flex: 1,
      aspectRatio: 1,
      alignItems: 'center',
      justifyContent: 'center',
    }
  
  });