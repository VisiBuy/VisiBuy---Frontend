import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { AuthState,User } from '../models/types';

const initialAuthState: AuthState = {
  user: null,
  token: null,
  isAuthenticated: false,
  isLoading: false,
  error: null,
};

const authSlice = createSlice({
  name: 'auth',
  initialState:initialAuthState,
  reducers: {
    setCredentials: (
      state,
      action: PayloadAction<{ user?: User; token: string }>
    ) => {
      const { user, token } = action.payload;
      //state.user = user;
      state.token = token;
      state.isAuthenticated = true;
    },
    setLoading: (state, action: PayloadAction<boolean>) => {
      state.isLoading = action.payload;
    },
    setError: (state, action: PayloadAction<string | null>) => {
      state.error = action.payload;
    },
    logout: (state) => {
      state.user = null;
      state.token = null;
      state.isAuthenticated = false;
      state.error = null;
    },
  },
});

export const { setCredentials, setLoading, setError, logout } = authSlice.actions;
export default authSlice.reducer;