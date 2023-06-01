import { getAllPlacesApi } from "../../../services/placesApi";
import { setplaceData } from "../../../store/Slices/place";

export const getAllPlaces = async (dispatch: any)=>{
  try{
      const place = await getAllPlacesApi()
      dispatch(setplaceData(place.data))
  }
  catch(err){
      console.log(err)
  }
}