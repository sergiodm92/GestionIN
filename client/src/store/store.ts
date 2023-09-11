import { configureStore } from '@reduxjs/toolkit'
import { userSlice } from './Slices/userSlice'
import { addsCoffinSlice } from './Slices/addsCoffinSlice'
import {requestsSlice} from './Slices/requestsSlice'
import {coffinStockSlice} from './Slices/coffinStockSlice'
import {metalBoxStockSlice} from './Slices/metalBoxStockSlice'
import {deceasedsSlice} from './Slices/deceasedSlice'
import { placeSlice } from './Slices/place'
import {generalStockSlice} from './Slices/generalStockSlice'
import {addsMetalBoxSlice} from './Slices/addsMetalBoxSlice'
import {addsGeneralSlice} from './Slices/addsGeneralSlice'
import { cementerySlice } from './Slices/cementery'


export const store = configureStore({
  reducer: {
      user: userSlice.reducer,
      addsCoffin: addsCoffinSlice.reducer,
      addsMetalBox: addsMetalBoxSlice.reducer,
      addsGeneral: addsGeneralSlice.reducer,
      requests: requestsSlice.reducer,
      deceaseds: deceasedsSlice.reducer,
      coffinStock: coffinStockSlice.reducer,
      metalBoxStock: metalBoxStockSlice.reducer,
      generalStock: generalStockSlice.reducer,
      place: placeSlice.reducer,
      cementery: cementerySlice.reducer
  }
})

export type RootState = ReturnType<typeof store.getState>
export type AppDispatch = typeof store.dispatch