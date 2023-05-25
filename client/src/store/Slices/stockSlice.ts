import { PayloadAction, createSlice } from '@reduxjs/toolkit';
import type { RootState } from '../store';
import { GetStock, StockState } from '../../types/stockInterfaces';

const initialState: StockState = {
    stock: [],
    isAllowedExpand: true
}

export const stockSlice = createSlice({
  name: 'stock',
  initialState,
  reducers: {
    setStockData: (state, action: PayloadAction<Array<GetStock>>) => {
      state.stock = action.payload;
    },
    setIsAllowedExpand: (state, action: PayloadAction<boolean>) => {
      state.isAllowedExpand = action.payload;
    }
  }
});

export const { setStockData, setIsAllowedExpand } = stockSlice.actions;

export const getStock = (state: RootState) => state.stock;
export const getIsAllowedExpand = (state: RootState) => state.stock.isAllowedExpand;

export default stockSlice.reducer;