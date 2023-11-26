import { createSlice } from '@reduxjs/toolkit';
import type { RootState } from '../store';
import { User } from '../../types/userInterfaces';

const initialState: 
User = {
  name: "",
  admin: false,
  place: ""
  }

export const userSlice = createSlice({
  name: 'user',
  initialState,
  reducers: {
    setLoginData: (state) => {
      state.name = localStorage.getItem("userName") as string;
      state.admin = localStorage.getItem("userAdmin")==="true"?true:false;
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