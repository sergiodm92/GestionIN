import { PayloadAction, createSlice } from '@reduxjs/toolkit';
import type { RootState } from '../store';
import { Place, PlaceState } from '../../types/place';

const initialState: PlaceState = {
    place: [],
    isAllowedExpand: true
}

export const placeSlice = createSlice({
  name: 'place',
  initialState,
  reducers: {
    setplaceData: (state, action: PayloadAction<Array<Place>>) => {
      state.place = action.payload;
    },
    setIsAllowedExpand: (state, action: PayloadAction<boolean>) => {
      state.isAllowedExpand = action.payload;
    }
  }
});

export const { setplaceData, setIsAllowedExpand } = placeSlice.actions;

export const getplace = (state: RootState) => state.place.place;
export const getIsAllowedExpand = (state: RootState) => state.place.isAllowedExpand;

export default placeSlice.reducer;