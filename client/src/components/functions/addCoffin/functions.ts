import { AddCoffin } from "../../../types/addsInterfaces";
import { Coffin, Double, Mbox } from "../../../types/interfaces";
import { createToast, questionAlert } from "../../Notifications/Notifications";
import { deleteAddCoffinApi, postAddCoffinApi } from "../../../services/addCoffinApi";
import { generateRandomID } from "../../functions";
import { Place } from "../../../types/place";
import { validateAddCoffin, validateCoffin, validateMetalBox } from "../../Validations/addCoffin";
import { addCoffinInicialState, initialCoffin, initialMetalBox } from "../../initialState/addCoffin/initialStates";
import { deleteAddProductsApi } from "../../../services/addProductsApi";

export const handleAddChange = (e: any, add: AddCoffin, setAdd: any) => {
  e.preventDefault();
  setAdd({
    ...add,
    [e.target.name]: e.target.value.trim(),
  });
}
export const handlePlace = (e: any, add: AddCoffin, setAdd: any) => {
  e.preventDefault();
  setAdd({
    ...add,
    place: e.target.value,
  });
};

//COFFIN ---------------------------------

export const handleCoffinChange = (e: any, coffin: Coffin, setCoffin: any) => {
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

export const switchMetalBox = (switchMB: boolean, setSwitchMB: any, coffin: Coffin) => {
  if (switchMB == false) {
    setSwitchMB(true)
    coffin.mbox = true
  }
  else if (switchMB == true) {
    setSwitchMB(false);
    coffin.mbox = false

  }
}

export const coffinGroupHandleSubmit = async (e: any, coffin: Coffin, add: AddCoffin, setCoffin: any, types: Double[], sizes: Double[], colors: Double[], places: Double[], setIsLoading: React.Dispatch<React.SetStateAction<boolean>>, isOn: boolean, setIsOn: any) => {
  e.preventDefault();
  setIsLoading(true)
  const typeId = types.find((type) => type.name == coffin.type)?.initials
  const sizeId = sizes.find((size) => size.name == coffin.size)?.initials
  const colorId = colors.find((color) => color.name == coffin.color)?.initials
  const placeId = places.find((place) => place.name == add.place)?.initials
  const mbId = isOn ? "TR" : "FS"
  coffin.id = (placeId ? placeId : "") + typeId + sizeId + colorId + mbId
  coffin.mbox = isOn
  try {
    if (validateCoffin(coffin)) {
      add.coffins.push(coffin)
    }
  } catch (error) {
    createToast("warning", "ocurrio un error, vuelva a intentar");
    console.error(error);
  }
  setCoffin(initialCoffin)
  const selectElement = document.getElementById("type") as HTMLSelectElement;
  selectElement.selectedIndex = 0;
  const selectElement2 = document.getElementById("size") as HTMLSelectElement;
  selectElement2.selectedIndex = 0;
  const selectElement3 = document.getElementById("color") as HTMLSelectElement;
  selectElement3.selectedIndex = 0;
  setIsOn(false)
  setIsLoading(false)
}

export const addHandleSubmit = async (e: any, date: string, add: AddCoffin, setAdd:any, setIsLoading: React.Dispatch<React.SetStateAction<boolean>>,setCleanForm:any) => {
  e.preventDefault();

  setIsLoading(true)

  add.id = "add_" + generateRandomID() //add id

  const dateString = `${date}T00:00`; //add.date
  const milliseconds = new Date(dateString).getTime();
  add.date = milliseconds

  add.responsible = add.responsible.trim()
  add.status = "pending"

  //send data
  try {
    if (validateAddCoffin(add)) {
      const response = await postAddCoffinApi(add);
      if (response.data.status === "ok") {
        createToast("success", "Deposito guardado con éxito");
        setAdd(addCoffinInicialState)
        add.coffins = []
        const selectElement4 = document.getElementById("place1") as HTMLSelectElement;
        selectElement4.selectedIndex = 0;
        setCleanForm(true)
      } else {
        createToast("error", "Verifique que los datos ingresados sean correctos");
      }
    }
  } catch (error) {
    createToast("warning", "ocurrio un error, vuelva a intentar");
    console.error(error);
  }
  setTimeout(() => {
    setIsLoading(false)
  }, 5000)
}

//-----------------METAL BOX----------------------------------------------------------
export const handleMboxSize = (e: any, mbox: Mbox, setMbox: any) => {
  e.preventDefault();
  setMbox({
    ...mbox,
    size: e.target.value,
  });
};
export const handleMboxChange = (e: any, mbox: Mbox, setMbox: any) => {
  e.preventDefault();
  setMbox({
    ...mbox,
    [e.target.name]: e.target.value.trim(),
  });
}
export const mboxGroupHandleSubmit = async (e: any, mbox: Mbox, add: AddCoffin, setMbox: any, setIsLoading: React.Dispatch<React.SetStateAction<boolean>>) => {
  e.preventDefault();
  setIsLoading(true)
  try {
    if (validateMetalBox(mbox)) {
      add.metal_box.push(mbox)
    }
  } catch (error) {
    createToast("warning", "ocurrio un error, vuelva a intentar");
    console.error(error);
  }
  setMbox(initialMetalBox)
  const selectElement = document.getElementById("mbsize") as HTMLSelectElement;
  selectElement.selectedIndex = 0;
  setIsLoading(false)
}
//------------------------------------------------------------------------------------

//------------------HANDLE DELETE----------------

const alertDeleteAddCoffin = async (id: string, router: any) => {
  const response = await deleteAddCoffinApi(id);
  if (response.data) {
    createToast("success", "Se elimino correctamente");
    router.push('/adds/coffin')
  } else {
    createToast("warning", "No se pudo eliminar, intentente nuevamente");
  }
}

export const handleDeleteAddCoffin = (id: string, router: any) => {
  questionAlert(
    "Eliminar Ingreso",
    "¿Esta seguro que desea eliminar el ingreso?",
    () => alertDeleteAddCoffin(id, router),
    "No se elimino el ingreso"
  )
}

const alertDeleteAddProducts = async (id: string, id_doc: string, router: any) => {
  const response = await deleteAddProductsApi(id, id_doc);
  if (response.data) {
    createToast("success", "Se elimino correctamente");
    router.push('/adds/general')
  } else {
    createToast("warning", "No se pudo eliminar, intentente nuevamente");
  }
}

export const handleDeleteAddProducts = (id: string, id_doc: string, router: any) => {
  questionAlert(
    "Eliminar Ingreso",
    "¿Esta seguro que desea eliminar el ingreso?",
    () => alertDeleteAddProducts(id, id_doc, router),
    "No se elimino el ingreso"
  )
}