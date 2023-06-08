import { getAllCoffinStockApi, getCoffinStockByPlaceApi } from "../../../services/coffinStockApi";
import { setStockData } from "../../../store/Slices/coffinStockSlice";

export const getCoffinStockByPlace = async (dispatch: any, place: string)=>{
  try{
      const stock = await getCoffinStockByPlaceApi(place)
      dispatch(setStockData(stock.data))
  }
  catch(err){
      console.log(err)
  }
}
export const getAllCoffinStock = async (dispatch: any)=>{
  try{
      const stock = await getAllCoffinStockApi()
      dispatch(setStockData(stock.data))
  }
  catch(err){
      console.log(err)
  }
}