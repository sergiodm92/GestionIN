import { getAllCementeriesApi, getCementeriesByPlaceApi, getCementeriesByTypeApi, postCementeryApi } from './../../../services/cementeriesApi';
import { createToast } from "../../../components/Notifications/Notifications";
import { setCementeryData } from '../../../store/Slices/cementery';
import { Cementery } from '../../../types/cementery';
import { capitalizeString } from '../places';

export const getAllCementeries = async (dispatch: any)=>{
  try{
      const cementery = await getAllCementeriesApi()
      dispatch(setCementeryData(cementery.data))
  }
  catch(err){
      console.log(err)
  }
}

export const getCementeriesByType = async (dispatch: any, type: string)=>{
  try{
      const cementery = await getCementeriesByTypeApi(type)
      dispatch(setCementeryData(cementery.data))
  }
  catch(err){
      console.log(err)
  }
}

export const getCementeriesByPlace = async (dispatch: any, place: string)=>{
  try{
      const cementery = await getCementeriesByPlaceApi(place)
      dispatch(setCementeryData(cementery.data))
  }
  catch(err){
      console.log(err)
  }
}

export const handleCementeryPlace = (e: any, cementery: Cementery, setCementery: any) => {
    e.preventDefault();
    setCementery({
      ...cementery,
      place: e.target.value,
    });
  };

  export const handleCementeryType = (e: any, cementery: Cementery, setCementery: any) => {
    e.preventDefault();
    setCementery({
      ...cementery,
      type: e.target.value,
    });
  };

export const handleSubmit = async (e: any, cementeries: Cementery[] , cementery: Cementery, setIsLoading: any) => {
  e.preventDefault();
  setIsLoading(true)
  if (!cementery.name) {
    createToast("warning", "Debe ingresar un nombre");
  } else if (!cementery.type) {
    createToast("warning", "Debe ingresar un tipo");
} else if (!cementery.place) {
    createToast("warning", "Debe ingresar un lugar");
  } else if (
    cementeries.find((c) => c.name.toLowerCase() === cementery.name.toLowerCase())
  ) {
    createToast(
      "warning",
      "El nombre ingresado ya existe. Por favor ingrese otro nombre"
    );
  }  else {
    cementery.name = capitalizeString(cementery.name).trim()
    try {
      const response = await postCementeryApi(cementery);
      if (response?.data.status === "ok") {
        createToast("success", "Cementerio agregado con éxito");
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