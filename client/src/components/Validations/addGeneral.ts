import { AddGeneral } from "../../types/addsInterfaces";
import Swal from "sweetalert2";

export const validateAddMetalBox = (form: AddGeneral) => {
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
