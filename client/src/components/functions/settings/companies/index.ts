import { getAllCompaniesApi, postCompanyApi } from "../../../../services/companiesApi"
import { setCompanyData } from "../../../../store/Slices/companies"
import { Company } from "../../../../types/companies"
import { createToast } from "../../../Notifications/Notifications"
import { capitalizeString } from "../cementeries"

export const getAllCompanies = async (dispatch: any)=>{
    try{
        const companies = await getAllCompaniesApi()
        dispatch(setCompanyData(companies.data))
    }
    catch(err){
        console.log(err)
    }
  }

  export const handleSubmit = async (
    companies: Company[],
    values: Company,
    setValues: any,
    setSubmitting: any,
    setIsLoading: any
  ) => {
    setIsLoading(true);
    setSubmitting(true);
    if (companies.find((c) => c.name.toLowerCase() === values.name.toLowerCase())) {
      createToast(
        "warning",
        "El nombre ingresado ya existe. Por favor ingrese otro nombre"
      );
    } else if (
        companies.find(
        (c) => c.initials.toLowerCase() === values.initials.toLowerCase()
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
        const response = await postCompanyApi(values);
        if (response?.data.status === "ok") {
          createToast("success", "Empresa creada con éxito");
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