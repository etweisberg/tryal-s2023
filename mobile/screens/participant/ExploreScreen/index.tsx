import { View, Text, SafeAreaView, FlatList, StyleSheet } from 'react-native'
import React, { useState } from 'react'
import { ScrollView } from 'react-native-gesture-handler'
import Header from '../../../components/Header'
import { Searchbar, Card, Divider } from 'react-native-paper'
import StudyList, { DataItem } from '../../../components/StudyList'

const DATA: DataItem[] = [
  { id: '1', title: 'Card 1', description: 'This is the first card' },
  { id: '2', title: 'Card 2', description: 'This is the second card' },
  { id: '3', title: 'Card 3', description: 'This is the third card' },
];

type RenderItemProps = {
  item: DataItem;
};

const renderItem1 = ({ item }: RenderItemProps) => (
  <Card style={styles.card1} mode='contained'>
    <Card.Title title={item.title} />
    <Card.Content>
      <Text>{item.description}</Text>
    </Card.Content>
  </Card>
);

export default function ExploreScreen() {
  const [search, setSearch] = useState<string>('');

  const updateSearch: (text: string) => void = (search: string) => {
    setSearch(search);
  };

  return (
    <View style={styles.container}>
      <ScrollView showsVerticalScrollIndicator={false} style={{flex: 1, width: '100%'}}>
        <Header title='Explore'/>
        <Searchbar
          placeholder="Search"
          onChangeText={updateSearch}
          value={search}
          style={{height: 50, backgroundColor: '#e8e8e8', marginHorizontal: 16}}
        />

        <Text style={{fontSize: 20, fontWeight: 'bold', padding: 16}}>Your Recents</Text>
        <FlatList<DataItem>
        showsVerticalScrollIndicator={false}
        horizontal
        data={DATA}
        renderItem={renderItem1}
        keyExtractor={(item) => item.id}
        scrollEnabled={true}
        style={{paddingHorizontal: 16}}
        />

        <Text style={{fontSize: 20, fontWeight: 'bold', padding: 16}}>Suggested Studies</Text>
        <StudyList data={DATA} />        
      </ScrollView>
    </View>
  )
}


const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    marginTop: 24,
    // backgroundColor: 'black',
  },
  card1: {
    width: 115,
    height: 150,
    margin: 4,
  },
  card2: {
    width: '100%',
    height: 80,
    marginVertical: 4,
  }

});