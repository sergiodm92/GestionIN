import { PayloadAction, createSlice } from '@reduxjs/toolkit';
import type { RootState } from '../store';
import { AddMetalBox, AddMetalBoxState } from '../../types/addsInterfaces';

const initialState: AddMetalBoxState = {
    addsMetalBox: [],
    addMetalBox:{
      id: "",
      id_doc: "",
      size: "",
      date: 0,
      responsible: "",
      units: 0,
      supplier: "",
      place: ""
    },
    isAllowedExpand: true
}

export const addsMetalBoxSlice = createSlice({
  name: 'adds_metal_box',
  initialState,
  reducers: {
    setAddsMBData: (state, action: PayloadAction<Array<AddMetalBox>>) => {
      state.addsMetalBox = action.payload;
    },
    setAddMBData: (state, action: PayloadAction<AddMetalBox>) => {
      state.addMetalBox = action.payload;
    },
    setIsAllowedExpand: (state, action: PayloadAction<boolean>) => {
      state.isAllowedExpand = action.payload;
    }
  }
});

export const { setAddsMBData, setAddMBData, setIsAllowedExpand } = addsMetalBoxSlice.actions;

export const getAddsMetalBox = (state: RootState) => state.addsMetalBox.addsMetalBox;
export const getAddMetalBox = (state: RootState) => state.addsMetalBox.addMetalBox;
export const getIsAllowedExpand = (state: RootState) => state.addsMetalBox.isAllowedExpand;

export default addsMetalBoxSlice.reducer;