import { getAllProductsApi, postProductsApi } from "../../../../services/productsApi"
import { setProductsData } from "../../../../store/Slices/products"
import { Product, Products } from "../../../../types/addsInterfaces"
import { createToast } from "../../../Notifications/Notifications"
import { generateRandomID } from "../../../functions"
import { capitalizeString } from "../cementeries"

export const getAllProducts = async (dispatch: any)=>{
    try{
        const place = await getAllProductsApi()
        dispatch(setProductsData(place.data))
    }
    catch(err){
        console.log(err)
    }
  }
  
  export const handleSubmit = async ( products: Products[] , values: Product, setValues:any, setSubmitting:any, setIsLoading: any) => {
    setIsLoading(true)
    setSubmitting(true)
    if (
      products.some((p) => p.name.toLowerCase() === values.name.toLowerCase())
    ) {
      createToast(
        "warning",
        "El producto ingresado ya existe. Por favor ingrese otro nombre de producto"
      );
    } else {
      values.name = capitalizeString(values.name).trim()
      values.id = generateRandomID()
      try {
        const response = await postProductsApi(values);
        if (response?.data.status === "ok") {
          createToast("success", "Producto agregado con éxito");
          setValues({name: "", id: ""})
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
    setTimeout(()=>setIsLoading(false), 3000)
}