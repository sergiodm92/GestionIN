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

export const capitalizeString = (str: string) => {
  str = str.toLowerCase();
  var words = str.split(" ");
  for (var i = 0; i < words.length; i++) {
    var firstLetter = words[i].charAt(0).toUpperCase();
    var restOfWord = words[i].slice(1);
    words[i] = firstLetter + restOfWord;
  }
  var capitalizedString = words.join(" ");
  return capitalizedString;
};