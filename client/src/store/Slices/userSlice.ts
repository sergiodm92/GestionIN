import { createSlice } from '@reduxjs/toolkit';
import type { RootState } from '../store';
import { User } from 'userInterfaces';

const initialState: 
User = {
  name: '',
  admin: true,
  place: ''
  }

export const userSlice = createSlice({
  name: 'user',
  initialState,
  reducers: {
    setLoginData: (state) => {
      state.name = localStorage.getItem("userName") as string;
      state.admin = Boolean(localStorage.getItem("userAdmin"));
      state.place = localStorage.getItem("userPlace") as string;
    },
    setLogoutData: (state) => {
      state.name = '';
      state.admin = false;
      state.place = '';
    }
  },
});

export const { setLoginData, setLogoutData } = userSlice.actions;

export const getUser = (state: RootState) => state.user;

export default userSlice.reducer;