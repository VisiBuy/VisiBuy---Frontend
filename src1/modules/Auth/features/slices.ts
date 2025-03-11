import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { AuthState, Role, User } from "../models/types";

export const initialAuthState: AuthState = {
  user: null,
  token: null,
  isAuthenticated: false,
  isLoading: false,
  error: null,
  role: null,
};

const authSlice = createSlice({
  name: "auth",
  initialState: initialAuthState,
  reducers: {
    setCredentials: (
      state,
      action: PayloadAction<{ user?: User; token?: string; role?: Role }>
    ) => {
      const { user, token, role } = action.payload;
      state.user = user || state.user; // selective update
      state.token = token ?? state.token;
      state.isAuthenticated = true
      state.role = role?.toLowerCase() as Role || state.role;
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

export const { setCredentials, setLoading, setError, logout } =
  authSlice.actions;
export default authSlice.reducer;
