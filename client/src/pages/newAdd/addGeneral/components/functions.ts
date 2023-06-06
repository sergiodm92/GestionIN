import { createToast } from "../../../../components/Notifications/Notifications";
import { generateRandomID } from "../../../../components/functions";
import { postAddGeneralApi } from "../../../../services/addGeneralApi";
import { AddGeneral } from "../../../../types/addsInterfaces";
import { DateType } from "../../../../types/interfaces";

export const handleAddChange = (e: any, add: AddGeneral, setAdd: any)=>{
    e.preventDefault();
    setAdd({
      ...add,
      [e.target.name]: e.target.value.trim(),
    });
}

export const handleDateChange = (e: any, date: DateType, setDate: any) => {
    e.preventDefault();
    setDate({
      ...date,
      [e.target.name]: e.target.value.trim(),
    });
  };

  export const addGralHandleSubmit = async (e:any, date: DateType, add: AddGeneral)=>{
    e.preventDefault();

    add.id = generateRandomID() //add id

    const dateString = `${date.year}-${date.month}-${date.day}T${date.time}:00`; //add.date
    const milliseconds = new Date(dateString).getTime();
    add.date = milliseconds

    //send data
    try {
        const response = await postAddGeneralApi(add);
        if (response.data.status === "ok") {
        createToast("success","Ingreso guardado con éxito");
        (document.getElementById("place") as HTMLSelectElement).selectedIndex = 0;
        (document.getElementById("amount") as HTMLInputElement).value = "0";
        } else {
        createToast("error","Verifique que los datos ingresados sean correctos");
        }
    } catch (error) {
        createToast("warning","ocurrio un error, vuelva a intentar");
        console.error(error);
    }
}