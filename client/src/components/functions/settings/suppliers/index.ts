import { getAllSuppliersApi, postSupplierApi } from "../../../../services/suppliersApi"
import { setSupplierData } from "../../../../store/Slices/suppliers"
import { Supplier } from "../../../../types/suppliers"
import { createToast } from "../../../Notifications/Notifications"
import { capitalizeString } from "../cementeries"

export const getAllSuppliers = async (dispatch: any)=>{
    try{
        const suppliers = await getAllSuppliersApi()
        dispatch(setSupplierData(suppliers.data))
    }
    catch(err){
        console.log(err)
    }
  }

  export const handleSubmit = async (
    suppliers: Supplier[],
    values: Supplier,
    setValues: any,
    setSubmitting: any,
    setIsLoading: any
  ) => {
    setIsLoading(true);
    setSubmitting(true);
    if (suppliers.find((s) => s.name.toLowerCase() === values.name.toLowerCase())) {
      createToast(
        "warning",
        "El nombre ingresado ya existe. Por favor ingrese otro nombre"
      );
    } else if (
      suppliers.find(
        (s) => s.initials.toLowerCase() === values.initials.toLowerCase()
      )
    ) {
      createToast(
        "warning",
        "La iniciales ingresadas ya existen. Por favor ingrese otras iniciales"
      );
    } else {
      values.name = capitalizeString(values.name).trim();
      values.initials = values.initials.toUpperCase().trim();
      try {
        const response = await postSupplierApi(values);
        if (response?.data.status === "ok") {
          createToast("success", "Proveedor creado con éxito");
          setValues({
              name: "",
              initials: ""
          })
        } else {
          createToast(
            "error",
            "Verifique que los datos ingresados sean correctos"
          );
        }
      } catch (err) {
        createToast("warning", "ocurrio un error, vuelva a intentar");
        console.log(err);
      }
    }
    setSubmitting(false);
    setTimeout(() => {
      setIsLoading(false);
    }, 3000);
  };