import { Text, View, StyleSheet, ScrollView } from 'react-native'
import React, { useState } from 'react'
import { Searchbar } from 'react-native-paper';
import MessagesList from '../../../components/MessagesList';
import Header from '../../../components/Header';
import AppNavigator from '../../../components/AppNavigator';
import styles from '../../../styles'
import { ChatRoom, Trial, User } from '../../../utils/types';
import { testChatRoom1, testChatRoom2, testChatRoom3 } from '../../../utils/testObjs';
import { useDispatch, useSelector } from 'react-redux';
import { getChatRooms } from '../../../stores/chatsReducer';

const screenName = 'Messages';

export default function MessageScreen({navigation}: {navigation: any}) {
  const [search, setSearch] = useState<string>('');
  const [user, setUser] = useState<User | null>(null);
  const [study, setStudy] = useState<Trial | null>(null);

  const data = useSelector(getChatRooms);
  console.log(data);

  const updateSearch: (text: string) => void = (search: string) => {
    setSearch(search);
  };

  function MainPage() {
    return (
      <View style={styles.container}>
        <Header title='Messages'/>
        <Searchbar
          placeholder="Search Messages"
          onChangeText={updateSearch}
          value={search}
          style={styles.searchbar}
        />

        <ScrollView showsVerticalScrollIndicator={false} 
        style={{flex: 1, width: '100%', alignContent:'center'}}
        >
          <MessagesList data={data} navigation={navigation}/>
        </ScrollView>
      </View>
    )
  }

  return (
    <AppNavigator name={screenName} components={[MainPage]} profileFocusable studyFocusable user={user} trial={study}/>
  )
}
