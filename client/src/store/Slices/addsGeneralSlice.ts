import { PayloadAction, createSlice } from '@reduxjs/toolkit';
import type { RootState } from '../store';
import { AddGeneral, AddGeneralState } from '../../types/addsInterfaces';

const initialState: AddGeneralState = {
    addsGeneral: [],
    addGeneral:{
      id: "",
      product: "",
      date: 0,
      responsible: "",
      amount: 0,
      supplier: "",
      place: ""
    },
    isAllowedExpand: true
}

export const addsGeneralSlice = createSlice({
  name: 'adds_general',
  initialState,
  reducers: {
    setAddsGralData: (state, action: PayloadAction<Array<AddGeneral>>) => {
      state.addsGeneral = action.payload;
    },
    setAddGralData: (state, action: PayloadAction<AddGeneral>) => {
      state.addGeneral = action.payload;
    },
    setIsAllowedExpand: (state, action: PayloadAction<boolean>) => {
      state.isAllowedExpand = action.payload;
    }
  }
});

export const { setAddsGralData, setAddGralData, setIsAllowedExpand } = addsGeneralSlice.actions;

export const getAddsGeneral = (state: RootState) => state.addsGeneral.addsGeneral;
export const getAddGeneral = (state: RootState) => state.addsGeneral.addGeneral;
export const getIsAllowedExpand = (state: RootState) => state.addsGeneral.isAllowedExpand;

export default addsGeneralSlice.reducer;