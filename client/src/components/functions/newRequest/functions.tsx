import { CoffinInitials, DateType } from "../../../types/interfaces";
import {
  Deceased,
  RequestService,
  Request,
} from "../../../types/requestsInterfaces";
import { createToast } from "../../Notifications/Notifications";
import { postRequestApi, postRequestServiceApi } from "../../../services/requestApi";
import { generateRandomID } from "../../functions";
import { validateRequest, validateRequestService } from "../../Validations/request";
import { validateDeceased } from "../../Validations/deceased";

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

export const handleRequestServiceChange = (
  e: any,
  request: RequestService,
  setRequest: any
) => {
  e.preventDefault();
  setRequest({
    ...request,
    [e.target.name]: e.target.value,
  });
};

export const handleDateChange = (
  e: React.ChangeEvent<HTMLInputElement>,
  date: DateType,
  setDate: any
) => {
  e.preventDefault();
  setDate({
    ...date,
    [e.target.name]: e.target.value,
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
  setDeceased: any,
  initialDeceased: Deceased,
  request: Request,
  setRequest: any,
  initialRequest: Request,
  date: DateType,
  birthDate: string,
  currentDate: string,
  setBirthDate: any,
  setDate: any,
  setCurrentDate: any,
  initialDate: DateType,
  coffin: CoffinInitials,
  isOn: boolean,
  setIsLoading: any
) => {
  e.preventDefault();
  setIsLoading(true);
  deceased.id = generateRandomID();
  request.id = generateRandomID();
  deceased.id_request = request.id;
  request.id_deceased = deceased.id;
  request.id_add = coffin.id_add;
  deceased.level = +deceased.level;

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
        setDeceased(initialDeceased);
        setBirthDate(initialDate);
        setDate(initialDate);
        setCurrentDate(initialDate);
        const selectElement = document.getElementById(
          "cementery_type"
        ) as HTMLSelectElement;
        selectElement.selectedIndex = 0;
        setRequest(initialRequest);
        const selectElement1 = document.getElementById(
          "place"
        ) as HTMLSelectElement;
        selectElement1.selectedIndex = 0;
        const selectElement2 = document.getElementById(
          "type"
        ) as HTMLSelectElement;
        selectElement2.selectedIndex = 0;
        const selectElement3 = document.getElementById(
          "size"
        ) as HTMLSelectElement;
        selectElement3.selectedIndex = 0;
        const selectElement4 = document.getElementById(
          "color"
        ) as HTMLSelectElement;
        selectElement4.selectedIndex = 0;
        const selectElement5 = document.getElementById(
          "metal_box"
        ) as HTMLSelectElement;
        selectElement5.selectedIndex = 0;
        const selectElement6 = document.getElementById(
          "id_metal_box_group"
        ) as HTMLSelectElement;
        selectElement6.selectedIndex = 0;
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
  setTimeout(() => {
    setIsLoading(false);
  }, 5000);
};

export const handleSubmitServices = async (
  e: React.FormEvent<HTMLFormElement>,
  deceased: Deceased,
  setDeceased: any,
  initialDeceased: Deceased,
  request: RequestService,
  setRequest: any,
  initialRequest: RequestService,
  date: DateType,
  birthDate: string,
  currentDate: string,
  setBirthDate: any,
  setDate: any,
  setCurrentDate: any,
  initialDate: DateType,
  coffin: CoffinInitials,
  isOn: boolean,
  setIsLoading: any
) => {
  e.preventDefault();
  setIsLoading(true);
  deceased.id = generateRandomID();
  request.id = generateRandomID();
  deceased.id_request = request.id;
  request.id_deceased = deceased.id;
  request.id_add = coffin.id_add;
  deceased.level = +deceased.level;

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
  if (validateDeceased(deceased) && validateRequestService(request)) {
    const json = {
      request: request,
      deceased: deceased,
    };
    try {
      const response = await postRequestServiceApi(json);
      if (response?.data.status === "ok") {
        createToast("success", "Solicitud creada con éxito");
        setDeceased(initialDeceased);
        setBirthDate(initialDate);
        setDate(initialDate);
        setCurrentDate(initialDate);
        const selectElement = document.getElementById(
          "cementery_type"
        ) as HTMLSelectElement;
        selectElement.selectedIndex = 0;
        setRequest(initialRequest);
        const selectElement1 = document.getElementById(
          "place"
        ) as HTMLSelectElement;
        selectElement1.selectedIndex = 0;
        const selectElement2 = document.getElementById(
          "type"
        ) as HTMLSelectElement;
        selectElement2.selectedIndex = 0;
        const selectElement3 = document.getElementById(
          "size"
        ) as HTMLSelectElement;
        selectElement3.selectedIndex = 0;
        const selectElement4 = document.getElementById(
          "color"
        ) as HTMLSelectElement;
        selectElement4.selectedIndex = 0;
        const selectElement5 = document.getElementById(
          "metal_box"
        ) as HTMLSelectElement;
        selectElement5.selectedIndex = 0;
        const selectElement6 = document.getElementById(
          "id_metal_box_group"
        ) as HTMLSelectElement;
        selectElement6.selectedIndex = 0;
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
  setTimeout(() => {
    setIsLoading(false);
  }, 5000);
};
