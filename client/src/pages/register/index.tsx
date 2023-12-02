import { use, useEffect, useState } from "react";
import { useRouter } from "next/router";
import { postNewUserApi } from "../../services/userApi";
import { createToast } from "../../components/Notifications/Notifications";
import { FormButton } from "../../components/Buttons";
import styles from "./styles/register.module.css";
import Loading from "../../components/Loading/loading";
import { getUser, setLoginData } from "../../store/Slices/userSlice";
import { useAppDispatch, useAppSelector } from "../../store/hooks";
import { getplace } from "../../store/Slices/place";
import { Formik, Field, Form, ErrorMessage } from "formik";
import * as Yup from "yup";

const validationSchema = Yup.object().shape({
  name: Yup.string().required("Usuario es requerido"),
  password: Yup.string().required("Contraseña es requerida"),
  confirmPassword: Yup.string()
    .oneOf([Yup.ref("password"), null], "Las contraseñas deben coincidir")
    .required("Confirmar contraseña es requerida"),
  place: Yup.string().required("Lugar es requerido"),
  admin: Yup.boolean().required("Administrador es requerido"),
});

const Register = () => {
  const router = useRouter();
  const dispatch = useAppDispatch();
  const places = useAppSelector(getplace);
  console.log(places)

  const handleSubmit = async (values: any, { setSubmitting }) => {
    try {
      const response = await postNewUserApi(values);
      if (response.data.status === "ok") {
        createToast("success", "Usuario creado correctamente");
        router.push("/login");
      } else {
        createToast(
          "error",
          "Verifique que los datos ingresados sean correctos"
        );
      }
    } catch (error) {
      createToast("warning", "Ocurrió un error, vuelva a intentar");
      console.error(error);
    }
    setSubmitting(false);
  };

  return (
    <div className={styles.loginContainer}>
      <Formik
        initialValues={{
          name: "",
          password: "",
          confirmPassword: "",
          place: "",
          admin: false,
        }}
        validationSchema={validationSchema}
        onSubmit={handleSubmit}
      >
        {({ isSubmitting }) => (
          <Form className={styles.form}>
            <div className={styles.loginTitle}>Nueva cuenta</div>
            <div>
              <div className={styles.inputText}>Usuario:</div>
              <Field
                className={styles.input}
                type="text"
                id="name"
                name="name"
              />
              <ErrorMessage
                name="name"
                component="div"
                className={styles.errorText}
              />
            </div>
            <div>
              <div className={styles.inputText}>Contraseña:</div>
              <Field
                className={styles.input}
                type="password"
                id="password"
                name="password"
              />
              <ErrorMessage
                name="password"
                component="div"
                className={styles.errorText}
              />
            </div>
            <div>
              <div className={styles.inputText}>Confirmar contraseña:</div>
              <Field
                className={styles.input}
                type="password"
                id="confirmPassword"
                name="confirmPassword"
              />
              <ErrorMessage
                name="confirmPassword"
                component="div"
                className={styles.errorText}
              />
            </div>
            <div>
              <div className={styles.inputText}>Lugar:</div>
              <Field as="select" name="place" className={styles.selects}>
                <option value="" disabled>
                  Seleccione un lugar
                </option>
                {places.map((place, i) => (
                  <option key={i} value={place.name}>
                    {place.name}
                  </option>
                ))}
              </Field>
              <ErrorMessage
                name="place"
                component="div"
                className={styles.errorText}
              />
            </div>
            <div>
              <div className={styles.inputText}>¿Administrador?:</div>
              <Field
                as="select"
                className={styles.select}
                id="admin"
                name="admin"
              >
                <option value={"false"}>No</option>
                <option value={"true"}>Sí</option>
              </Field>
              <ErrorMessage
                name="admin"
                component="div"
                className={styles.errorText}
              />
            </div>
            <FormButton
              title={isSubmitting ? <Loading /> : "Crear"}
              loading={isSubmitting}
              disabled={isSubmitting}
            />
          </Form>
        )}
      </Formik>
    </div>
  );
};

export default Register;
