// import { PayloadAction, createSlice } from '@reduxjs/toolkit';
// import type { RootState } from '../store';
// import { GetMetalBoxStock, metalBoxStockState } from '../../types/stockInterfaces';

// const initialState: metalBoxStockState = {
//     metalBoxStock: [],
//     isAllowedExpand: true
// }

// export const metalBoxStockSlice = createSlice({
//   name: 'metal_box_stock',
//   initialState,
//   reducers: {
//     setStockData: (state, action: PayloadAction<Array<GetMetalBoxStock>>) => {
//       state.metalBoxStock = action.payload;
//     },
//     setIsAllowedExpand: (state, action: PayloadAction<boolean>) => {
//       state.isAllowedExpand = action.payload;
//     }
//   }
// });

// export const { setStockData, setIsAllowedExpand } = metalBoxStockSlice.actions;

// export const getmetalBoxStock = (state: RootState) => state.metalBoxStock.metalBoxStock;
// export const getIsAllowedExpand = (state: RootState) => state.metalBoxStock.isAllowedExpand;

// export default metalBoxStockSlice.reducer;