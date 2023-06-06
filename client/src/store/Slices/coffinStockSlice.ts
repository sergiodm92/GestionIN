import { PayloadAction, createSlice } from '@reduxjs/toolkit';
import type { RootState } from '../store';
import { GetCoffinStock, CoffinStockState } from '../../types/stockInterfaces';

const initialState: CoffinStockState = {
    coffinStock: [],
    isAllowedExpand: true
}

export const coffinStockSlice = createSlice({
  name: 'coffin_stock',
  initialState,
  reducers: {
    setStockData: (state, action: PayloadAction<Array<GetCoffinStock>>) => {
      state.coffinStock = action.payload;
    },
    setIsAllowedExpand: (state, action: PayloadAction<boolean>) => {
      state.isAllowedExpand = action.payload;
    }
  }
});

export const { setStockData, setIsAllowedExpand } = coffinStockSlice.actions;

export const getCoffinStock = (state: RootState) => state.coffinStock.coffinStock;
export const getIsAllowedExpand = (state: RootState) => state.coffinStock.isAllowedExpand;

export default coffinStockSlice.reducer;