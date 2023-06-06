import React, { useState, useEffect } from "react";
import {
  addGeneralInicialState,
  initialDate,
} from "./components/initialStates";
import {
  addGralHandleSubmit,
  handleAddChange,
  handleDateChange,
} from "./components/functions";
import { types, sizes, colors } from "../../../components/arrays";
import { FormButton, SwitchBtn } from "../../../components/Buttons";
import styles from "../styles/newAdd.module.css";
import { getAllPlaces } from "../../places/functions";
import { useAppDispatch, useAppSelector } from "../../../store/hooks";
import { getplace } from "../../../store/Slices/place";

const AddGeneral = () => {
  const dispatch = useAppDispatch();

  const [add, setAdd] = useState(addGeneralInicialState);
  const [date, setDate] = useState(initialDate);

  const places = useAppSelector(getplace);

  useEffect(() => {
    getAllPlaces(dispatch);
  }, []);

  return (
    <div className={styles.container}>
      <div className={styles.title}>Nuevo Ingreso</div>
      <form
        onSubmit={(e) => addGralHandleSubmit(e, date, add)}
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
        <div className={styles.formRow}>
          <div>Producto:</div>
          <input
            className={styles.input}
            type="text"
            id="product"
            name="product"
            value={add.product}
            onChange={(e) => handleAddChange(e, add, setAdd)}
          />
        </div>        
        <div className={styles.formRow}>
          <div>Cantidad:</div>
          <input
            className={styles.input}
            type="number"
            id="amount"
            name="amount"
            value={add.amount}
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
export default AddGeneral;
