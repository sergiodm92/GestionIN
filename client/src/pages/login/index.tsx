import { useState } from "react";
import { useRouter } from "next/router";
import { createToast } from "../../components/Notifications/Notifications";
import { LoginUserApi } from "../../services/userApi";
import { FormButton } from "../../../src/components/Buttons";
import styles from "./styles/login.module.css";
import { useAppDispatch } from "../../store/hooks";
import { setLoginData } from "../../store/Slices/userSlice";
import Loading from "../../components/Loading/loading";
import { Formik, Field, Form, ErrorMessage } from "formik";
import * as Yup from "yup";

const validationSchema = Yup.object().shape({
  name: Yup.string().required("Usuario es requerido"),
  password: Yup.string().required("Contraseña es requerida"),
});

const Login = () => {
  const router = useRouter();
  const dispatch: any = useAppDispatch();
  const [isLoading, setIsLoading] = useState(false);

  const handleSubmit = async (values: any, { setSubmitting }: { setSubmitting: (isSubmitting: boolean) => void }
  ) => {
    setSubmitting(true);
    setIsLoading(true);

    try {
      const json = await LoginUserApi(values);
      const response = json.data;

      if (response.status === "ok") {
        createToast("success", "Bienvenido");
        localStorage.setItem("authToken", response.data.token);
        localStorage.setItem("userName", response.data.user.name);
        localStorage.setItem("userAdmin", response.data.user.admin);
        localStorage.setItem("userPlace", response.data.user.place);
        dispatch(setLoginData());
        router.push("/");
      } else {
        createToast(
          "error",
          "Usuario o contraseña incorrectos, vuelva a intentar"
        );
      }
    } catch (error) {
      createToast("warning", "Ocurrió un error, vuelva a intentar");
      console.error(error);
    }

    setIsLoading(false);
    setSubmitting(false);
  };

  return (
    <div className={styles.loginContainer}>
      <Formik
        initialValues={{
          name: "",
          password: "",
        }}
        validationSchema={validationSchema}
        onSubmit={handleSubmit}
      >
        {({ isSubmitting }) => (
          <Form className={styles.form}>
            <div className={styles.loginTitle}>Iniciar Sesión</div>
            <div>
              <div className={styles.inputText}>Ingresar usuario:</div>
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
              <div className={styles.inputText}>Ingresar contraseña:</div>
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
            <FormButton
              title={isSubmitting ? <Loading /> : "Ingresar"}
              loading={isSubmitting}
              disabled={isSubmitting}
            />
          </Form>
        )}
      </Formik>
    </div>
  );
};

export default Login;
