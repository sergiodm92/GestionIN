import { AddCoffin } from "../../../types/addsInterfaces";
import { Coffin } from "../../../types/interfaces";
import { createToast } from "../../Notifications/Notifications";
import { deleteAddCoffinApi, postAddCoffinApi } from "../../../services/addCoffinApi";
import { generateRandomID } from "../../functions";
import { Place } from "../../../types/place";
import Swal from "sweetalert2";

export const handleAddChange = (e: any, add: AddCoffin, setAdd: any)=>{
    e.preventDefault();
    setAdd({
      ...add,
      [e.target.name]: e.target.value.trim(),
    });
}

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

export const addHandleSubmit = async (e:any, coffin: Coffin, isOn: boolean, date: string, add: AddCoffin, places: Place[])=>{
    e.preventDefault();

    add.id = generateRandomID() //add id

    const dateString = `${date}T00:00`; //add.date
    const milliseconds = new Date(dateString).getTime();
    add.date = milliseconds

    var MB = ""  //add.id_coffin
    if(isOn){
      MB = "TR"
    }
    else{
      MB = "FS"
    }
    var id = `${coffin.place}${coffin.type}${coffin.size}${coffin.color}${MB}`
    add.id_coffin = id

    let currentPlace = places.find(p=>p.initials==coffin.place) //add.place
    if(currentPlace) add.place = currentPlace.name

    add.supplier = add.supplier.trim()
    add.responsible = add.responsible.trim()

    //send data
    try {
        const response = await postAddCoffinApi(add);
        if (response.data.status === "ok") {
        createToast("success","Deposito guardado con éxito");
        (document.getElementById("type") as HTMLSelectElement).selectedIndex = 0;
        (document.getElementById("size") as HTMLSelectElement).selectedIndex = 0;
        (document.getElementById("color") as HTMLSelectElement).selectedIndex = 0;
        (document.getElementById("units") as HTMLInputElement).value = "0";
        } else {
        createToast("error","Verifique que los datos ingresados sean correctos");
        }
    } catch (error) {
        createToast("warning","ocurrio un error, vuelva a intentar");
        console.error(error);
    }
}

//------------------HANDLE DELETE----------------

export const handleDeleteAddCoffin = (id:string, router: any)=>{
  Swal.fire({
      title: "Eliminar Ingreso",
      text: "¿Esta seguro que desea eliminar el ingreso?",
      icon: "warning",
      showCancelButton: true,
      confirmButtonText: "Si",
      cancelButtonText: "Cancelar",
      confirmButtonColor: "#43815A",
      cancelButtonColor: "#b32020",
    }).then(async (result) => {
      if (result.isConfirmed) {
        try {
          const response = await deleteAddCoffinApi(id);
          console.log(response)
          if (response.data) {
            createToast("success","Se elimino correctamente");
            router.push('/adds')
          } else {
          createToast("warning","No se pudo eliminar, intentente nuevamente");
          }
      } catch (error) {
          createToast("warning","ocurrio un error, vuelva a intentar");
          console.error(error);
      }
          
      } else if (
        /* Read more about handling dismissals below */
        result.dismiss === Swal.DismissReason.cancel
      ) {
          createToast("warning","No se elimino el ingreso");
      }
    });
  }
