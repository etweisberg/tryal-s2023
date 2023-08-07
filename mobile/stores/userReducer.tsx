import { createAsyncThunk, createEntityAdapter, createSlice, PayloadAction } from '@reduxjs/toolkit';
import { RootState } from './index';
import { ChatRoom, User } from '../utils/types';

// Define the state type and initial value
interface UserState {
  user: User | null;
  isLoading: boolean;
  view: string;
  error: string | null;
  focusedTabs: string;
}

const initialState: UserState = {
  user: null,
  isLoading: false,
  view: 'participant',
  error: null,
  focusedTabs: 'participant'
};

// Create a slice of state and reducers for the user
const userSlice = createSlice({
  name: 'user',
  initialState,
  reducers: {
    loginUser: (state, { payload }: PayloadAction<User | null>) => {
      if (payload) {
        state.user = payload;
      } else {
        state.user = null;
      }
    },
    logoutUser: (state) => {
      state.user = null;
    },
    setLoading: (state, action: PayloadAction<boolean>) => {
      state.isLoading = action.payload;
    },
    setView: (state, action: PayloadAction<string>) => {
      state.view = action.payload;
    },
    setError: (state, action: PayloadAction<string | null>) => {
      state.error = action.payload;
    },
  },
});

export const { loginUser, logoutUser, setLoading, setError, setView } = userSlice.actions;

export const getCurrentUser = (state: RootState): User | null => state.user.user;
export const getIsLoading = (state: RootState): boolean => state.user.isLoading;
export const getView = (state: RootState): string => state.user.view;
export const getError = (state: RootState): string | null => state.user.error;
export const getFocusedTabs = (state: RootState): string => state.user.focusedTabs;

export const userReducer = userSlice.reducer;

export const currentUserSelector = (state: RootState): User | null => state.user.user && (state.user.user as User);

export type CurrentUserSelectorReturnType = ReturnType<typeof currentUserSelector>;