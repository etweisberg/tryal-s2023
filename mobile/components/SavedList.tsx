import { View, Text, StyleSheet } from 'react-native'
import React from 'react'
import { Card, Divider } from 'react-native-paper'
import { DataItem } from './types'
import Icon from 'react-native-vector-icons/Ionicons';
import StudyList from './StudyList';

export type DataItemObj = {
  name: string;
  data: DataItem[];
}

export default function SavedList({data}: {data: DataItemObj[]}) {
  const groupCard = (name: string, icon: string | null) => {
    return (
      <View style={styles.cardContainer}>
        <Card style={styles.card} mode='contained'>
          {/* <Card.Title title={item.name} /> */}
          <Card.Content>
            <Text>{name}</Text>
            {icon ? <Icon name={icon} size={30}/> : null}
          </Card.Content>
        </Card>
      </View>
    )
  }

  function MainPage() {
    return (
      <View style={styles.container}>
        {
            data.map((item: DataItemObj)=> groupCard(item.name, null)
        )}
        {groupCard('New', 'add-outline')}
      </View>
    )
  }

  const GroupPage = (name: string, data: DataItem[]) => {
    return (
      <View>
        <Text style={{fontSize: 20, fontWeight: 'bold', padding: 16}}>{name}</Text>
        <StudyList data={data} />
      </View>
    )
  }

  return (
    <MainPage />
  )
}

const styles = StyleSheet.create({
  container: {
    flex: 1, 
    paddingHorizontal: 24, 
    flexDirection: 'row', 
    flexWrap: 'wrap', 
    justifyContent: 'space-between'
  },
  cardContainer: {
    width: '46%',
    aspectRatio: 1,
    marginVertical: 12,
    // backgroundColor: 'green',
  },
  card: {
    flex: 1,
    aspectRatio: 1,
    alignItems: 'center',
    justifyContent: 'center',
  }

});