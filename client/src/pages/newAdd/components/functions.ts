import { Add } from "../../../types/addsInterfaces";
import { Coffin, DateType } from "../../../types/interfaces";
import { createToast } from "../../../components/Notifications/Notifications";
import { postAddApi } from "../../../services/addApi";
import { places } from "../../../components/arrays";
import { generateRandomID } from "../../../components/functions";

export const handleAddChange = (e: any, add: Add, setAdd: any)=>{
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

//COFFIN ---------------------------------
export const handleCoffinPlace = (e: any, coffin: Coffin, setCoffin: any) => {
    e.preventDefault();
    setCoffin({
      ...coffin,
      place: e.target.value,
    });
  };
  
  export const handleCoffinType = (e: any, coffin: Coffin, setCoffin: any) => {
    e.preventDefault();
    setCoffin({
      ...coffin,
      type: e.target.value,
    });
  };
  export const handleCoffinSize = (e: any, coffin: Coffin, setCoffin: any) => {
    e.preventDefault();
    setCoffin({
      ...coffin,
      size: e.target.value,
    });
  };
  export const handleCoffinColor = (e: any, coffin: Coffin, setCoffin: any) => {
    e.preventDefault();
    setCoffin({
      ...coffin,
      color: e.target.value,
    });
  };

  export const switchMetalBox = ( switchMB: boolean, setSwitchMB: any, coffin: Coffin)=>{
    if(switchMB==false){
      setSwitchMB(true)
      coffin.metal_box=true
    }
    else if(switchMB==true){
      setSwitchMB(false);
      coffin.metal_box=false

    }
}
//------------------------------------------------------------------------------------

export const addHandleSubmit = async (e:any, coffin: Coffin, date: DateType, add: Add, setAdd: any, setDate: any)=>{
    e.preventDefault();

    add.id = generateRandomID() //add id

    const dateString = `${date.year}-${date.month}-${date.day}T${date.time}:00`; //add.date
    const milliseconds = new Date(dateString).getTime();
    add.date = milliseconds

    var MB = ""  //add.id_coffin
    if(coffin.metal_box){
      MB = "TR"
    }
    else{
      MB = "FS"
    }
    var id = `${coffin.place}${coffin.type}${coffin.size}${coffin.color}${MB}`
    add.id_coffin = id

    let currentPlace = places.find(p=>p.initials==coffin.place) //add.place
    if(currentPlace) add.place = currentPlace.name

    //send data
    try {
        const response = await postAddApi(add);
        if (response.data.status === "ok") {
        createToast("success","Deposito guardado con éxito");
        (document.getElementById("type") as HTMLSelectElement).selectedIndex = 0;
        (document.getElementById("size") as HTMLSelectElement).selectedIndex = 0;
        (document.getElementById("color") as HTMLSelectElement).selectedIndex = 0;  
        (document.getElementById("metal_box") as HTMLInputElement).checked = false;
        (document.getElementById("units") as HTMLInputElement).value = "0";
        } else {
        createToast("error","Verifique que los datos ingresados sean correctos");
        }
    } catch (error) {
        createToast("warning","ocurrio un error, vuelva a intentar");
        console.error(error);
    }
}