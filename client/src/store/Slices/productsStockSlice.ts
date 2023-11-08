import { PayloadAction, createSlice } from '@reduxjs/toolkit';
import type { RootState } from '../store';
import { ProductsStockState } from '../../types/stockInterfaces';
import { Products } from '../../types/addsInterfaces';

const initialState: ProductsStockState = {
    productsStock: [],
    isAllowedExpand: true
}

export const productsStockSlice = createSlice({
  name: 'products_stock',
  initialState,
  reducers: {
    setProductsStockData: (state, action: PayloadAction<Array<Products>>) => {
      state.productsStock = action.payload;
    },
    setIsAllowedExpand: (state, action: PayloadAction<boolean>) => {
      state.isAllowedExpand = action.payload;
    }
  }
});

export const { setProductsStockData, setIsAllowedExpand } = productsStockSlice.actions;

export const getProductsStock = (state: RootState) => state.productsStock.productsStock;
export const getIsAllowedExpand = (state: RootState) => state.productsStock.isAllowedExpand;

export default productsStockSlice.reducer;