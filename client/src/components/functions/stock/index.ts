import { getAllCoffinStockApi, getCoffinStockByPlaceApi } from "../../../services/coffinStockApi";
import { getAllMetalBoxStockApi, getMetalBoxStockByPlaceApi } from "../../../services/metalBoxStock";
import { getAllProductsStockApi, getProductsStockByPlaceApi } from "../../../services/productsStockApi";
import { setCoffinStockData } from "../../../store/Slices/coffinStockSlice";
import { setMetalBoxStockData } from "../../../store/Slices/metalBoxStockSlice";
import { setProductsStockData } from "../../../store/Slices/productsStockSlice";

export const getCoffinStockByPlace = async (dispatch: any, place: string)=>{
  try{
      const stock = await getCoffinStockByPlaceApi(place)
      dispatch(setCoffinStockData(stock.data))
  }
  catch(err){
      console.log(err)
  }
}
export const getAllCoffinStock = async (dispatch: any)=>{
  try{
      const stock = await getAllCoffinStockApi()
      dispatch(setCoffinStockData(stock.data))
  }
  catch(err){
      console.log(err)
  }
}

export const getMboxStockByPlace = async (dispatch: any, place: string)=>{
  try{
      const stock = await getMetalBoxStockByPlaceApi(place)
      dispatch(setMetalBoxStockData(stock.data))
  }
  catch(err){
      console.log(err)
  }
}
export const getAllMboxStock = async (dispatch: any)=>{
  try{
      const stock = await getAllMetalBoxStockApi()
      dispatch(setMetalBoxStockData(stock.data))
  }
  catch(err){
      console.log(err)
  }
}

export const getProductsStockByPlace = async (dispatch: any, place: string)=>{
  try{
      const stock = await getProductsStockByPlaceApi(place)
      dispatch(setProductsStockData(stock.data))
  }
  catch(err){
      console.log(err)
  }
}
export const getAllProductsStock = async (dispatch: any)=>{
  try{
      const stock = await getAllProductsStockApi()
      dispatch(setProductsStockData(stock.data))
  }
  catch(err){
      console.log(err)
  }
}
