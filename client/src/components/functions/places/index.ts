import { createToast } from "../../../components/Notifications/Notifications";
import { getAllPlacesApi, postPlaceApi } from "../../../services/placesApi";
import { setplaceData } from "../../../store/Slices/place";
import { Place } from "../../../types/place";

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

export const handleSubmit = async (e: any, places: Place[] , place: Place, setIsLoading: any) => {
  e.preventDefault();
  setIsLoading(true)
  const initialsRegex = /^[A-Za-z]+$/;
  if (!place.name) {
    createToast("warning", "Debe ingresar un nombre");
  } else if (!initialsRegex.test(place.initials)) {
    createToast("warning", "Las iniciales solo pueden contener letras");
  } else if (!place.initials) {
    createToast("warning", "Debe ingresar las iniciales");
  }else if (place.initials.length !== 2) {
    createToast("warning", "Debe ingresar dos iniciales");
  } else if (
    places.find((p) => p.name.toLowerCase() === place.name.toLowerCase())
  ) {
    createToast(
      "warning",
      "El nombre ingresado ya existe. Por favor ingrese otro nombre"
    );
  } else if (
    places.find(
      (p) => p.initials === place.initials
    )
  ) {
    createToast(
      "warning",
      "Las iniciales ingresadas ya existe. Por favor ingrese otras iniciales"
    );
  } else {
    place.name = capitalizeString(place.name).trim()
    place.initials = place.initials.toUpperCase().trim()
    try {
      const response = await postPlaceApi(place);
      if (response?.data.status === "ok") {
        createToast("success", "Depósito creado con éxito");
      } else {
        createToast(
          "error",
          "Verifique que los datos ingresados sean correctos"
        );
      }
    } catch (err) {
      createToast("warning", "ocurrio un error, vuelva a intentar");
      console.log(err);
    }
  }
  setIsLoading(false)
};