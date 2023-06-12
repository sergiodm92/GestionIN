import { createToast } from "../../Notifications/Notifications";
import { generateRandomID } from "../../functions";
import { postAddGeneralApi } from "../../../services/addGeneralApi";
import { AddGeneral } from "../../../types/addsInterfaces";

export const handleAddChange = (e: any, add: AddGeneral, setAdd: any) => {
  e.preventDefault();
  setAdd({
    ...add,
    [e.target.name]: e.target.value.trim(),
  });
};

export const addGralHandleSubmit = async (e: any, date: string, place: string, add: AddGeneral) => {
  e.preventDefault();

  add.id = generateRandomID(); //add id

  const dateString = `${date}T00:00`; //add.date
  const milliseconds = new Date(dateString).getTime();
  add.date = milliseconds;
  add.place = place

  add.product = add.product.trim()
  add.supplier = add.supplier.trim()
  add.responsible = add.responsible.trim()

  //send data
  try {
    const response = await postAddGeneralApi(add);
    console.log(response)
    if (response && response.data.status == "ok") {
      createToast("success", "Ingreso guardado con éxito");
      (document.getElementById("amount") as HTMLInputElement).value = "0";
    } else {
      createToast("error", "Verifique que los datos ingresados sean correctos");
    }
  } catch (error) {
    createToast("warning", "ocurrio un error, vuelva a intentar");
    console.error(error);
  }
};
