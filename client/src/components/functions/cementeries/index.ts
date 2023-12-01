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

export const handleSubmit = async (cementeries: Cementery[] , values: Cementery, setSubmitting: any, setIsLoading: any) => {
  setIsLoading(true)
  setSubmitting(true)
  if (
    cementeries.find((c) => c.name.toLowerCase() === values.name.toLowerCase())
  ) {
    createToast(
      "warning",
      "El nombre ingresado ya existe. Por favor ingrese otro nombre"
    );
  }  else {
    values.name = capitalizeString(values.name).trim()
    try {
      const response = await postCementeryApi(values);
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
  setSubmitting(false)
  setTimeout(() => {
    setIsLoading(false)
  }, 5000);
};