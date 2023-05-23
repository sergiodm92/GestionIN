import { PayloadAction, createSlice } from '@reduxjs/toolkit';
import type { RootState } from '../store';
import { Add, AddState } from 'addsInterfaces';

const initialState: AddState = {
    adds: [],
    isAllowedExpand: true
}

export const addsSlice = createSlice({
  name: 'adds',
  initialState,
  reducers: {
    setAddsData: (state, action: PayloadAction<Array<Add>>) => {
      state.adds = action.payload;
    },
    setIsAllowedExpand: (state, action: PayloadAction<boolean>) => {
      state.isAllowedExpand = action.payload;
    }
  }
});

export const { setAddsData, setIsAllowedExpand } = addsSlice.actions;

export const getAdds = (state: RootState) => state.adds;
export const getIsAllowedExpand = (state: RootState) => state.adds.isAllowedExpand;

export default addsSlice.reducer;