import React, { useState, useEffect } from "react";
import {
  addMetalBoxInicialState,
  initialDate,
} from "./components/initialStates";
import {
  addMetalBoxHandleSubmit,
  handleAddChange,
  handleDateChange,
} from "./components/functions";
import { FormButton } from "../../../components/Buttons";
import styles from "../styles/newAdd.module.css";
import { getAllPlaces } from "../../places/functions";
import { useAppDispatch, useAppSelector } from "../../../store/hooks";
import { getplace } from "../../../store/Slices/place";
import { sizes } from "../../../components/arrays";

const AddMetalBox = () => {
  const dispatch = useAppDispatch();

  const [add, setAdd] = useState(addMetalBoxInicialState);
  const [date, setDate] = useState(initialDate);

  const places = useAppSelector(getplace);

  useEffect(() => {
    getAllPlaces(dispatch);
  }, []);

  return (
    <div className={styles.container}>
      <div className={styles.title}>Nuevo Ingreso de Cajas Metálicas</div>
      <form
        onSubmit={(e) => addMetalBoxHandleSubmit(e, date, add)}
        className={styles.formContainer}
      >
        <div className={styles.dateRow}>
          <div>Fecha: </div>
          <input
            className={styles.inputDate}
            type="text"
            id="day"
            name="day"
            value={date.day}
            onChange={(e) => handleDateChange(e, date, setDate)}
            placeholder="dd"
          />
          <input
            className={styles.inputDate}
            type="text"
            id="month"
            name="month"
            value={date.month}
            onChange={(e) => handleDateChange(e, date, setDate)}
            placeholder="mm"
          />
          <input
            className={styles.inputDate}
            type="text"
            id="year"
            name="year"
            value={date.year}
            onChange={(e) => handleDateChange(e, date, setDate)}
            placeholder="yyyy"
          />
        </div>
        <div className={styles.formRow}>
          <div>Lugar de Depósito:</div>
          <select
            id="place"
            className={styles.input}
            onChange={(e) => handleAddChange(e, add, setAdd)}
          >
            <option defaultValue={"-"}>-</option>
            {places.map((p, i) => (
              <option key={i} value={p.name}>
                {p.name}
              </option>
            ))}
          </select>
        </div>
        <div>Cajas Metálicas: </div>
        <div className={styles.formRow}>
          <div>Tamaño:</div>
          <select
            id="size"
            className={styles.input}
            onChange={(e) => handleAddChange(e, add, setAdd)}
          >
            <option defaultValue={"-"}>-</option>
            {sizes.map((p, i) => (
              <option key={i} value={p.name}>
                {p.name}
              </option>
            ))}
          </select>
        </div>
        <div className={styles.formRow}>
          <div>Unidades:</div>
          <input
            className={styles.input}
            type="number"
            id="units"
            name="units"
            value={add.units}
            onChange={(e) => handleAddChange(e, add, setAdd)}
          />
        </div>
        <div className={styles.formRow}>
          <div>Responsable:</div>
          <input
            className={styles.input}
            type="text"
            id="responsible"
            name="responsible"
            value={add.responsible}
            onChange={(e) => handleAddChange(e, add, setAdd)}
          />
        </div>
        <div className={styles.formRow}>
          <div>Proveedor:</div>
          <input
            className={styles.input}
            type="text"
            id="supplier"
            name="supplier"
            value={add.supplier}
            onChange={(e) => handleAddChange(e, add, setAdd)}
          />
        </div>
        <div className={styles.buttonContainer}>
          <FormButton title={"Guardar"} />
        </div>
      </form>
    </div>
  );
};
export default AddMetalBox;
