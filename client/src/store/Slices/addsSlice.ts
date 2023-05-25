import { PayloadAction, createSlice } from '@reduxjs/toolkit';
import type { RootState } from '../store';
import { Add, AddState } from '../../types/addsInterfaces';

const initialState: AddState = {
    adds: [],
    add:{
      id: "",
      id_coffin: "",
      date: 0,
      responsible: "",
      units: 0,
      supplier: "",
      place: ""
    },
    isAllowedExpand: true
}

export const addsSlice = createSlice({
  name: 'adds',
  initialState,
  reducers: {
    setAddsData: (state, action: PayloadAction<Array<Add>>) => {
      state.adds = action.payload;
    },
    setAddData: (state, action: PayloadAction<Add>) => {
      state.add = action.payload;
    },
    setIsAllowedExpand: (state, action: PayloadAction<boolean>) => {
      state.isAllowedExpand = action.payload;
    }
  }
});

export const { setAddsData, setAddData, setIsAllowedExpand } = addsSlice.actions;

export const getAdds = (state: RootState) => state.adds;
export const getAdd = (state: RootState) => state.add;
export const getIsAllowedExpand = (state: RootState) => state.adds.isAllowedExpand;

export default addsSlice.reducer;