import { configureStore } from '@reduxjs/toolkit'
import { userSlice } from './Slices/userSlice'
import { addsCoffinSlice } from './Slices/addsCoffinSlice'
import {requestsSlice} from './Slices/requestsSlice'
import {coffinStockSlice} from './Slices/coffinStockSlice'
import {deceasedsSlice} from './Slices/deceasedSlice'
import { placeSlice } from './Slices/place'
// import {addsMetalBoxSlice} from './Slices/addsMetalBoxSlice'
// import {addsGeneralSlice} from './Slices/addsGeneralSlice'


export const store = configureStore({
  reducer: {
      user: userSlice.reducer,
      addsCoffin: addsCoffinSlice.reducer,
      // addsMetalBox: addsMetalBoxSlice.reducer,
      // addsGeneral: addsGeneralSlice.reducer,
      requests: requestsSlice.reducer,
      deceaseds: deceasedsSlice.reducer,
      coffinStock: coffinStockSlice.reducer,
      // metalBoxStock: coffinStockSlice.reducer,
      // generalStock: coffinStockSlice.reducer,
      place: placeSlice.reducer
  }
})

export type RootState = ReturnType<typeof store.getState>
export type AppDispatch = typeof store.dispatch