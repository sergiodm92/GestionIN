import React, { useEffect, useState } from "react";
import { FormButton, LargeButton } from "../../../components/Buttons";
import { useAppDispatch, useAppSelector } from "../../../store/hooks";
import Loading from "../../../components/Loading/loading";
import { handleSubmit } from "../../../components/functions/settings/products";
import { Formik, Form, Field, ErrorMessage } from "formik";
import * as Yup from "yup";
import styles from "../styles/settings.module.css";
import { getAllProducts } from "../../../components/functions/products";
import { getProducts } from "../../../store/Slices/products";

const validationSchema = Yup.object().shape({
  name: Yup.string()
    .required("Nombre del Producto es requerido")
    .max(20, "Máximo 20 caracteres"),
});

const NewProduct = () => {
  const [isLoading, setIsLoading] = useState(false);
  const [newProduct, setNewProduct] = useState(false);
  const [searchName, setSearchName] = useState("");

  const dispatch = useAppDispatch();
  const products = useAppSelector(getProducts);

  useEffect(() => {
    getAllProducts(dispatch);
  }, [isLoading]);
  var filteredData = [{ id: "sin datos", name: "" }];
  filteredData = products.filter((p) =>
    p.name.toLowerCase().includes(searchName.toLowerCase())
  );

  return (
    <div className={styles.container}>
      <div className={styles.title}>Productos</div>
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
              </tr>
            </thead>
            <tbody>
              {filteredData.map((p, i) => (
                <tr key={i}>
                  <td>{p.name}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      ) : filteredData[0]?.id == "sin datos" ? (
        <Loading />
      ) : null}
      <LargeButton
        title="Agregar Producto"
        onClick={() => setNewProduct(!newProduct)}
      />
      {!newProduct ? null : (
        <Formik
          initialValues={{
            id: "",
            name: "",
          }}
          validationSchema={validationSchema}
          onSubmit={(values, { setSubmitting, setValues }) => {
            handleSubmit(
              products,
              values,
              setValues,
              setSubmitting,
              setIsLoading
            );
          }}
        >
          <Form className={styles.formContainer}>
            <div className={styles.title}>Nuevo Producto:</div>
            <div className={styles.form}>
              <div>Nombre del Producto:</div>
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
export default NewProduct;
