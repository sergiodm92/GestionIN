import { AddGeneral } from "../../types/addsInterfaces";
import { createToast } from "../Notifications/Notifications";

export const validateAddGeneral = (form: AddGeneral) => {
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
        field: "product",
        message: "Debe proporcionar un producto",
        condition: !form.product,
      },
    {
      field: "amount",
      message: "Debe proporcionar la cantidad",
      condition: isNaN(form.amount),
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
    if (condition || !form[field as keyof AddGeneral]) {
      createToast("error", message)
      return false;
    }
  }

  return true;
};
