import { setProductsData } from "../../../store/Slices/products";
import { getAllProductsApi, postProductsApi } from "../../../services/productsApi";
import { createToast } from "../../Notifications/Notifications";
import { capitalizeString } from "../places";
import { Product, Products } from "../../../types/addsInterfaces";
import { generateRandomID } from "../../functions";

export const getAllProducts = async (dispatch: any)=>{
  try{
      const place = await getAllProductsApi()
      dispatch(setProductsData(place.data))
  }
  catch(err){
      console.log(err)
  }
}

export const handleSubmit = async (e: any, products: Products[] , product: Product, setIsLoading: any) => {
  e.preventDefault();
  setIsLoading(true)
  if (!product.name) {
    createToast("warning", "Debe ingresar un nombre de producto");
  } else if (
    products.some((p) => p.name.toLowerCase() === product.name.toLowerCase())
  ) {
    createToast(
      "warning",
      "El producto ingresado ya existe. Por favor ingrese otro nombre de producto"
    );
  } else {
    product.name = capitalizeString(product.name).trim()
    product.id = generateRandomID()
    try {
      const response = await postProductsApi(product);
      if (response?.data.status === "ok") {
        createToast("success", "Producto agregado con éxito");
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
  setIsLoading(false)}