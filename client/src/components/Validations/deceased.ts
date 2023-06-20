import { Deceased } from "../../types/requestsInterfaces";
import { createToast } from "../Notifications/Notifications";

export const validateDeceased = (form: Deceased) => {
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
      field: "leyend",
      message: "Debe proporcionar texto de placa",
      condition: !form.leyend,
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
    {
      field: "cementery_type",
      message: "Debe proporcionar un tipo de cementerio",
      condition: !form.cementery_type,
    },
  ];

  for (const { field, message, condition } of validationList) {
    if (condition || !form[field as keyof Deceased]) {
      createToast("error", message)
      return false;
    }
  }

  return true;
};
