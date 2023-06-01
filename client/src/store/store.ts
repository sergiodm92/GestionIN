import { configureStore } from '@reduxjs/toolkit'
import { userSlice } from './Slices/userSlice'
import { addsSlice } from './Slices/addsSlice'
import {requestsSlice} from './Slices/requestsSlice'
import {stockSlice} from './Slices/stockSlice'
import {deceasedsSlice} from './Slices/deceasedSlice'
import { placeSlice } from './Slices/place'


export const store = configureStore({
  reducer: {
      user: userSlice.reducer,
      adds: addsSlice.reducer,
      requests: requestsSlice.reducer,
      deceaseds: deceasedsSlice.reducer,
      stock: stockSlice.reducer,
      place: placeSlice.reducer
  }
})

export type RootState = ReturnType<typeof store.getState>
export type AppDispatch = typeof store.dispatch