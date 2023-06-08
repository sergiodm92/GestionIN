import { PayloadAction, createSlice } from '@reduxjs/toolkit';
import type { RootState } from '../store';
import { Deceased, DeceasedState } from '../../types/requestsInterfaces';

const initialState: DeceasedState = {
    deceaseds: [],
    deceased: {
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
      cementery_type:""
    },
    isAllowedExpand: true
}

export const deceasedsSlice = createSlice({
  name: 'deceaseds',
  initialState,
  reducers: {
    setDeceasedsData: (state, action: PayloadAction<Array<Deceased>>) => {
      state.deceaseds = action.payload;
    },
    setDeceasedData: (state, action: PayloadAction<Deceased>) => {
      state.deceased = action.payload;
    },
    setIsAllowedExpand: (state, action: PayloadAction<boolean>) => {
      state.isAllowedExpand = action.payload;
    }
  }
});

export const { setDeceasedsData, setDeceasedData, setIsAllowedExpand } = deceasedsSlice.actions;

export const getDeceaseds = (state: RootState) => state.deceaseds.deceaseds;
export const getDeceased = (state: RootState) => state.deceaseds.deceased;
export const getIsAllowedExpand = (state: RootState) => state.deceaseds.isAllowedExpand;

export default deceasedsSlice.reducer;