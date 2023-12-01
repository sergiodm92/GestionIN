import { useEffect, useState } from "react";
import { getAllCementeriesApi } from "../../../services/cementeriesApi";
import { Field, Formik } from "formik";
import { cementery_type1, cementery_type2 } from "../../../utils/constants";
import { getCementery } from "../../../store/Slices/cementery";
import { useAppDispatch, useAppSelector } from "../../../store/hooks";
import { getAllCementeries } from "../../../components/functions/cementeries";
import styles from "./styles/styles.module.css"
import { LargeButton } from "../../../components/Buttons";

const CemeteriesSettings = () => {
  const dispatch = useAppDispatch();
  const [isAdd, setIsAdd] = useState(false);
  const cementeries = useAppSelector(getCementery);
  const initialValues = {
    place: "",
    name: "",
    type: "",
  };

  useEffect(() => {
    getAllCementeries(dispatch);
  }, []);

  const handleSubmit = () => {};

  return (
    <section className={styles.container}>
      <button onClick={() => setIsAdd(true)} className={styles.btn}>Agregar</button>
      {isAdd && (
        <Formik initialValues={initialValues} onSubmit={handleSubmit}>
          <Field name="place" />
          <Field as="select" name="type">
            <option value={cementery_type1}>Parque</option>
            <option value={cementery_type2}>Municipal</option>
          </Field>
          <Field name="name" placeHolder="Nombre del cementerio" />
          <button type="submit">cargar</button>
        </Formik>
      )}
      <div className={styles.list}>
      {cementeries.length > 0 &&
        cementeries.map((cementery, i) => {
          return (<span key={i}>{cementery.name}</span>);
        })}
        </div>
    </section>
  );
};

export default CemeteriesSettings;
