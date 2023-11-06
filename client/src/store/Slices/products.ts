import { PayloadAction, createSlice } from '@reduxjs/toolkit';
import type { RootState } from '../store';
import { Products, ProductsState } from '../../types/addsInterfaces';

const initialState: ProductsState = {
    products: [],
    isAllowedExpand: true
}

export const productsSlice = createSlice({
  name: 'products',
  initialState,
  reducers: {
    setProductsData: (state, action: PayloadAction<Array<Products>>) => {
      state.products = action.payload;
    },
    setIsAllowedExpand: (state, action: PayloadAction<boolean>) => {
      state.isAllowedExpand = action.payload;
    }
  }
});

export const { setProductsData, setIsAllowedExpand } = productsSlice.actions;

export const getProducts = (state: RootState) => state.products.products;
export const getIsAllowedExpand = (state: RootState) => state.products.isAllowedExpand;

export default productsSlice.reducer;