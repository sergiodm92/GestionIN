import React, { useEffect, useState } from "react";
import { FormButton, LargeButton } from "../../../components/Buttons";
import { useAppDispatch, useAppSelector } from "../../../store/hooks";
import Loading from "../../../components/Loading/loading";
import { Formik, Form, Field, ErrorMessage } from "formik";
import * as Yup from "yup";
import styles from "../styles/settings.module.css";
import {
  getAllColors,
  getAllSizes,
  getAllTypes,
  handleSubmitColor,
  handleSubmitSize,
  handleSubmitType,
} from "../../../components/functions/settings/coffinProperty";
import {
  getColors,
  getSizes,
  getTypes,
} from "../../../store/Slices/coffinProperty";

const validationSchema = Yup.object().shape({
  name: Yup.string()
    .required("Nombre es requerido")
    .max(30, "Máximo 30 caracteres"),
  initials: Yup.string()
    .required("Iniciales son requeridas")
    .max(2, "Máximo 2 caracteres"),
});

const CoffinsSettings = () => {
  const [isLoading, setIsLoading] = useState(false);
  const [newType, setNewType] = useState(false);
  const [newSize, setNewSize] = useState(false);
  const [newColor, setNewColor] = useState(false);
  const [searchType, setSearchType] = useState("");
  const [searchSize, setSearchSize] = useState("");
  const [searchColor, setSearchColor] = useState("");

  const dispatch = useAppDispatch();
  const types = useAppSelector(getTypes);
  const sizes = useAppSelector(getSizes);
  const colors = useAppSelector(getColors);

  useEffect(() => {
    getAllTypes(dispatch);
    getAllSizes(dispatch);
    getAllColors(dispatch);
  }, [isLoading]);

  var filteredTypes = [{ name: "sin datos", initials: "" }];
  filteredTypes = types.filter((t) =>
    t.name.toLowerCase().includes(searchType.toLowerCase())
  );
  var filteredSizes = [{ name: "sin datos", initials: "" }];
  filteredSizes = sizes.filter((s) =>
    s.name.toLowerCase().includes(searchSize.toLowerCase())
  );
  var filteredColors = [{ name: "sin datos", initials: "" }];
  filteredColors = colors.filter((c) =>
    c.name.toLowerCase().includes(searchColor.toLowerCase())
  );

  return (
    <div className={styles.container}>
      <div className={styles.title}>Propiedades de Ataúdes</div>
      <div className={styles.propertyContainer}>
        <div className={styles.property}>
          <div className={styles.subTitle}>Tipos:</div>
          <div className={styles.searchContaier}>
            <input
              type="text"
              placeholder="🔎"
              value={searchType}
              className={styles.search}
              onChange={(e) => setSearchType(e.target.value)}
            />
          </div>
          {filteredTypes.length > 0 ? (
            <div className={styles.tableContainer}>
              <table className={styles.table}>
                <thead>
                  <tr>
                    <th>Nombre</th>
                    <th>Iniciales</th>
                  </tr>
                </thead>
                <tbody>
                  {filteredTypes.map((p, i) => (
                    <tr key={i}>
                      <td>{p.name}</td>
                      <td>{p.initials}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          ) : filteredTypes[0]?.name == "sin datos" ? (
            <Loading />
          ) : null}
          <LargeButton
            title="Agregar Tipo"
            onClick={() => setNewType(!newType)}
          />
          {!newType ? null : (
            <Formik
              initialValues={{
                name: "",
                initials: "",
              }}
              validationSchema={validationSchema}
              onSubmit={(values, { setSubmitting, setValues }) => {
                handleSubmitType(
                  types,
                  values,
                  setValues,
                  setSubmitting,
                  setIsLoading
                );
              }}
            >
              <Form className={styles.formContainer}>
                <div className={styles.title}>Nuevo Tipo:</div>
                <div className={styles.form}>
                  <div>Nombre del tipo:</div>
                  <Field
                    type="text"
                    id="name"
                    name="name"
                    placeholder="Plano"
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
                    placeholder="PL"
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
        <div className={styles.property}>
          <div className={styles.subTitle}>Tamaños:</div>
          <div className={styles.searchContaier}>
            <input
              type="text"
              placeholder="🔎"
              value={searchSize}
              className={styles.search}
              onChange={(e) => setSearchSize(e.target.value)}
            />
          </div>
          {filteredSizes.length > 0 ? (
            <div className={styles.tableContainer}>
              <table className={styles.table}>
                <thead>
                  <tr>
                    <th>Nombre</th>
                    <th>Iniciales</th>
                  </tr>
                </thead>
                <tbody>
                  {filteredSizes.map((p, i) => (
                    <tr key={i}>
                      <td>{p.name}</td>
                      <td>{p.initials}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          ) : filteredSizes[0]?.name == "sin datos" ? (
            <Loading />
          ) : null}
          <LargeButton
            title="Agregar Tamaño"
            onClick={() => setNewSize(!newSize)}
          />
          {!newSize ? null : (
            <Formik
              initialValues={{
                name: "",
                initials: "",
              }}
              validationSchema={validationSchema}
              onSubmit={(values, { setSubmitting, setValues }) => {
                handleSubmitSize(
                  sizes,
                  values,
                  setValues,
                  setSubmitting,
                  setIsLoading
                );
              }}
            >
              <Form className={styles.formContainer}>
                <div className={styles.title}>Nuevo Tamaño:</div>
                <div className={styles.form}>
                  <div>Nombre del tamaño:</div>
                  <Field
                    type="text"
                    id="name"
                    name="name"
                    placeholder="Normal"
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
                    placeholder="NO"
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
        <div className={styles.property}>
          <div className={styles.subTitle}>Colores:</div>
          <div className={styles.searchContaier}>
            <input
              type="text"
              placeholder="🔎"
              value={searchColor}
              className={styles.search}
              onChange={(e) => setSearchColor(e.target.value)}
            />
          </div>
          {filteredColors.length > 0 ? (
            <div className={styles.tableContainer}>
              <table className={styles.table}>
                <thead>
                  <tr>
                    <th>Nombre</th>
                    <th>Iniciales</th>
                  </tr>
                </thead>
                <tbody>
                  {filteredColors.map((p, i) => (
                    <tr key={i}>
                      <td>{p.name}</td>
                      <td>{p.initials}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          ) : filteredColors[0]?.name == "sin datos" ? (
            <Loading />
          ) : null}
          <LargeButton
            title="Agregar Color"
            onClick={() => setNewColor(!newColor)}
          />
          {!newColor ? null : (
            <Formik
              initialValues={{
                name: "",
                initials: "",
              }}
              validationSchema={validationSchema}
              onSubmit={(values, { setSubmitting, setValues }) => {
                handleSubmitColor(
                  colors,
                  values,
                  setValues,
                  setSubmitting,
                  setIsLoading
                );
              }}
            >
              <Form className={styles.formContainer}>
                <div className={styles.title}>Nuevo Color:</div>
                <div className={styles.form}>
                  <div>Nombre del color:</div>
                  <Field
                    type="text"
                    id="name"
                    name="name"
                    placeholder="Roble"
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
                    placeholder="RO"
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
      </div>
    </div>
  );
};
export default CoffinsSettings;
