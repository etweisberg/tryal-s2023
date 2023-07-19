import { createAsyncThunk, createEntityAdapter, createSlice, PayloadAction } from '@reduxjs/toolkit';
import { RootState } from './index';
import { getUser } from '../api/fakeApiUser';
import { ChatRoom, Message, User } from '../utils/types';
import { testChatRoom1, testChatRoom2, testChatRoom3, testUser1 } from '../utils/testObjs';
import { Socket } from 'socket.io-client';
import { io } from 'socket.io-client';
import { serverUrl } from '../utils/apiCalls';

// Define the state type and initial value
interface ChatsState {
  chatRooms: ChatRoom[];
  focusedChatRoom: ChatRoom | null;
  focusedMessager: User | null;
}

const initialState: ChatsState = {
  chatRooms: [],
  focusedChatRoom: null,
  focusedMessager: null,
};

// Create a slice of state and reducers for the user
const chatsSlice = createSlice({
  name: 'chats',
  initialState,
  reducers: {
    // Reducer to set focused chat room
    setFocusedChatRoom: (state, { payload }: PayloadAction<ChatRoom | null>) => {
      state.focusedChatRoom = payload;
    },
    // Reducer to set focused messager
    setFocusedMessager: (state, { payload }: PayloadAction<User | null>) => {
      state.focusedMessager = payload;
    },
    // Reducer to add new messages to a chat room
    newMessages: (state, { payload }: PayloadAction<{ chatRoomId: string | undefined, messages: Message[] }>) => {
      // only execute if chatRoomId is defined
      if (payload.chatRoomId) {
        // loop through chat rooms and add messages to the correct chat room
        state.chatRooms.forEach((chatRoom) => {
          // if chat room id matches, add messages to the chat room
          if (chatRoom._id === payload.chatRoomId) {
            chatRoom.messages = [...chatRoom.messages, ...payload.messages];
          }
        })
        // emit a message to the server that the messages have been sent
        const socket = io(serverUrl, {});
        socket.emit('new message', payload);
        socket.disconnect();
      }
    },

    // Reducer to read all messages in a chat room
    readMessages: (state, { payload }: PayloadAction<{ chatRoomId: string | undefined }>) => {
      // only execute if chatRoomId is defined
      if (payload.chatRoomId) {
        // loop through chat rooms and add messages to the correct chat room
        state.chatRooms.forEach((chatRoom) => {
          // if chat room id matches, set all messages to read at current time
          if (chatRoom._id === payload.chatRoomId) {
            chatRoom.messages.forEach((message) => {
              if (message.read === null) {
                message.read = new Date().toISOString();
              }
            })
          }
        })
        // emit a message to the server that the messages have been read
        const socket = io(serverUrl, {});
        socket.emit('read message', payload);
        socket.disconnect();
      }
    },

    // Reducer to delete a message from a chat room
    deleteMessage: (state, { payload }) => {
      // only execute if chatRoomId is defined
      if (payload.chatRoomId) {
        // loop through chat rooms and add messages to the correct chat room
        state.chatRooms.forEach((chatRoom) => {
          // if chat room id matches, delete the message from the chat room
          if (chatRoom._id === payload.chatRoomId) {
            chatRoom.messages = chatRoom.messages.filter(
              (message) => message._id !== payload.message._id
              );
          }
        })
        // emit a message to the server that the message has been deleted
        const socket = io(serverUrl, {});
        socket.emit('delete message', payload);
        socket.disconnect();
      }
    },

    // Reducer to add a new chat room
    newChatRoom: (state, { payload }: PayloadAction<ChatRoom | null>) => {
      if (payload) {
        state.chatRooms.push(payload);
      }
      // emit a message to the server that the chat room has been created
      const socket = io(serverUrl, {});
      socket.emit('new chatroom', payload);
      socket.disconnect();
    }

  },
});

export const { setFocusedChatRoom, setFocusedMessager, newMessages, readMessages, deleteMessage, newChatRoom } = chatsSlice.actions;

export const getChatRooms = (state: RootState): ChatRoom[] => state.chats.chatRooms;
export const getFocusedChatRoom = (state: RootState): ChatRoom | null => state.chats.focusedChatRoom;
export const getFocusedMessager = (state: RootState): User | null => state.chats.focusedMessager;

export const chatsReducer = chatsSlice.reducer;