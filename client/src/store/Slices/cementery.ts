import { PayloadAction, createSlice } from '@reduxjs/toolkit';
import type { RootState } from '../store';
import { Cementery, CementeryState } from '../../types/cementery';

const initialState: CementeryState = {
    cementery: [],
    isAllowedExpand: true
}

export const cementerySlice = createSlice({
  name: 'cementery',
  initialState,
  reducers: {
    setCementeryData: (state, action: PayloadAction<Array<Cementery>>) => {
      state.cementery = action.payload;
    },
    setIsAllowedExpand: (state, action: PayloadAction<boolean>) => {
      state.isAllowedExpand = action.payload;
    }
  }
});

export const { setCementeryData, setIsAllowedExpand } = cementerySlice.actions;

export const getCementery = (state: RootState) => state.cementery.cementery;
export const getIsAllowedExpand = (state: RootState) => state.cementery.isAllowedExpand;

export default cementerySlice.reducer;