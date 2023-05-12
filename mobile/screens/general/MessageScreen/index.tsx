import { View, StyleSheet, ScrollView } from 'react-native'
import React, { useState } from 'react'
import { Searchbar } from 'react-native-paper';
import { DataItem } from '../../../components/types';
import MessagesList from '../../../components/MessagesList';
import Header from '../../../components/Header';

const DATA: DataItem[] = [
  { id: '1', title: 'Card 1', description: 'This is the first card' },
  { id: '2', title: 'Card 2', description: 'This is the second card' },
  { id: '3', title: 'Card 3', description: 'This is the third card' },
  { id: '4', title: 'Card 4', description: 'This is the fourth card' },
  { id: '5', title: 'Card 5', description: 'This is the fifth card' },
  { id: '6', title: 'Card 6', description: 'This is the sixth card' },
];

export default function MessageScreen() {
  const [search, setSearch] = useState<string>('');
  const [userid, setUserid] = useState<string>('');
  const [chat, setChat] = useState<boolean>(false);

  const updateSearch: (text: string) => void = (search: string) => {
    setSearch(search);
  };

  const setUseridFromCard: ({userid}: {userid: string}) => void = ({userid}: {userid: string}) => {
    setUserid(userid);
    setChat(true);
  }

  const toMain: () => void = () => {
    setChat(false);
  }

  const toProfile: () => void = () => {
    // navigate to profile screen
  }

  function MainScreen() {
    return (
      <View>
        {/* <Header title='Messages'/> */}
        <Searchbar
          placeholder="Search Messages"
          onChangeText={updateSearch}
          value={search}
          style={{height: 50, backgroundColor: '#e8e8e8', marginVertical: 4}}
        />
        <ScrollView showsVerticalScrollIndicator={false} style={{flex: 1, width: '100%'}}>
          <MessagesList data={DATA} onPress={setUseridFromCard}/>
        </ScrollView>
      </View>
    )
  }

  // this needs to be done way better....
  function ChatScreen() {
    return (
      <View>
        <Header 
          title='(name of person)' 
          leftComponentType='touchable-icon' leftText='chevron-back-outline' onLeftPress={toMain}
          rightComponentType='touchable-text' rightText='See Profile' onRightPress={toProfile}
        />
        <ScrollView showsVerticalScrollIndicator={false} style={{flex: 1, width: '100%'}}>
          {/* implement messages here */}
        </ScrollView>

      </View>
    )
  }

  return (
    <View style={styles.msgContainer}>
      {chat ? <ChatScreen /> : <MainScreen />}
    </View>
  )
}

const styles = require("../../../styles")
// const styles = StyleSheet.create({
//   container: {
//     flex: 1,
//     width: '100%',
//     justifyContent: 'center',
//     marginTop: 24,
//   },

// });