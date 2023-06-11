import { AddMetalBox } from "../../types/addsInterfaces";
import Swal from "sweetalert2";

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
      const Toast = Swal.mixin({
        toast: true,
        position: "top-end",
        showConfirmButton: false,
        timer: 3000,
        timerProgressBar: true,
        didOpen: (toast) => {
          toast.addEventListener("mouseenter", Swal.stopTimer);
          toast.addEventListener("mouseleave", Swal.resumeTimer);
        },
      });

      Toast.fire({
        icon: "error",
        title: message,
      });

      return false;
    }
  }

  return true;
};
