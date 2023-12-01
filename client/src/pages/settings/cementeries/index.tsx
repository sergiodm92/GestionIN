import { useEffect, useState } from "react";
import { FormButton, LargeButton } from "../../../components/Buttons";
import { useAppDispatch, useAppSelector } from "../../../store/hooks";
import styles from "../styles/settings.module.css";
import Loading from "../../../components/Loading/loading";
import { getCementery } from "../../../store/Slices/cementery";
import {
  getAllCementeries,
  handleCementeryPlace,
  handleCementeryType,
  handleSubmit,
} from "../../../components/functions/cementeries";
import { cementery_type1, cementery_type2 } from "../../../utils/constants";
import { getAllPlaces } from "../../../components/functions/places";
import { getplace } from "../../../store/Slices/place";

import React from 'react';
import { Formik, Form, Field, ErrorMessage } from 'formik';
import * as Yup from 'yup';

const validationSchema = Yup.object().shape({
  name: Yup.string().required('Este campo es obligatorio'),
  place: Yup.string().required('Este campo es obligatorio'),
  cementeryType: Yup.string().required('Este campo es obligatorio'),
});

const initialCementeryState = {
  name: "",
  place: "",
  type: "",
};
const cementeryType = [cementery_type1, cementery_type2];

const NewCementery = () => {
  const [cementery, setCementery] = useState(initialCementeryState);
  const [isLoading, setIsLoading] = useState(false);
  const [newCementery, setNewCementery] = useState(false);

  const dispatch = useAppDispatch();
  const cementeries = useAppSelector(getCementery);
  const places = useAppSelector(getplace)

  useEffect(() => {
    getAllCementeries(dispatch);
    getAllPlaces(dispatch);
  }, []);

  const handleChange = (e: any) => {
    e.preventDefault();
    setCementery({
      ...cementery,
      [e.target.name]: e.target.value,
    });
  };

  return (
    <div className={styles.container}>
      <div className={styles.title}>Cementerios</div>
      {cementeries.length > 0 && (
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
              {cementeries.map((c, i) => (
                <tr key={i}>
                  <td>{c.name}</td>
                  <td>{c.place}</td>
                  <td>{c.type}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}
      <LargeButton
        title="Agregar Cementerio"
        onClick={() => setNewCementery(!newCementery)}
      />
      {!newCementery ? null : (
        <form
          onSubmit={(e) =>
            handleSubmit(e, cementeries, cementery, setIsLoading)
          }
          className={styles.form}
        >
          <div className={styles.title}>Nuevo Cementerio:</div>
          <div className={styles.formRow}>
            <div>Nombre del Cementerio:</div>
            <input
              type="text"
              id="name"
              name="name"
              value={cementery.name}
              onChange={handleChange}
              placeholder="El Salvador"
              className={styles.input}
              style={{ width: "calc(100% - 146px)" }}
            />
          </div>
          <div className={styles.formRow}>
            <div>Lugar:</div>
            <select
              id="place"
              className={styles.input}
              onChange={(e) => handleCementeryPlace(e, cementery, setCementery)}
            >
              <option defaultValue={"-"}>-</option>
              {places.map((t, i) => (
                <option key={i} value={t.name}>
                  {t.name}
                </option>
              ))}
            </select>
          </div>
          <div className={styles.formRow}>
            <div>Tipo de Cementerio:</div>
            <select
              id="cementeryType"
              className={styles.input}
              onChange={(e) => handleCementeryType(e, cementery, setCementery)}
            >
              <option defaultValue={"-"}>-</option>
              {cementeryType.map((t, i) => (
                <option key={i} value={t}>
                  {t}
                </option>
              ))}
            </select>
          </div>
          <FormButton
            title={isLoading ? <Loading /> : "Guardar"}
            loading={isLoading}
            disabled={isLoading}
          />
        </form>
      )}
    </div>
  );
};
export default NewCementery;
