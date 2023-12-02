import { PayloadAction, createSlice } from "@reduxjs/toolkit";
import type { RootState } from "../store";
import { CoffinPropertyState, Property } from "../../types/coffinProperty";

const initialState: CoffinPropertyState = {
  types: [],
  sizes: [],
  colors: [],
  isAllowedExpand: true,
};

export const propertySlice = createSlice({
  name: "property",
  initialState,
  reducers: {
    setTypesData: (state, action: PayloadAction<Array<Property>>) => {
      state.types = action.payload;
    },
    setSizesData: (state, action: PayloadAction<Array<Property>>) => {
      state.sizes = action.payload;
    },
    setColorsData: (state, action: PayloadAction<Array<Property>>) => {
      state.colors = action.payload;
    },
    setIsAllowedExpand: (state, action: PayloadAction<boolean>) => {
      state.isAllowedExpand = action.payload;
    },
  },
});

export const { setTypesData, setSizesData, setColorsData, setIsAllowedExpand } =
  propertySlice.actions;

export const getTypes = (state: RootState) => state.properties.types;
export const getSizes = (state: RootState) => state.properties.sizes;
export const getColors = (state: RootState) => state.properties.colors;
export const getIsAllowedExpand = (state: RootState) =>
  state.suppliers.isAllowedExpand;

export default propertySlice.reducer;
