import { PayloadAction, createSlice } from '@reduxjs/toolkit';
import type { RootState } from '../store';
import { AddProducts, AddProductsState } from '../../types/addsInterfaces';

const initialState: AddProductsState = {
    addsProducts: [],
    addProducts:{
      id: "",
      products: [],
      date: 0,
      responsible: "",
      place: "",
      status:""
    },
    isAllowedExpand: true
}

export const addsProductsSlice = createSlice({
  name: 'adds_general',
  initialState,
  reducers: {
    setAddsProdData: (state, action: PayloadAction<Array<AddProducts>>) => {
      state.addsProducts = action.payload;
    },
    setAddProdData: (state, action: PayloadAction<AddProducts>) => {
      state.addProducts = action.payload;
    },
    setIsAllowedExpand: (state, action: PayloadAction<boolean>) => {
      state.isAllowedExpand = action.payload;
    }
  }
});

export const { setAddsProdData, setAddProdData, setIsAllowedExpand } = addsProductsSlice.actions;

export const getAddsProducts = (state: RootState) => state.addsProducts.addsProducts;
export const getAddProducts = (state: RootState) => state.addsProducts.addProducts;
export const getIsAllowedExpand = (state: RootState) => state.addsProducts.isAllowedExpand;

export default addsProductsSlice.reducer;