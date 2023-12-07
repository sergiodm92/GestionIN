import { PostDeceased } from "../../types/requestsInterfaces";
import { cementery_type1 } from "../../utils/constants";
import { createToast } from "../Notifications/Notifications";

export const validateDeceased = (form: PostDeceased) => {
  const validationList = [
    {
      field: "name",
      message: "Debe proporcionar un nombre",
      condition: !form.name,
    },
    {
      field: "pod",
      message: "Debe proporcionar un lugar de fallecimiento",
      condition: !form.pod,
    },
    {
      field: "dod",
      message: "Debe proporcionar una fecha de fallecimiento válida",
      condition: isNaN(form.dod),
    },
    {
      field: "dob",
      message: "Debe proporcionar una fecha de nacimiento válida",
      condition: isNaN(form.dob),
    },
    {
      field: "dni",
      message: "Debe proporcionar un número de DNI válido",
      condition: !form.dni || !/^\d{7,9}$/.test(form.dni),
    },
    {
      field: "news_paper",
      message: "Debe proporcionar Esquela",
      condition: !form.news_paper,
    },
    {
      field: "news_paper_name",
      message: "Debe proporcionar un Nombre del Diario",
      condition: !form.news_paper_name,
    },
    // {
    //   field: "cementery",
    //   message: "Debe proporcionar el nombre del cementerio",
    //   condition: !form.cementery,
    // },
    // {
    //   field: "cementery_type",
    //   message: "Debe proporcionar un tipo de cementerio",
    //   condition: !form.cementery_type,
    // },
    {
      field: "sector",
      message: "Debe proporcionar un sector",
      condition: form.cementery_type === cementery_type1 && !form.sector,
    },
    {
      field: "parcel",
      message: "Debe proporcionar una parcela",
      condition: form.cementery_type === cementery_type1 && !form.parcel,
    },
    {
      field: "level",
      message: "Debe proporcionar un nivel",
      condition: form.cementery_type === cementery_type1 && ( !form.level || !/^[123]$/.test(String(form.level))),
    }, 
    {
      field: "first_level_name",
      message: "Debe proporcionar el nombre del difunto del primer nivel",
      condition: form.level > 1 && !form.first_level_name,
    }, 
    {
      field: "second_level_name",
      message: "Debe proporcionar el nombre del difunto del segundo nivel",
      condition: form.level == 3 && !form.second_level_name,
    },
    {
      field: "religion_symbol",
      message: "Debe proporcionar el símbolo de la religión",
      condition: form.cementery_type === cementery_type1 && !form.religion_symbol,
    },    
  ];

  for (const { message, condition } of validationList) {
    if (condition) {
      createToast("error", message)
      return false;
    }
  }

  return true;
};
