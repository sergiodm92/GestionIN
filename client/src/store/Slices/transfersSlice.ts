import { PayloadAction, createSlice } from '@reduxjs/toolkit';
import type { RootState } from '../store';
import { CoffinTransfer, CoffinTransferState, GetCoffinTransfer } from '../../types/transfer';

const initialState: CoffinTransferState = {
    transfers: [],
    transfer:{
      date: 0,
      add_id: "",
      coffin_group_id: "",
      place_origin: "",
      place_destiny: "",
      responsible: "",
      coffin: {
        id: "",
        supplier: "",
        units: 0,
        type: "",
        size: "",
        color: "",
        mbox: false,
      }
    },
    isAllowedExpand: true
}

export const coffinTransferSlice = createSlice({
  name: 'coffinTransfer',
  initialState,
  reducers: {
    setCoffinTransfersData: (state, action: PayloadAction<Array<GetCoffinTransfer>>) => {
      state.transfers = action.payload;
    },
    setCoffinTransferData: (state, action: PayloadAction<CoffinTransfer>) => {
      state.transfer = action.payload;
    },
    setIsAllowedExpand: (state, action: PayloadAction<boolean>) => {
      state.isAllowedExpand = action.payload;
    }
  }
});

export const { setCoffinTransfersData, setCoffinTransferData, setIsAllowedExpand } = coffinTransferSlice.actions;

export const getCoffinTransfers = (state: RootState) => state.coffinTransfers.transfers;
export const getCoffinTransfer = (state: RootState) => state.coffinTransfers.transfer;
export const getIsAllowedExpand = (state: RootState) => state.coffinTransfers.isAllowedExpand;

export default coffinTransferSlice.reducer;