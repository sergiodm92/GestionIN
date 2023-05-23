import { PayloadAction, createSlice } from '@reduxjs/toolkit';
import type { RootState } from '../store';
import { Deceased, DeceasedState } from 'requestsInterfaces';

const initialState: DeceasedState = {
    deceaseds: [],
    isAllowedExpand: true
}

export const deceasedsSlice = createSlice({
  name: 'deceaseds',
  initialState,
  reducers: {
    setDeceasedsData: (state, action: PayloadAction<Array<Deceased>>) => {
      state.deceaseds = action.payload;
    },
    setIsAllowedExpand: (state, action: PayloadAction<boolean>) => {
      state.isAllowedExpand = action.payload;
    }
  }
});

export const { setDeceasedsData, setIsAllowedExpand } = deceasedsSlice.actions;

export const getDeceaseds = (state: RootState) => state.deceaseds;
export const getIsAllowedExpand = (state: RootState) => state.deceaseds.isAllowedExpand;

export default deceasedsSlice.reducer;