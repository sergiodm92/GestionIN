import { Place } from "./../../../../types/place";
import { postPlaceApi } from "../../../../services/placesApi";
import { createToast } from "../../../Notifications/Notifications";
import { capitalizeString } from "../cementeries";

export const handleSubmit = async (
  places: Place[],
  values: Place,
  setValues: any,
  setSubmitting: any,
  setIsLoading: any
) => {
  setIsLoading(true);
  setSubmitting(true);
  if (places.find((p) => p.name.toLowerCase() === values.name.toLowerCase())) {
    createToast(
      "warning",
      "El nombre ingresado ya existe. Por favor ingrese otro nombre"
    );
  } else if (
    places.find(
      (p) => p.initials.toLowerCase() === values.initials.toLowerCase()
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
      const response = await postPlaceApi(values);
      if (response?.data.status === "ok") {
        createToast("success", "Depósito creado con éxito");
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
