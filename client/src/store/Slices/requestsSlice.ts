import { PayloadAction, createSlice } from '@reduxjs/toolkit';
import type { RootState } from '../store';
import { Request, RequestState } from '../../types/requestsInterfaces';

const initialState: RequestState = {
    requests: [],
    request:{
      cladding: "",
			cementery: "",
			additional: "",
			id: "",
			agreement: "",
			burial_time: "",
			wreath: false,
			id_deceased: "",
			way_to_pay: "",
			policy: "",
			id_coffin: "",
			burial_place: "",
			service_improvement: "",
			holder_relationship: "",
			cetificate_number: 0,
			date: 0,
			present: "",
			funeral: "",
			place: "",
			holder_name: ""
    },
    isAllowedExpand: true
}

export const requestsSlice = createSlice({
  name: 'requests',
  initialState,
  reducers: {
    setRequestsData: (state, action: PayloadAction<Array<Request>>) => {
      state.requests = action.payload;
    },
    setRequestData: (state, action: PayloadAction<Request>) => {
      state.request = action.payload;
    },
    setIsAllowedExpand: (state, action: PayloadAction<boolean>) => {
      state.isAllowedExpand = action.payload;
    }
  }
});

export const { setRequestsData, setRequestData, setIsAllowedExpand } = requestsSlice.actions;

export const getRequests = (state: RootState) => state.requests;
export const getRequest = (state: RootState) => state.request;
export const getIsAllowedExpand = (state: RootState) => state.requests.isAllowedExpand;

export default requestsSlice.reducer;