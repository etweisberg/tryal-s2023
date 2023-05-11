import { View, StyleSheet, ScrollView } from 'react-native'
import React, { useState } from 'react'
import { Searchbar } from 'react-native-paper';

export default function MessageScreen() {
  const [search, setSearch] = useState<string>('');

  const updateSearch: (text: string) => void = (search: string) => {
    setSearch(search);
  };

  return (
    <View style={styles.container}>
      {/* <Header title='Messages'/> */}
      <Searchbar
        placeholder="Search Messages"
        onChangeText={updateSearch}
        value={search}
        style={{height: 50, backgroundColor: '#e8e8e8', marginVertical: 4}}
      />
      <ScrollView showsVerticalScrollIndicator={false} style={{flex: 1, width: '100%'}}>
      </ScrollView>
    </View>
  )
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    width: '100%',
    justifyContent: 'center',
    marginTop: 24,
  },

});