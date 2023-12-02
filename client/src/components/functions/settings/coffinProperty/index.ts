import { getAllColorsApi, getAllSizesApi, getAllTypesApi, postColorApi, postSizeApi, postTypeApi } from "../../../../services/coffinPropertyApi";
import {
  getAllSuppliersApi,
  postSupplierApi,
} from "../../../../services/suppliersApi";
import { setColorsData, setSizesData, setTypesData } from "../../../../store/Slices/coffinProperty";
import { Property } from "../../../../types/coffinProperty";
import { Supplier } from "../../../../types/suppliers";
import { createToast } from "../../../Notifications/Notifications";
import { capitalizeString } from "../cementeries";

//------------TYPES------------
export const getAllTypes = async (dispatch: any) => {
  try {
    const types = await getAllTypesApi();
    dispatch(setTypesData(types.data));
  } catch (err) {
    console.log(err);
  }
};
export const handleSubmitType = async (
  types: Property[],
  values: Property,
  setValues: any,
  setSubmitting: any,
  setIsLoading: any
) => {
  setIsLoading(true);
  setSubmitting(true);
  if (
    types.find((t) => t.name.toLowerCase() === values.name.toLowerCase())
  ) {
    createToast(
      "warning",
      "El nombre ingresado ya existe. Por favor ingrese otro nombre"
    );
  } else if (
    types.find(
      (t) => t.initials.toLowerCase() === values.initials.toLowerCase()
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
      const response = await postTypeApi(values);
      if (response?.data.status === "ok") {
        createToast("success", "Nuevo Tipo de ataúd agregado con éxito");
        setValues({
          name: "",
          initials: "",
        });
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

//------------SIZES------------
export const getAllSizes = async (dispatch: any) => {
  try {
    const types = await getAllSizesApi();
    dispatch(setSizesData(types.data));
  } catch (err) {
    console.log(err);
  }
};
export const handleSubmitSize = async (
  sizes: Property[],
  values: Property,
  setValues: any,
  setSubmitting: any,
  setIsLoading: any
) => {
  setIsLoading(true);
  setSubmitting(true);
  if (
    sizes.find((s) => s.name.toLowerCase() === values.name.toLowerCase())
  ) {
    createToast(
      "warning",
      "El nombre ingresado ya existe. Por favor ingrese otro nombre"
    );
  } else if (
    sizes.find(
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
      const response = await postSizeApi(values);
      if (response?.data.status === "ok") {
        createToast("success", "Nuevo tamaño de ataúd agregado con éxito");
        setValues({
          name: "",
          initials: "",
        });
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

//------------COLORS------------
export const getAllColors = async (dispatch: any) => {
  try {
    const types = await getAllColorsApi();
    dispatch(setColorsData(types.data));
  } catch (err) {
    console.log(err);
  }
};
export const handleSubmitColor = async (
  colors: Property[],
  values: Property,
  setValues: any,
  setSubmitting: any,
  setIsLoading: any
) => {
  setIsLoading(true);
  setSubmitting(true);
  if (
    colors.find((c) => c.name.toLowerCase() === values.name.toLowerCase())
  ) {
    createToast(
      "warning",
      "El nombre ingresado ya existe. Por favor ingrese otro nombre"
    );
  } else if (
    colors.find(
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
      const response = await postColorApi(values);
      if (response?.data.status === "ok") {
        createToast("success", "Nuevo color agregado creado con éxito");
        setValues({
          name: "",
          initials: "",
        });
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
