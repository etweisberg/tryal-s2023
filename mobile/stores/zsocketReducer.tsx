import { createAsyncThunk, createEntityAdapter, createSlice, PayloadAction } from '@reduxjs/toolkit';
import { RootState } from './index';
import { getUser } from '../api/fakeApiUser';
import { ChatRoom, User } from '../utils/types';
import { testChatRoom1, testUser1 } from '../utils/testObjs';
import { Socket } from 'socket.io-client';
import { io } from 'socket.io-client';
import { serverUrl } from '../utils/apiCalls';

// DEPRECATED CODE
// THIS IS ALL OLD CODE!!!!!!!!!!


interface SocketState {
  socket: Socket;
}

const initialState : SocketState = {
  socket: io(serverUrl, {})
}

// Create a slice of state and reducers for the socket
const socketSlice = createSlice({
  name: 'socket',
  initialState,
  reducers: {
    // Reducer to send a message to the server
    sendMessage: (state, payload) => {
      state.socket.emit('message', payload);
    },
    // Reducer to tell the server a message has been read
    readMessages: (state, payload) => {
      state.socket.emit('read', payload);
    },
    // Reducer to delete a message from the server
    deleteMessage: (state, payload) => {
      state.socket.emit('delete', payload);
    },
    // Reducer to create a room
    createRoom: (state, payload) => {
      state.socket.emit('create', payload);
    },
    // Reducer to join a room
    joinRoom: (state, payload) => {
      state.socket.emit('join', payload);
    },
    // Reducer to leave a room
    leaveRoom: (state, payload) => {
      state.socket.emit('leave', payload);
    },
    // Reducer to connect to the server
    connect: (state) => {
      state.socket.connect();
    },
    // Reducer to disconnect from the server
    disconnect: (state) => {
      state.socket.disconnect();
    }

  },
});

export const { sendMessage, readMessages, deleteMessage, createRoom, joinRoom, leaveRoom, connect, disconnect } = socketSlice.actions;

// export const getSocket = (state : RootState): Socket => state.socket.socket;

export const socketReducer = socketSlice.reducer;