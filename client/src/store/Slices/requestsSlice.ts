import { PayloadAction, createSlice } from '@reduxjs/toolkit';
import type { RootState } from '../store';
import { PostRequest, RequestState, Request } from '../../types/requestsInterfaces';


const initialState: RequestState = {
    requests: [],
    request:{
		request: {
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
		deceased: {
			name: "",
			dod:0,
			tombstone: false,
			leyend: "",
			id: "",
			news_paper: "",
			news_paper_name: "",
			pod: "",
			dni: "",
			id_request: "",
			dob: 0,
			cementery_type:""
		}
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
    setRequestData: (state, action: PayloadAction<PostRequest>) => {
      state.request = action.payload;
    },
    setIsAllowedExpand: (state, action: PayloadAction<boolean>) => {
      state.isAllowedExpand = action.payload;
    }
  }
});

export const { setRequestsData, setRequestData, setIsAllowedExpand } = requestsSlice.actions;

export const getRequests = (state: RootState) => state.requests.requests;
export const getRequest = (state: RootState) => state.requests.request;
export const getIsAllowedExpand = (state: RootState) => state.requests.isAllowedExpand;

export default requestsSlice.reducer;