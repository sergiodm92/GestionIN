import React, { useEffect, useState } from "react";
import { FormButton, LargeButton } from "../../../components/Buttons";
import { useAppDispatch, useAppSelector } from "../../../store/hooks";
import Loading from "../../../components/Loading/loading";
import { Formik, Form, Field, ErrorMessage } from "formik";
import * as Yup from "yup";
import styles from "../styles/settings.module.css";
import { getAllSuppliers, handleSubmit } from "../../../components/functions/settings/suppliers";
import { getSuppliers } from "../../../store/Slices/suppliers";

const validationSchema = Yup.object().shape({
    name: Yup.string().required("Nombre del Proveedor es requerido").max(20, "Máximo 20 caracteres"),
    initials: Yup.string().required("Iniciales son requeridas").max(2, "Máximo 2 caracteres")
});

const NewSuppliers = () => {
  const [isLoading, setIsLoading] = useState(false);
  const [newSupplier, setNewSupplier] = useState(false);
  const [searchName, setSearchName] = useState("");

  const dispatch = useAppDispatch();
  const suppliers = useAppSelector(getSuppliers);

  useEffect(() => {
    getAllSuppliers(dispatch);
  }, [isLoading]);

  var filteredData =[{name:"sin datos",initials:"" }]
  filteredData = suppliers.filter((s) =>
    s.name.toLowerCase().includes(searchName.toLowerCase())
  );

  return (
    <div className={styles.container}>
      <div className={styles.title}>Proveedores</div>
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
      ): filteredData[0]?.name == "sin datos" ? (
        <Loading />
      ) : null}
      <LargeButton
        title="Agregar Proveedor"
        onClick={() => setNewSupplier(!newSupplier)}
      />
      {!newSupplier ? null : (
        <Formik
          initialValues={{
            name: "",
            initials: "",
          }}
          validationSchema={validationSchema}
          onSubmit={(values, { setSubmitting, setValues }) => {
            handleSubmit(suppliers, values, setValues, setSubmitting, setIsLoading);
          }}
        >
          <Form className={styles.formContainer}>
            <div className={styles.title}>Nuevo Proveedor:</div>
            <div className={styles.form}>
              <div>Nombre del Proveedor:</div>
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
            <div>Iniciales:</div>
              <Field
                type="text"
                id="initials"
                name="initials"
                placeholder="SP"
                className={styles.input}
              />
              <ErrorMessage
                name="initials"
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
export default NewSuppliers;