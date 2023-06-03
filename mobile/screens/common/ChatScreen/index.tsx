import { View, Text, ScrollView, KeyboardAvoidingView } from 'react-native'
import React, { useCallback, useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux';
import { ChatRoom, Message } from '../../../utils/types';
import { getCurrentUser, getFocusedChatRoom } from '../../../stores/userReducer';
import { GiftedChat } from 'react-native-gifted-chat';
import { IMessage as GiftedChatMessage } from 'react-native-gifted-chat/lib/Models';
import Header from '../../../components/Header';
import { RootState } from '../../../stores';
import styles from '../../../styles';

export default function ChatScreen({navigation}: {navigation: any}) {
  const dispatch = useDispatch();

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

  const goBack = () => {
    navigation.goBack();
  }

  const toProfile = () => {
    // navigation.navigate('Profile');
  }


  const chatRoom = useSelector(getFocusedChatRoom);
  const user = useSelector(getCurrentUser);

  console.log(chatRoom);
  const [messages, setMessages] = useState<GiftedChatMessage[]>([])

  const getMessagerFromParticipants = (participants: string[]) => {
    return participants.filter((participant) => participant !== user?._id)[0];
  }

  const toGiftedChatUser = (id: string) => {
    return {
      _id: id,
      name: getNameFromID(id),
      // avatar: 'https://placeimg.com/140/140/any',
    }
  }

  const toGiftedChatMessage = (message: Message): GiftedChatMessage => {
    return {
      _id: message._id,
      text: message.content,
      createdAt: new Date(message.timestamp),
      user: toGiftedChatUser(message.sender)
    }
  }

  useEffect(() => {
    setMessages(chatRoom?.messages?.map(
      (message) => toGiftedChatMessage(message)
      ) || []
    )
  }, [])

  const onSend = useCallback(({messages = []}: {messages: GiftedChatMessage[]}) => {
    setMessages(previousMessages => GiftedChat.append(previousMessages, messages))
  }, [])
  
  return (
    <View style={{flex:1, width: '100%'}}>
      <View style={{width: '100%', paddingHorizontal: 16, paddingTop: 24}}>
        <Header 
        title={getNameFromID(getMessagerFromParticipants(chatRoom?.participants || []))}
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