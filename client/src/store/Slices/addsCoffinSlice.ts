import { PayloadAction, createSlice } from '@reduxjs/toolkit';
import type { RootState } from '../store';
import { AddCoffin, AddCoffinState } from '../../types/addsInterfaces';

const initialState: AddCoffinState = {
  addsCoffin: [],
  addCoffin: {
    id: "",
    date: 0,
    responsible: "",
    place: "",
    coffins: [],
    metal_box: [],
    status: ""
  },
  isAllowedExpand: true
}

export const addsCoffinSlice = createSlice({
  name: 'adds_coffin',
  initialState,
  reducers: {
    setAddsData: (state, action: PayloadAction<Array<AddCoffin>>) => {
      state.addsCoffin = action.payload;
    },
    setAddData: (state, action: PayloadAction<AddCoffin>) => {
      state.addCoffin = action.payload;
    },
    setIsAllowedExpand: (state, action: PayloadAction<boolean>) => {
      state.isAllowedExpand = action.payload;
    }
  }
});

export const { setAddsData, setAddData, setIsAllowedExpand } = addsCoffinSlice.actions;

export const getAddsCoffin = (state: RootState) => state.addsCoffin.addsCoffin;
export const getAddCoffin = (state: RootState) => state.addsCoffin.addCoffin;
export const getIsAllowedExpand = (state: RootState) => state.addsCoffin.isAllowedExpand;

export default addsCoffinSlice.reducer;