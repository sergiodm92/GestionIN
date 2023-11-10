import { PayloadAction, createSlice } from '@reduxjs/toolkit';
import type { RootState } from '../store';
import { PostRequest, RequestState, Request } from '../../types/requestsInterfaces';


const initialState: RequestState = {
	requests: [],
	request: {
		id_doc: "",
		request: {
			id: "",
			id_deceased: "",
			date: 0,
			place: "",
			funeral: "",
			id_add: "",
			id_coffin_group: "",
			id_add_metal_box: "",
			id_metal_box_group: "",
			holder_name: "",
			holder_relationship: "",
			policy: "",
			certificate_number: 0,
			way_to_pay: "",
			agreement: "",
			additional: "",
			wreath: false,
			present: "",
			products: [],
			burial_place: "",
			burial_time: "",
			cladding: "",
			service_improvement: "",
		},
		deceased: {
			id_doc:"",
			name: "",
			dod: 0,
			tombstone: false,
			leyend: "",
			id: "",
			news_paper: "",
			news_paper_name: "",
			pod: "",
			dni: "",
			id_request: "",
			dob: 0,
			cementery: "",
			cementery_type: "",
			sector: "",
			parcel: "",
			level: 0,
			first_level_name: "",
			second_level_name: "",
			religion_symbol: ""
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