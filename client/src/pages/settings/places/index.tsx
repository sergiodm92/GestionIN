import React, { useEffect, useState } from "react";
import { FormButton, LargeButton } from "../../../components/Buttons";
import { useAppDispatch, useAppSelector } from "../../../store/hooks";
import Loading from "../../../components/Loading/loading";
import { handleSubmit } from "../../../components/functions/settings/places";
import { getAllPlaces } from "../../../components/functions/places";
import { getplace } from "../../../store/Slices/place";
import { Formik, Form, Field, ErrorMessage } from "formik";
import * as Yup from "yup";
import styles from "../styles/settings.module.css";

const validationSchema = Yup.object().shape({
    name: Yup.string().required("Nombre del Lugar es requerido").max(20, "Máximo 20 caracteres"),
    initials: Yup.string().required("Iniciales son requeridas").max(2, "Máximo 2 caracteres")
});

const NewPlace = () => {
  const [isLoading, setIsLoading] = useState(false);
  const [newPlace, setNewPlace] = useState(false);
  const [searchName, setSearchName] = useState("");

  const dispatch = useAppDispatch();
  const places = useAppSelector(getplace);

  useEffect(() => {
    getAllPlaces(dispatch);
  }, [isLoading]);

  const filteredData = places.filter((c) =>
    c.name.toLowerCase().includes(searchName.toLowerCase())
  );

  return (
    <div className={styles.container}>
      <div className={styles.title}>Depósitos</div>
      <div className={styles.searchContaier}>
        <input
          type="text"
          placeholder="🔎"
          value={searchName}
          className={styles.search}
          onChange={(e) => setSearchName(e.target.value)}
        />
      </div>
      {filteredData.length > 0 ? (
        <div className={styles.tableContainer}>
          <table className={styles.table}>
            <thead>
              <tr>
                <th>Nombre</th>
                <th>Iniciales</th>
              </tr>
            </thead>
            <tbody>
              {filteredData.map((p, i) => (
                <tr key={i}>
                  <td>{p.name}</td>
                  <td>{p.initials}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      ): <Loading />}
      <LargeButton
        title="Agregar Depósito"
        onClick={() => setNewPlace(!newPlace)}
      />
      {!newPlace ? null : (
        <Formik
          initialValues={{
            name: "",
            initials: "",
          }}
          validationSchema={validationSchema}
          onSubmit={(values, { setSubmitting, setValues }) => {
            handleSubmit(places, values, setValues, setSubmitting, setIsLoading);
          }}
        >
          <Form className={styles.formContainer}>
            <div className={styles.title}>Nuevo Depósito:</div>
            <div className={styles.form}>
              <div>Nombre del Depósito:</div>
              <Field
                type="text"
                id="name"
                name="name"
                placeholder="San Pedro"
                className={styles.input}
              />
              <ErrorMessage
                name="name"
                component="div"
                className={styles.error}
              />
            </div>
            <div className={styles.form}>
            <div>Nombre del Depósito:</div>
              <Field
                type="text"
                id="initials"
                name="initials"
                placeholder="SP"
                className={styles.input}
              />
              <ErrorMessage
                name="name"
                component="div"
                className={styles.error}
              />
            </div>
            <div className={styles.btnContainer}>
              <FormButton
                title={isLoading ? <Loading /> : "Guardar"}
                loading={isLoading}
                disabled={isLoading}
              />
            </div>
          </Form>
        </Formik>
      )}
    </div>
  );
};
export default NewPlace;