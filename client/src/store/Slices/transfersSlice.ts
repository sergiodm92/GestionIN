import { PayloadAction, createSlice } from '@reduxjs/toolkit';
import type { RootState } from '../store';
import { CoffinTransferState, GetCoffinTransfer } from '../../types/transfer';

const initialState: CoffinTransferState = {
    transfers: [],
    isAllowedExpand: true
}

export const coffinTransferSlice = createSlice({
  name: 'coffinTransfer',
  initialState,
  reducers: {
    setCoffinTransfersData: (state, action: PayloadAction<Array<GetCoffinTransfer>>) => {
      state.transfers = action.payload;
    },
    setIsAllowedExpand: (state, action: PayloadAction<boolean>) => {
      state.isAllowedExpand = action.payload;
    }
  }
});

export const { setCoffinTransfersData, setIsAllowedExpand } = coffinTransferSlice.actions;

export const getCoffinTransfers = (state: RootState) => state.coffinTransfers.transfers;
export const getIsAllowedExpand = (state: RootState) => state.coffinTransfers.isAllowedExpand;

export default coffinTransferSlice.reducer;