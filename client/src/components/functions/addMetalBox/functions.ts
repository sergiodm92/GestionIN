import { createToast } from "../../Notifications/Notifications";
import { generateRandomID } from "../../functions";
import { postAddMetalBoxApi } from "../../../services/addMetalBoxApi";
import { AddMetalBox } from "../../../types/addsInterfaces";

export const handleAddChange = (e: any, add: AddMetalBox, setAdd: any)=>{
    e.preventDefault();
    setAdd({
      ...add,
      [e.target.name]: e.target.value.trim(),
    });
}

  export const addMetalBoxHandleSubmit = async (e:any, date: string, place:string, size:string, add: AddMetalBox)=>{
    e.preventDefault();

    add.id = generateRandomID() //add id

    const dateString = `${date}T00:00`; //add.date
    const milliseconds = new Date(dateString).getTime();
    add.date = milliseconds

    add.place=place
    add.size=size

    add.supplier = add.supplier.trim()
    add.responsible = add.responsible.trim()

    //send data
    try {
        const response = await postAddMetalBoxApi(add);
        if (response.data.status === "ok") {
        createToast("success","Ingreso guardado con éxito");
        (document.getElementById("place") as HTMLSelectElement).selectedIndex = 0;
        (document.getElementById("size") as HTMLSelectElement).selectedIndex = 0;
        (document.getElementById("units") as HTMLInputElement).value = "0";
        } else {
        createToast("error","Verifique que los datos ingresados sean correctos");
        }
    } catch (error) {
        createToast("warning","ocurrio un error, vuelva a intentar");
        console.error(error);
    }
}