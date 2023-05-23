import { getStockByPlaceApi } from "../../../services/stockApi";
import { setStockData } from "../../../store/Slices/stockSlice";

export const getStockByPlace = async (dispatch: any, place: string)=>{
  try{
      const stock = await getStockByPlaceApi(place)
      dispatch(setStockData(stock.data))
  }
  catch(err){
      console.log(err)
  }
}