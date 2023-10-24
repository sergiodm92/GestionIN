import { AddCoffin } from "../../../types/addsInterfaces";
import { Coffin, Double } from "../../../types/interfaces";
import { createToast, questionAlert } from "../../Notifications/Notifications";
import { deleteAddCoffinApi, postAddCoffinApi } from "../../../services/addCoffinApi";
import { generateRandomID } from "../../functions";
import { Place } from "../../../types/place";
import { validateAddCoffin, validateCoffin } from "../../Validations/addCoffin";
import { deleteAddGeneralApi } from "../../../services/addGeneralApi";
import { deleteAddMetalBoxApi } from "../../../services/addMetalBoxApi";
import { addCoffinInicialState, initialCoffin } from "../../initialState/addCoffin/initialStates";

export const handleAddChange = (e: any, add: AddCoffin, setAdd: any)=>{
    e.preventDefault();
    setAdd({
      ...add,
      [e.target.name]: e.target.value.trim(),
    });
}
export const handlePlace = (e: any, add:AddCoffin , setAdd: any) => {
  e.preventDefault();
  setAdd({
    ...add,
    place: e.target.value,
  });
};

//COFFIN ---------------------------------

  export const handleCoffinChange = (e: any, coffin: Coffin, setCoffin: any)=>{
    e.preventDefault();
    setCoffin({
      ...coffin,
      [e.target.name]: e.target.value.trim(),
    });
}
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
      coffin.mbox=true
    }
    else if(switchMB==true){
      setSwitchMB(false);
      coffin.mbox=false

    }
}

export const coffinGroupHandleSubmit = async (e:any, coffin: Coffin, add: AddCoffin, setCoffin: any, types: Double[], sizes: Double[], colors: Double[], places: Double[], setIsLoading: React.Dispatch<React.SetStateAction<boolean>>, isOn:boolean)=>{
  e.preventDefault();
  setIsLoading(true)
  const typeId = types.find((type)=>type.name==coffin.type)?.initials
  const sizeId = sizes.find((size)=>size.name==coffin.size)?.initials
  const colorId = colors.find((color)=>color.name==coffin.color)?.initials
  const placeId = places.find((place)=>place.name==add.place)?.initials
  coffin.id =  placeId+typeId+sizeId+colorId+coffin.units.toString()
  coffin.mbox 
  
  try {
    if(validateCoffin(coffin)){
      add.coffins.push(coffin)
    }
} catch (error) {
    createToast("warning","ocurrio un error, vuelva a intentar");
    console.error(error);
}
setCoffin(initialCoffin)
setIsLoading(false)
}
//------------------------------------------------------------------------------------

export const addHandleSubmit = async (e:any, isOn: boolean, date: string, add: AddCoffin, places: Place[], setIsLoading: React.Dispatch<React.SetStateAction<boolean>>)=>{
    e.preventDefault();

    setIsLoading(true)

    add.id = generateRandomID() //add id

    const dateString = `${date}T00:00`; //add.date
    const milliseconds = new Date(dateString).getTime();
    add.date = milliseconds

    add.responsible = add.responsible.trim()

    //send data
    try {
        if(validateAddCoffin(add)){
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
        }
    } catch (error) {
        createToast("warning","ocurrio un error, vuelva a intentar");
        console.error(error);
    }
    setIsLoading(false)
}

//------------------HANDLE DELETE----------------

const alertDeleteAddCoffin = async (id: string, router: any)=>{
    const response = await deleteAddCoffinApi(id);
    if (response.data) {
      createToast("success","Se elimino correctamente");
      router.push('/adds/coffin')
    } else {
    createToast("warning","No se pudo eliminar, intentente nuevamente");
    }
}

export const handleDeleteAddCoffin = (id:string, router: any)=>{
  questionAlert(
    "Eliminar Ingreso",
    "¿Esta seguro que desea eliminar el ingreso?",
    ()=>alertDeleteAddCoffin(id, router),
    "No se elimino el ingreso"
  )
}

const alertDeleteAddGeneral = async (id: string, id_doc: string, router: any)=>{
    const response = await deleteAddGeneralApi(id, id_doc);
    if (response.data) {
      createToast("success","Se elimino correctamente");
      router.push('/adds/general')
    } else {
    createToast("warning","No se pudo eliminar, intentente nuevamente");
    }
}

  export const handleDeleteAddGeneral = (id:string, id_doc: string, router: any)=>{
    questionAlert(
      "Eliminar Ingreso",
      "¿Esta seguro que desea eliminar el ingreso?",
      ()=>alertDeleteAddGeneral(id, id_doc, router),
      "No se elimino el ingreso"
    )
  }

  const alertDeleteAddMB = async (id: string, id_doc:string, router: any) => {
    const response = await deleteAddMetalBoxApi(id, id_doc);
              if (response.data) {
                createToast("success","Se elimino correctamente");
                router.push('/adds/metal_box')
              } else {
              createToast("warning","No se pudo eliminar, intentente nuevamente");
              }
  }

    export const handleDeleteAddMetalBox = (id:string, id_doc: string, router: any)=>{
      questionAlert(
        "Eliminar Ingreso",
        "¿Esta seguro que desea eliminar el ingreso?",
        ()=>alertDeleteAddMB(id, id_doc, router),
        "No se elimino el ingreso"
      )
    }