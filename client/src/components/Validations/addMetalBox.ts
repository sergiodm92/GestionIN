import { AddMetalBox } from "../../types/addsInterfaces";
import { createToast } from "../Notifications/Notifications";

export const validateAddMetalBox = (form: AddMetalBox) => {
  const validationList = [
    {
      field: "date",
      message: "Debe proporcionar una fecha válida",
      condition: isNaN(form.date),
    },
    {
        field: "place",
        message: "Debe proporcionar un lugar",
        condition: !form.place,
      },
      {
        field: "size",
        message: "Debe proporcionar un Tamaño",
        condition: !form.size,
      },
    {
      field: "units",
      message: "Debe proporcionar el número de unidades",
      condition: isNaN(form.units),
    },
    {
      field: "responsible",
      message: "Debe proporcionar un responsable",
      condition: !form.responsible,
    },

    {
      field: "supplier",
      message: "Debe proporcionar un proveedor",
      condition: !form.supplier,
    },

  ];

  for (const { field, message, condition } of validationList) {
    if (condition || !form[field as keyof AddMetalBox]) {
      createToast("error", message)
      return false;
    }
  }

  return true;
};
