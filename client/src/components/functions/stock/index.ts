import { getAllCoffinStockApi, getCoffinStockByPlaceApi } from "../../../services/coffinStockApi";
import { getAllGeneralStockApi, getGeneralStockByPlaceApi } from "../../../services/generalStockApi";
import { getAllMetalBoxStockApi, getMetalBoxStockByPlaceApi } from "../../../services/metalBoxStock";
import { setCoffinStockData } from "../../../store/Slices/coffinStockSlice";
import { setGeneralStockData } from "../../../store/Slices/generalStockSlice";
import { setMetalBoxStockData } from "../../../store/Slices/metalBoxStockSlice";

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

export const getMetalBoxStockByPlace = async (dispatch: any, place: string)=>{
  try{
      const stock = await getMetalBoxStockByPlaceApi(place)
      dispatch(setMetalBoxStockData(stock.data))
  }
  catch(err){
      console.log(err)
  }
}
export const getAllMetalBoxStock = async (dispatch: any)=>{
  try{
      const stock = await getAllMetalBoxStockApi()
      dispatch(setMetalBoxStockData(stock.data))
  }
  catch(err){
      console.log(err)
  }
}

export const getGeneralStockByPlace = async (dispatch: any, place: string)=>{
  try{
      const stock = await getGeneralStockByPlaceApi(place)
      dispatch(setGeneralStockData(stock.data))
  }
  catch(err){
      console.log(err)
  }
}
export const getAllGeneralStock = async (dispatch: any)=>{
  try{
      const stock = await getAllGeneralStockApi()
      dispatch(setGeneralStockData(stock.data))
  }
  catch(err){
      console.log(err)
  }
}
