import { AddCoffin } from "../../types/addsInterfaces";
import Swal from "sweetalert2";

export const validateAddCoffin = (form: AddCoffin) => {
  const validationList = [
    {
      field: "id_coffin",
      message: "Debe proporcionar todos los datos del ataúd",
      condition: !form.id_coffin || form.id_coffin.length !== 10,
    },
    {
      field: "date",
      message: "Debe proporcionar una fecha válida",
      condition: isNaN(form.date),
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
    {
      field: "place",
      message: "Debe proporcionar un lugar",
      condition: !form.place,
    },
  ];

  for (const { field, message, condition } of validationList) {
    if (condition || !form[field as keyof AddCoffin]) {
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
