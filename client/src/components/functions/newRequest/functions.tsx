import { CoffinInitials, DateType } from "../../../types/interfaces";
import { Deceased, Request } from "../../../types/requestsInterfaces";
import { createToast } from "../../Notifications/Notifications";
import { postRequestApi } from "../../../services/requestApi";
import { generateRandomID } from "../../functions";
import { validateRequest } from "../../Validations/request";
import { validateDeceased } from "../../Validations/deceased";
import { Cementery } from "../../../types/cementery";

export const handleDeceasedChange = (
  e: any,
  deceased: Deceased,
  setDeceased: any
) => {
  e.preventDefault();
  setDeceased({
    ...deceased,
    [e.target.name]: e.target.value,
  });
};

export const handleRequestChange = (
  e: React.ChangeEvent<HTMLInputElement>,
  request: Request,
  setRequest: any
) => {
  e.preventDefault();
  setRequest({
    ...request,
    [e.target.name]: e.target.value,
  });
};

export const handleDateChange = (e: React.ChangeEvent<HTMLInputElement>, date: DateType, setDate: any) => {
  e.preventDefault();
  setDate({
    ...date,
    [e.target.name]: e.target.value,
  });
};

export const cementerySelect = (e: React.ChangeEvent<HTMLSelectElement>, setDeceased: any, deceased: Deceased) => {
  e.preventDefault();
  setDeceased({
    ...deceased,
    cementery: e.target.value,
  });
};

export const cementeryTypeSelect = (e: React.ChangeEvent<HTMLSelectElement>, setDeceased: any, deceased: Deceased) => {
  e.preventDefault();
  setDeceased({
    ...deceased,
    cementery_type: e.target.value,
  });
};
export const levelSelect = (e: React.ChangeEvent<HTMLSelectElement>, setDeceased: any, deceased: Deceased) => {
  e.preventDefault();
  setDeceased({
    ...deceased,
    level: e.target.value,
  });
};

//---------------formRequest-----------------------

export const handleToggleSwitch = (isOn: boolean, setIsOn: any) => {
  setIsOn(!isOn);
};

//-------------------------------------------------

export const handleSubmit = async (
  e: React.FormEvent<HTMLFormElement>,
  deceased: Deceased,
  request: Request,
  date: DateType,
  birthDate: string,
  currentDate: string,
  coffin: CoffinInitials,
  isOn: boolean,
  setIsLoading: any
) => {
  e.preventDefault();
  setIsLoading(true)
  console.log(request)
  deceased.id = generateRandomID();
  request.id = generateRandomID();
  deceased.id_request = request.id;
  request.id_deceased = deceased.id;
  request.id_add=coffin.id_add
  deceased.level=+deceased.level

  const dateString = `${date.day}T${date.time}:00`;
  const milliseconds = new Date(dateString).getTime();
  deceased.dod = milliseconds;

  const birthDateString = `${birthDate}T00:00:00`;
  const milliseconds2 = new Date(birthDateString).getTime();
  deceased.dob = milliseconds2;

  const currentDateString = `${currentDate}T00:00:00`;
  const milliseconds3 = new Date(currentDateString).getTime();
  request.date = milliseconds3;

  request.wreath = isOn;
  request.id_coffin_group = `${coffin.place.initials}${coffin.type.initials}${coffin.size.initials}${coffin.color.initials}${coffin.metal_box.initials}`;
  if (validateDeceased(deceased) && validateRequest(request)) {
    const json = {
      request: request,
      deceased: deceased,
    };
    try {
      const response = await postRequestApi(json);
      if (response?.data.status === "ok") {
        createToast("success", "Solicitud creada con éxito");
      } else {
        createToast(
          "error",
          "Verifique que los datos ingresados sean correctos"
        );
      }
    } catch (error) {
      createToast("warning", "ocurrio un error, vuelva a intentar");
      console.error(error);
    }
  }
  setIsLoading(false)
};
