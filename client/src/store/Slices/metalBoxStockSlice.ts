import { PayloadAction, createSlice } from '@reduxjs/toolkit';
import type { RootState } from '../store';
import { GetMetalBoxStock, MetalBoxStockState } from '../../types/stockInterfaces';

const initialState: MetalBoxStockState = {
    metalBoxStock: [],
    isAllowedExpand: true
}

export const metalBoxStockSlice = createSlice({
  name: 'metal_box_stock',
  initialState,
  reducers: {
    setMetalBoxStockData: (state, action: PayloadAction<Array<GetMetalBoxStock>>) => {
      state.metalBoxStock = action.payload;
    },
    setIsAllowedExpand: (state, action: PayloadAction<boolean>) => {
      state.isAllowedExpand = action.payload;
    }
  }
});

export const { setMetalBoxStockData, setIsAllowedExpand } = metalBoxStockSlice.actions;

export const getmetalBoxStock = (state: RootState) => state.metalBoxStock.metalBoxStock;
export const getIsAllowedExpand = (state: RootState) => state.metalBoxStock.isAllowedExpand;

export default metalBoxStockSlice.reducer;