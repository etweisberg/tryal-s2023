import { View, Text, ScrollView, KeyboardAvoidingView } from 'react-native'
import React, { useCallback, useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux';
import { ChatRoom, Message, User } from '../../../utils/types';
import { getCurrentUser } from '../../../stores/userReducer';
import { getFocusedChatRoom, getFocusedMessager, newMessages, readMessages } from '../../../stores/chatsReducer';
import { GiftedChat } from 'react-native-gifted-chat';
import { IMessage as GiftedChatMessage } from 'react-native-gifted-chat/lib/Models';
import Header from '../../../components/Header';

export default function ChatScreen({navigation}: {navigation: any}) {
  const [messages, setMessages] = useState<GiftedChatMessage[]>([])

  // get chat room and messager from redux
  const chatRoom : ChatRoom | null = useSelector(getFocusedChatRoom);
  const messager : User | null = useSelector(getFocusedMessager);
  const user : User | null = useSelector(getCurrentUser);
  const dispatch = useDispatch();

  useEffect(() => {
    // set messages as gifted chat messages in local state
    setMessages(chatRoom?.messages?.map(
      (message) => toGiftedChatMessage(message)
      ) || []
    )
    // read messages in redux
    dispatch(readMessages({chatRoomId: chatRoom?._id}))

    // emit from socket that messages have been read
    dispatch(readMessages({chatRoomId: chatRoom?._id}))
  }, [])

  const goBack = () => {
    navigation.goBack();
  }

  const toProfile = () => {
    // navigation.navigate('Profile');
  }

  const toGiftedChatUser = (user: User | null) => {
    if (user) {
      return {
        _id: user._id,
        name: user.firstName + ' ' + user.lastName.charAt(0) + '.',
        // avatar: 'https://placeimg.com/140/140/any',
      }
    } else {
      return {
        _id: '0',
        name: 'Unknown',
      };
    }
  }

  const toGiftedChatMessage = (message: Message): GiftedChatMessage => {
    return {
      _id: message._id,
      text: message.content,
      createdAt: new Date(message.timestamp),
      user: toGiftedChatUser(messager),
    }
  }

  const onSend = useCallback(({messages = []}: {messages: GiftedChatMessage[]}) => {
    dispatch(newMessages({
      chatRoomId: chatRoom?._id,
      messages: messages.map((message) => {
        const msg : Message = {
          _id: message._id.toString(),
          content: message.text,
          timestamp: message.createdAt.toString(),
          sender: user?._id.toString() || '0',
          recipient: messager?._id.toString() || '0',
          read: null,
          deletedForRecipient: false,
          deletedForSender: false,
        }
        return msg;
      })
    }))
  }, [])
  
  return (
    <View style={{flex:1, width: '100%'}}>
      <View style={{width: '100%', paddingHorizontal: 16, paddingTop: 24}}>
        <Header 
        title={messager?.firstName + ' ' + messager?.lastName.charAt(0) + '.'}
        leftComponentType='touchable-icon' leftText='chevron-back-outline' onLeftPress={goBack}
        rightComponentType='touchable-text' rightText='See Profile' onRightPress={toProfile}
        />
      </View>
      <KeyboardAvoidingView style={{flex:1, width: '100%'}} keyboardVerticalOffset={100}>
        <GiftedChat
          messages={messages}
          onSend={messages => onSend({messages})}
          user={user? {
            _id: user._id,
            name: user.firstName + ' ' + user.lastName.charAt(0) + '.',
            // avatar: 'https://placeimg.com/140/140/any',
          } : undefined}
          infiniteScroll
          loadEarlier
          // isTyping
          showUserAvatar
          renderUsernameOnMessage
        />
      </KeyboardAvoidingView>

    </View>
  )
}