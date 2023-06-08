import { CoffinInitials, DateType } from "../../../types/interfaces";
import { Deceased, Request } from "../../../types/requestsInterfaces";
import { createToast } from "../../Notifications/Notifications";
import { postRequestApi } from "../../../services/requestApi";
import { generateRandomID } from "../../functions";

export const handleDeceasedChange = (e: any, deceased: Deceased, setDeceased: any) => {
  e.preventDefault();
  setDeceased({
    ...deceased,
    [e.target.name]: e.target.value.trim(),
  });
};

export const handleRequestChange = (e: any, request: Request, setRequest: any) => {
  e.preventDefault();
  setRequest({
    ...request,
    [e.target.name]: e.target.value.trim(),
  });
};

export const handleDateChange = (e: any, date: DateType, setDate: any) => {
  e.preventDefault();
  setDate({
    ...date,
    [e.target.name]: e.target.value.trim(),
  });
};

export const handleBirthDateChange = (e: any, birthDate: DateType, setBirthDate: any) => {
  e.preventDefault();
  setBirthDate({
    ...birthDate,
    [e.target.name]: e.target.value.trim(),
  });
};

export const handleCurrentDateChange = (e: any, currentDate: DateType, setCurrentDate: any) => {
  e.preventDefault();
  setCurrentDate({
    ...currentDate,
    [e.target.name]: e.target.value.trim(),
  });
};

//---------------formRequest-----------------------

export const handleToggleSwitch = (isOn: boolean, setIsOn: any) => {
  setIsOn(!isOn);
};

//-------------------------------------------------

export const handleSubmit = async (e: any, deceased: Deceased, request: Request, date: DateType, birthDate: string, currentDate: string, coffin: CoffinInitials, isOn: boolean) => {
  e.preventDefault();
  
  deceased.id = generateRandomID() 
  request.id = generateRandomID() 
  deceased.id_request = request.id;
  request.id_deceased = deceased.id;

  const dateString = `${date.day}T${date.time}:00`;
  console.log(dateString)
  const milliseconds = new Date(dateString).getTime();
  deceased.dod = milliseconds
  

  const birthDateString = `${birthDate}T00:00`;
  const milliseconds2 = new Date(birthDateString).getTime();
  deceased.dob = milliseconds2

  const currentDateString = `${currentDate}T00:00`;
  const milliseconds3 = new Date(currentDateString).getTime();
  request.date = milliseconds3

  request.wreath=isOn

  request.id_coffin = `${coffin.place.initials}${coffin.type.initials}${coffin.size.initials}${coffin.color.initials}${coffin.metal_box.initials}`
  
  const json = {
    request: request,
    deceased: deceased,
  };
  try {
    const response = await postRequestApi(json);
    if (response?.data.status === "ok") {
      createToast("success","Solicitud creada con éxito");
    } else {
      createToast("error","Verifique que los datos ingresados sean correctos");
    }
  } catch (error) {
    createToast("warning","ocurrio un error, vuelva a intentar");
    console.error(error);
  }
};
