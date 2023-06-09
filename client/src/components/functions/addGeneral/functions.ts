import { createToast } from "../../Notifications/Notifications";
import { generateRandomID } from "../../functions";
import { postAddGeneralApi } from "../../../services/addGeneralApi";
import { AddGeneral } from "../../../types/addsInterfaces";
import { Place } from "../../../types/place";
import { validateAddGeneral } from "../../Validations/addGeneral";

export const handleAddChange = (e: any, add: AddGeneral, setAdd: any) => {
  e.preventDefault();
  setAdd({
    ...add,
    [e.target.name]: e.target.value,
  });
};

export const addGralHandleSubmit = async (e: any, date: string, place: string, places: Place[], add: AddGeneral, setIsLoading: React.Dispatch<React.SetStateAction<boolean>>) => {
  e.preventDefault();

  setIsLoading(true);

  add.id = place + add.product.trim().toLowerCase().replace(" ", "_"); //add id

  const dateString = `${date}T00:00`; //add.date
  const milliseconds = new Date(dateString).getTime();
  add.date = milliseconds;
  add.place = places.find(p => p.initials === place)?.name ?? "";

  add.product = add.product.toLowerCase().trim()
  add.supplier = add.supplier.trim()
  add.responsible = add.responsible.trim()

  //send data
  try {
    if(validateAddGeneral(add)){
      const response = await postAddGeneralApi(add);
      if (response && response.data.status == "ok") {
        createToast("success", "Ingreso guardado con éxito");
        (document.getElementById("amount") as HTMLInputElement).value = "0";
      } else {
        createToast("error", "Verifique que los datos ingresados sean correctos");
      }
    }
  } catch (error) {
    createToast("warning", "ocurrio un error, vuelva a intentar");
    console.error(error);
  }

  setIsLoading(false);

};
