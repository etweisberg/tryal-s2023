import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { RootState } from './index';

// Define a type for the slice state
export type User = {
  _id: string;
  firstName: string;
  lastName: string;
  email: string;
  password: string;
  verified: boolean;
  verificationToken: string | null | undefined;
  resetPasswordToken: string | null | undefined;
  resetPasswordTokenExpiryDate: Date | null | undefined;
  trials: Array<string>;
  trialsOwned: Array<string>;
  age: number | null;
  medConditions: Array<string>;
  homeAddress: string;
  seekingCompensation: boolean;
  researcher: boolean;
  institution: string;
  admin: boolean;
}

// Define the state type and initial value
interface UserState {
  user: User | null;
  isLoading: boolean;
  error: string | null;
}

const initialState: UserState = {
  user: null,
  isLoading: false,
  error: null,
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
    setError: (state, action: PayloadAction<string | null>) => {
      state.error = action.payload;
    },
  },
});

export const { loginUser, logoutUser, setLoading, setError } = userSlice.actions;

export const getCurrentUser = (state: RootState): User | null => state.user.user;

export const userReducer = userSlice.reducer;

export const currentUserSelector = (state: RootState): User | null => state.user.user && (state.user.user as User);

export type CurrentUserSelectorReturnType = ReturnType<typeof currentUserSelector>;