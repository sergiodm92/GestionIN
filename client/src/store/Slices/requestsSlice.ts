import { PayloadAction, createSlice } from '@reduxjs/toolkit';
import type { RootState } from '../store';
import { Request, RequestState } from 'requestsInterfaces';

const initialState: RequestState = {
    requests: [],
    isAllowedExpand: true
}

export const requestsSlice = createSlice({
  name: 'requests',
  initialState,
  reducers: {
    setRequestsData: (state, action: PayloadAction<Array<Request>>) => {
      state.requests = action.payload;
    },
    setIsAllowedExpand: (state, action: PayloadAction<boolean>) => {
      state.isAllowedExpand = action.payload;
    }
  }
});

export const { setRequestsData, setIsAllowedExpand } = requestsSlice.actions;

export const getRequests = (state: RootState) => state.requests;
export const getIsAllowedExpand = (state: RootState) => state.requests.isAllowedExpand;

export default requestsSlice.reducer;