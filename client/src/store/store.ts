import { configureStore } from '@reduxjs/toolkit'
import { userSlice } from './Slices/userSlice'
import { addsCoffinSlice } from './Slices/addsCoffinSlice'
import {requestsSlice} from './Slices/requestsSlice'
import {coffinStockSlice} from './Slices/coffinStockSlice'
import {metalBoxStockSlice} from './Slices/metalBoxStockSlice'
import {deceasedsSlice} from './Slices/deceasedSlice'
import { placeSlice } from './Slices/place'
import {productsStockSlice} from './Slices/productsStockSlice'
import {addsMetalBoxSlice} from './Slices/addsMetalBoxSlice'
import {addsProductsSlice} from './Slices/addsProductsSlice'
import { cementerySlice } from './Slices/cementery'
import { productsSlice } from './Slices/products'
import { companySlice } from './Slices/companies'
import { supplierSlice } from './Slices/suppliers'
import { propertySlice } from './Slices/coffinProperty'
import {particularRequestsSlice} from './Slices/particularRequestsSlice'
import { coffinTransferSlice } from './Slices/transfersSlice'


export const store = configureStore({
  reducer: {
      user: userSlice.reducer,
      addsCoffin: addsCoffinSlice.reducer,
      addsMetalBox: addsMetalBoxSlice.reducer,
      addsProducts: addsProductsSlice.reducer,
      requests: requestsSlice.reducer,
      particularRequests: particularRequestsSlice.reducer,
      deceaseds: deceasedsSlice.reducer,
      coffinStock: coffinStockSlice.reducer,
      metalBoxStock: metalBoxStockSlice.reducer,
      productsStock: productsStockSlice.reducer,
      place: placeSlice.reducer,
      products: productsSlice.reducer,
      cementery: cementerySlice.reducer,
      companies: companySlice.reducer,
      suppliers: supplierSlice.reducer,
      properties: propertySlice.reducer,
      coffinTransfers: coffinTransferSlice.reducer,
  }
})

export type RootState = ReturnType<typeof store.getState>
export type AppDispatch = typeof store.dispatch