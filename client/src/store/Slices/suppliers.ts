import { PayloadAction, createSlice } from '@reduxjs/toolkit';
import type { RootState } from '../store';
import { Supplier, SupplierState } from '../../types/suppliers';

const initialState: SupplierState = {
    suppliers: [],
    isAllowedExpand: true
}

export const supplierSlice = createSlice({
  name: 'supplier',
  initialState,
  reducers: {
    setSupplierData: (state, action: PayloadAction<Array<Supplier>>) => {
      state.suppliers = action.payload;
    },
    setIsAllowedExpand: (state, action: PayloadAction<boolean>) => {
      state.isAllowedExpand = action.payload;
    }
  }
});

export const { setSupplierData, setIsAllowedExpand } = supplierSlice.actions;

export const getSuppliers = (state: RootState) => state.suppliers.suppliers;
export const getIsAllowedExpand = (state: RootState) => state.suppliers.isAllowedExpand;

export default supplierSlice.reducer;