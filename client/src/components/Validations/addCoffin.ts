import { AddCoffin, Coffin, Product, Products } from "../../types/addsInterfaces";
import { Mbox } from "../../types/interfaces";
import { createToast } from "../Notifications/Notifications";

export const validateCoffin = (form: Coffin) => {
  const validationList = [
    {
      field: "units",
      message: "Debe proporcionar la cantidad",
      condition: isNaN(form.units),
    },
    {
      field: "type",
      message: "Debe proporcionar el tipo",
      condition: !form.type,
    },
    {
      field: "size",
      message: "Debe proporcionar el tamaño",
      condition: !form.size,
    },
    {
      field: "color",
      message: "Debe proporcionar el color",
      condition: !form.color,
    },
    {
      field: "supplier",
      message: "Debe proporcionar el proveedor",
      condition: !form.supplier,
    }
  ];

  for (const { field, message, condition } of validationList) {
    if (condition || !form[field as keyof Coffin]) {
      createToast("error", message)
      return false;
    }
  }
  return true;
};
export const validateMetalBox = (form: Mbox) => {
  const validationList = [
    {
      field: "units",
      message: "Debe proporcionar la cantidad",
      condition: isNaN(form.units),
    },
    {
      field: "size",
      message: "Debe proporcionar el tamaño",
      condition: !form.size,
    },
    {
      field: "supplier",
      message: "Debe proporcionar el proveedor",
      condition: !form.supplier,
    }
  ];

  for (const { field, message, condition } of validationList) {
    if (condition || !form[field as keyof Mbox]) {
      createToast("error", message)
      return false;
    }
  }
  return true;
};
export const validateProduct = (form: Products) => {
  const validationList = [
    {
      field: "name",
      message: "Debe proporcionar el nombre",
      condition: !form.name,
    },
    {
      field: "units",
      message: "Debe proporcionar la cantidad",
      condition: isNaN(form.units),
    },
    
  ];
  for (const { field, message, condition } of validationList) {
    if (condition || !form[field as keyof Products]) {
      createToast("error", message)
      return false;
    }
  }
  return true;
};
export const validateAddCoffin = (form: AddCoffin) => {
  const validationList = [
    {
      field: "date",
      message: "Debe proporcionar una fecha válida",
      condition: isNaN(form.date),
    },
    {
      field: "responsible",
      message: "Debe proporcionar un responsable",
      condition: !form.responsible,
    },
    {
      field: "place",
      message: "Debe proporcionar un lugar",
      condition: !form.place,
    },
  ];

  for (const { field, message, condition } of validationList) {
    if (condition || !form[field as keyof AddCoffin]) {
      createToast("error", message)
      return false;
    }
  }
  return true;
};
