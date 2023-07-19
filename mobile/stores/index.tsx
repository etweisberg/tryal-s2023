import { configureStore } from '@reduxjs/toolkit';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { persistStore, persistReducer } from 'redux-persist'
import storage from 'redux-persist/lib/storage' 
import { userReducer } from './userReducer';
import { socketReducer } from './zsocketReducer';
import { chatsReducer } from './chatsReducer';

export interface RootState {
  user: ReturnType<typeof userReducer>;
  chats: ReturnType<typeof chatsReducer>;
}

const persistConfig = {
  key: 'root',
  storage: AsyncStorage,
}

const persistedUserReducer = persistReducer(persistConfig, userReducer)

export const store = configureStore({
  reducer: {
    user: persistedUserReducer,
    chats: chatsReducer,
  },
});

export const persistor = persistStore(store)
export type AppDispatch = typeof store.dispatch;