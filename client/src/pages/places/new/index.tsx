import { useEffect } from "react";
import { useFormik } from "formik";
import * as Yup from "yup";
import { FormButton } from "../../../components/Buttons";
import { getAllPlaces } from "../../../components/functions/places";
import { getAllPlacesApi, postPlaceApi } from "../../../services/placesApi";
import { useAppDispatch, useAppSelector } from "../../../store/hooks";
import { getplace } from "../../../store/Slices/place";
import styles from "../styles/places.module.css";
import Loading from "../../../components/Loading/loading";
import { createToast } from "../../../components/Notifications/Notifications";

const capitalizeString = (str: string) => {
  str = str.toLowerCase();
  var words = str.split(" ");
  for (var i = 0; i < words.length; i++) {
    var firstLetter = words[i].charAt(0).toUpperCase();
    var restOfWord = words[i].slice(1);
    words[i] = firstLetter + restOfWord;
  }
  var capitalizedString = words.join(" ");
  return capitalizedString;
};

const handleSubmit = async (values:any, setSubmitting:any ) => {
  setSubmitting(true)
  values.name = capitalizeString(values.name).trim()
  values.initials = values.initials.toUpperCase().trim()
    try {
      const response = await postPlaceApi(values);
      if (response?.data.status === "ok") {
        createToast("success", "Depósito creado con éxito");
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
  setSubmitting(false)
};

const NewPlace = () => {
  const dispatch = useAppDispatch();
  const places = useAppSelector(getplace);

  useEffect(() => {
    getAllPlaces(dispatch);
  }, [dispatch]);

  const formik = useFormik({
    initialValues: {
      name: "",
      initials: "",
    },
    validationSchema: Yup.object({
      name: Yup.string().required("Nombre del Lugar es requerido").max(20, "Máximo 20 caracteres"),
      initials: Yup.string().required("Iniciales son requeridas").max(2, "Máximo 2 caracteres")
    }),
    onSubmit: (values, { setSubmitting }) => {
      handleSubmit(values, setSubmitting);
    },
  });

  return (
    <div className={styles.container}>
      <form onSubmit={formik.handleSubmit} className={styles.form}>
        <div className={styles.title}>Nuevo Depósito:</div>
        <div className={styles.formRow}>
          <div>Nombre del Lugar:</div>
          <input
            type="text"
            id="name"
            name="name"
            value={formik.values.name}
            onChange={formik.handleChange}
            onBlur={formik.handleBlur}
            placeholder="San Pedro"
            className={styles.input}
            style={{ width: "calc(100% - 146px)" }}
          />
        </div>
        {formik.touched.name && formik.errors.name && (
          <div className={styles.error}>{formik.errors.name}</div>
        )}
        <div className={styles.formRow}>
          <div>Iniciales:</div>
          <input
            type="text"
            id="initials"
            name="initials"
            value={formik.values.initials}
            onChange={formik.handleChange}
            onBlur={formik.handleBlur}
            placeholder="SP"
            className={styles.input}
            style={{ width: "100%" }}
          />
        </div>
        {formik.touched.initials && formik.errors.initials && (
          <div className={styles.error}>{formik.errors.initials}</div>
        )}
        <FormButton title={formik.isSubmitting ? <Loading /> : "Guardar"} loading={formik.isSubmitting} disabled={formik.isSubmitting} />
      </form>
    </div>
  );
};

export default NewPlace;
