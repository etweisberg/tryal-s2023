import { View, Text, StyleSheet, FlatList, Pressable } from 'react-native'
import React, { useEffect, useState } from 'react'
import { Card, Divider } from 'react-native-paper'
import { ChatRoom, Message, User } from '../utils/types';
import { useDispatch, useSelector } from 'react-redux';
import { getCurrentUser } from '../stores/userReducer';
import { setFocusedChatRoom, setFocusedMessager } from '../stores/chatsReducer';
import { getUserFromId } from '../utils/apiCalls';

export default function MessagesList({navigation, data}: {navigation: any, data: ChatRoom[]}) {
  const dispatch = useDispatch();
  const user = useSelector(getCurrentUser);
  const [messagers, setMessagers] = useState<string[]>([]);

  useEffect(() => {
    const getMessagers = async () => {
      var messagers : string[] = [];
      for (const chatRoom of data) {
        const messager = await getMessagerFromParticipants(chatRoom.participants);
        messagers.push(messager?.firstName + ' ' + messager?.lastName);
      }
      setMessagers(messagers);
    }
    getMessagers();
  }, [data])
  
  const getMessagerFromParticipants = async (participants: string[]) => {
    const messagerId = participants.filter((participant) => participant !== user?._id)[0];
    return await getUserFromId(messagerId);
  }

  const getMostRecentMessage = (messages: Message[] | null) => {
    return messages?.slice(-1)[0]?.content;
  }

  const setFocused = async (chatRoom : ChatRoom) => {
    dispatch(setFocusedChatRoom(chatRoom));
    dispatch(setFocusedMessager(await getMessagerFromParticipants(chatRoom.participants)));
    navigation.navigate('Chat');
  }  
  
  return (
    <View >
        { data ?
          data.map((item: ChatRoom, index: number)=> {
            return(
              <Pressable key={item._id} onPress={() => setFocused(item)}>
                <Card style={styles.card} mode='contained'>
                  <Card.Title title={messagers[index]} />
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