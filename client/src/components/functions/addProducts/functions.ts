import { createToast } from "../../Notifications/Notifications";
import { generateRandomID } from "../../functions";
import { postAddProductsApi } from "../../../services/addProductsApi";
import { AddProducts, Product, Products } from "../../../types/addsInterfaces";
import { Place } from "../../../types/place";
import { validateAddGeneral } from "../../Validations/addGeneral";
import { validateProduct } from "../../Validations/addCoffin";
import { addGeneralInicialState, productInicialState } from "../../initialState/addGeneral/initialStates";

export const handleAddChange = (e: any, add: AddProducts, setAdd: any) => {
  e.preventDefault();
  setAdd({
    ...add,
    [e.target.name]: e.target.value,
  });
};
export const handleProductChange = (e: any, product: Product, setProduct: any) => {
  e.preventDefault();
  setProduct({
    ...product,
    [e.target.name]: e.target.value,
  });
};

export const productsGroupHandleSubmit = async (e: any, product: Products, products: Products[], add: AddProducts, setProduct: any, setIsLoading: React.Dispatch<React.SetStateAction<boolean>>) => {
  e.preventDefault();
  setIsLoading(true);
  const id = products.find(p => p.name === product.name)?.id
  product.id = id? id : ""
  try {
    if (validateProduct(product)) {
      add.products.push(product)
    }
  } catch (error) {
    createToast("warning", "ocurrio un error, vuelva a intentar");
    console.error(error);
  }
  setProduct(productInicialState)
  const selectElement = document.getElementById("product") as HTMLSelectElement;
  selectElement.selectedIndex = 0;
  setIsLoading(false)
}

export const addProdHandleSubmit = async (e: any, date: string, place: string, places: Place[], add: AddProducts, setAdd: any, setIsLoading: React.Dispatch<React.SetStateAction<boolean>>) => {
  e.preventDefault();
  setIsLoading(true);

  add.id = generateRandomID(); //add id

  const dateString = `${date}T00:00`; //add.date
  const milliseconds = new Date(dateString).getTime();
  add.date = milliseconds;
  add.place = places.find(p => p.initials === place)?.name ?? "";
  add.responsible = add.responsible.trim()
  add.status = "pending"
  //send data
  try {
    if (validateAddGeneral(add)) {
      const response = await postAddProductsApi(add);
      if (response.status==200) {
        createToast("success", "Ingreso guardado con éxito");
        setAdd({
          id: "",
          products: [],
          date: 0,
          responsible: "",
          place: "",
          status: ""
        })
        const selectElement = document.getElementById("place") as HTMLSelectElement;
        selectElement.selectedIndex = 0;
        
      } else {
        createToast("error", "Verifique que los datos ingresados sean correctos");
      }
    }
  } catch (error) {
    createToast("warning", "Ocurrio un error inesperado, vuelva a intentar");
    console.error(error);
  }

  setIsLoading(false);

};
