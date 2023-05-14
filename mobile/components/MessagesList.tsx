import { View, Text, StyleSheet, FlatList, Pressable } from 'react-native'
import React, { useState } from 'react'
import { Card, Divider } from 'react-native-paper'
import { ChatRoom, Message } from '../utils/types';
import { useDispatch, useSelector } from 'react-redux';
import { RootState } from '../stores';
import { getCurrentUser, setFocusedChatRoom } from '../stores/userReducer';

export default function MessagesList({navigation, data}: {navigation: any, data: ChatRoom[]}) {

  const [chatActive, setChatActive] = useState<boolean>(false);
  const dispatch = useDispatch();

  const getMostRecentMessage = (messages: Message[] | null) => {
    return messages?.slice(-1)[0]?.content;
  }

  const getMessagerFromParticipants = (participants: string[]) => {
    return participants.filter((participant) => participant !== user?._id)[0];
  }

  const getNameFromID = (id: string) => {
    if (id === '1') {
      return 'Chris W.'
    } else if (id === '2') {
      return 'Ethan W.'
    } else if (id === '3') {
      return 'Jasper Z.'
    } else {
      return ''
    }
  }

  const setFocused = (chatRoom : ChatRoom) => {
    dispatch(setFocusedChatRoom(chatRoom));
    navigation.navigate('Chat');
  }

  const user = useSelector((state: RootState) => getCurrentUser(state));
  
  
  return (
    <View >
        { data ?
          data.map((item: ChatRoom)=> {
            return(
              <Pressable key={item._id} onPress={() => setFocused(item)}>
                <Card style={styles.card} mode='contained'>
                  <Card.Title title={getMessagerFromParticipants(item.participants)} />
                  <Card.Content>
                    <Text>{getMostRecentMessage(item.messages)}</Text>
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