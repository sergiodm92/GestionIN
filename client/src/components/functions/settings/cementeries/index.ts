import { getAllCementeriesApi, getCementeriesByPlaceApi, getCementeriesByTypeApi, postCementeryApi } from '../../../../services/cementeriesApi';
import { createToast } from "../../../Notifications/Notifications";
import { setCementeryData } from '../../../../store/Slices/cementery';
import { Cementery } from '../../../../types/cementery';

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

export const handleSubmit = async (cementeries: Cementery[] , values: Cementery, setValues:any, setSubmitting: any, setIsLoading: any) => {
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
        setValues({
          name:'',
          place:'',
          type:''
        })
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