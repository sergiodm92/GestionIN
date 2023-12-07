import { PayloadAction, createSlice } from "@reduxjs/toolkit";
import type { RootState } from "../store";
import {
  ParticularRequestState,
  RequestService,
  PostParticularRequest,
} from "../../types/requestsInterfaces";

const initialState: ParticularRequestState = {
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
      additional: "",
      wreath: false,
      present: "",
      products: [],
      burial_place: "",
      burial_time: "",
      cladding: "",
      service_improvement: "",
      company: "",
    },
    deceased: {
      id_doc: "",
      name: "",
      dod: 0,
      tombstone: "pending",
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
      religion_symbol: "",
    },
  },
  isAllowedExpand: true,
};

export const particularRequestsSlice = createSlice({
  name: "particularRequests",
  initialState,
  reducers: {
    setParticularRequestsData: (state, action: PayloadAction<Array<RequestService>>) => {
      state.requests = action.payload;
    },
    setParticularRequestData: (state, action: PayloadAction<PostParticularRequest>) => {
      state.request = action.payload;
    },
    setIsAllowedExpand: (state, action: PayloadAction<boolean>) => {
      state.isAllowedExpand = action.payload;
    },
  },
});

export const { setParticularRequestsData, setParticularRequestData, setIsAllowedExpand } =
particularRequestsSlice.actions;

export const getParticularRequests = (state: RootState) => state.particularRequests.requests;
export const getParticularRequest = (state: RootState) => state.particularRequests.request;
export const getIsAllowedExpand = (state: RootState) => state.particularRequests.isAllowedExpand;

export default particularRequestsSlice.reducer;
