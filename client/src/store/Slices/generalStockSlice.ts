import { PayloadAction, createSlice } from '@reduxjs/toolkit';
import type { RootState } from '../store';
import { GeneralStockState, GetGeneralStock } from '../../types/stockInterfaces';

const initialState: GeneralStockState = {
    generalStock: [],
    isAllowedExpand: true
}

export const generalStockSlice = createSlice({
  name: 'general_stock',
  initialState,
  reducers: {
    setGeneralStockData: (state, action: PayloadAction<Array<GetGeneralStock>>) => {
      state.generalStock = action.payload;
    },
    setIsAllowedExpand: (state, action: PayloadAction<boolean>) => {
      state.isAllowedExpand = action.payload;
    }
  }
});

export const { setGeneralStockData, setIsAllowedExpand } = generalStockSlice.actions;

export const getGeneralStock = (state: RootState) => state.generalStock.generalStock;
export const getIsAllowedExpand = (state: RootState) => state.generalStock.isAllowedExpand;

export default generalStockSlice.reducer;