import { createAsyncThunk, createSelector, createSlice } from '@reduxjs/toolkit';
import authService from '../services/auth.service';
import { auth, provider } from '../firebase'; 
import { signInWithPopup } from 'firebase/auth';

const initialState = {
  isAuthenticated: !!localStorage.getItem('access_token'),
  accessToken: localStorage.getItem('access_token') || null,
  error: null,
  loading: false,
};

export const login = createAsyncThunk(
  'auth/login',
  async ({ username, password }, { rejectWithValue }) => {
    console.log("password: ", username, password)
    try {
      const accessToken = await authService.login(username, password);
      const data = await authService.getCurrentUser(accessToken)
      return {data};
    } catch (error) {
      return rejectWithValue(error.message);
    }
  }
);
export const loginGoogle = createAsyncThunk(
    'auth/loginGoogle',
    async (_, { rejectWithValue }) => {
      try {
        const result = await signInWithPopup(auth, provider);
        const Token = result.user.accessToken; 
        const access_token = await authService.loginGoogle(Token);
        const data = await authService.getCurrentUser(access_token)
        return { data };
      } catch (error) {
        return rejectWithValue(error.message);
      }
    }
  );

export const logout = createAsyncThunk(
  'auth/logout',
  async (_, { rejectWithValue }) => {
    try {
      await authService.logout();
      return null;
    } catch (error) {
      return rejectWithValue(error.message);
    }
  }
);

const authSlice = createSlice({
  name: 'auth',
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(login.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(login.fulfilled, (state, action) => {
        state.isAuthenticated = true;
        state.accessToken = action.payload;
        state.loading = false;
      })
      .addCase(login.rejected, (state, action) => {
        state.error = action.payload;
        state.loading = false;
      })
      .addCase(loginGoogle.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(loginGoogle.fulfilled, (state, action) => {
        state.isAuthenticated = true;
        state.user = action.payload;
        state.loading = false;
      })
      .addCase(loginGoogle.rejected, (state, action) => {
        state.error = action.payload;
        state.loading = false;
      })
      .addCase(logout.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(logout.fulfilled, (state) => {
        state.isAuthenticated = false;
        state.accessToken = null;
        state.loading = false;
      })
      .addCase(logout.rejected, (state, action) => {
        state.error = action.payload;
        state.loading = false;
      });
  },
});

export default authSlice.reducer;
export const currentuser = createSelector(
  (state) => state.auth,
  (auth) =>  auth
);
