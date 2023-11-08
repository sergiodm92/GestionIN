import { AddProducts } from "../../types/addsInterfaces";
import { createToast } from "../Notifications/Notifications";

export const validateAddGeneral = (form: AddProducts) => {
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
        field: "products",
        message: "Debe proporcionar al menos un producto y su cantidad",
        condition: !form.products.length,
      },
    {
      field: "responsible",
      message: "Debe proporcionar un responsable",
      condition: !form.responsible,
    },

  ];

  for (const { field, message, condition } of validationList) {
    if (condition || !form[field as keyof AddProducts]) {
      createToast("error", message)
      return false;
    }
  }

  return true;
};
