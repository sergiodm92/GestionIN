import React, { useEffect, useState } from "react";
import { FormButton, LargeButton } from "../../../components/Buttons";
import { useAppDispatch, useAppSelector } from "../../../store/hooks";
import styles from "../styles/settings.module.css";
import Loading from "../../../components/Loading/loading";
import { getCementery } from "../../../store/Slices/cementery";
import {
  getAllCementeries,
  handleSubmit,
} from "../../../components/functions/settings/cementeries";
import { cementery_type1, cementery_type2 } from "../../../utils/constants";
import { getAllPlaces } from "../../../components/functions/places";
import { getplace } from "../../../store/Slices/place";
import { Formik, Form, Field, ErrorMessage } from "formik";
import * as Yup from "yup";

const validationSchema = Yup.object().shape({
  name: Yup.string().required("Nombre del Cementerio es requerido").max(20, "Máximo 20 caracteres"),
  place: Yup.string().required("Lugar es requerido"),
  type: Yup.string().required("Tipo de Cementerio es requerido"),
});

const cementeryType = [cementery_type1, cementery_type2];

const NewCementery = () => {
  const [isLoading, setIsLoading] = useState(false);
  const [newCementery, setNewCementery] = useState(false);
  const [searchName, setSearchName] = useState("");

  const dispatch = useAppDispatch();
  const cementeries = useAppSelector(getCementery);
  const places = useAppSelector(getplace);

  useEffect(() => {
    getAllPlaces(dispatch);
  }, []);

  useEffect(() => {
    getAllCementeries(dispatch);
  }, [isLoading]);

  var filteredData =[{name:"sin datos",place:"", type:"" }]
  filteredData = cementeries.filter((c) =>
    c.name.toLowerCase().includes(searchName.toLowerCase())
  );

  return (
    <div className={styles.container}>
      <div className={styles.title}>Cementerios</div>
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
                <th>Lugar</th>
                <th>Tipo</th>
              </tr>
            </thead>
            <tbody>
              {filteredData.map((c, i) => (
                <tr key={i}>
                  <td>{c.name}</td>
                  <td>{c.place}</td>
                  <td>{c.type}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      ): filteredData[0]?.name == "sin datos" ? (
        <Loading />
      ) : null}
      <LargeButton
        title="Agregar Cementerio"
        onClick={() => setNewCementery(!newCementery)}
      />
      {!newCementery ? null : (
        <Formik
          initialValues={{
            name: "",
            place: "-",
            type: "-",
          }}
          validationSchema={validationSchema}
          onSubmit={(values, { setSubmitting, setValues }) => {
            handleSubmit(cementeries, values, setValues, setSubmitting, setIsLoading);
          }}
        >
          <Form className={styles.formContainer}>
            <div className={styles.title}>Nuevo Cementerio:</div>
            <div className={styles.form}>
              <div>Nombre del Cementerio:</div>
              <Field
                type="text"
                id="name"
                name="name"
                placeholder="El Salvador"
                className={styles.input}
              />
              <ErrorMessage
                name="name"
                component="div"
                className={styles.error}
              />
            </div>
            <div className={styles.form}>
              <div>Lugar:</div>
              <Field
                as="select"
                id="place"
                name="place"
                className={styles.input}
              >
                <option value="-">-</option>
                {places.map((t, i) => (
                  <option key={i} value={t.name}>
                    {t.name}
                  </option>
                ))}
              </Field>
              <ErrorMessage
                name="place"
                component="div"
                className={styles.error}
              />
            </div>
            <div className={styles.form}>
              <div>Tipo de Cementerio:</div>
              <Field as="select" id="type" name="type" className={styles.input}>
                <option value="-">-</option>
                {cementeryType.map((t, i) => (
                  <option key={i} value={t}>
                    {t}
                  </option>
                ))}
              </Field>
              <ErrorMessage
                name="type"
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
export default NewCementery;
