import { configureStore } from '@reduxjs/toolkit';
import { userReducer } from './userReducer';

export interface RootState {
  user: ReturnType<typeof userReducer>;
}

export const store = configureStore({
  reducer: {
    user: userReducer,
  },
});

export type AppDispatch = typeof store.dispatch;
