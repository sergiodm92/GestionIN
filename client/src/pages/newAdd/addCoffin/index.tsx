import React, { useState, useEffect } from "react";
import { addCoffinInicialState, initialCoffin } from "./components/initialStates";
import { addHandleSubmit,  handleAddChange,  handleCoffinColor,  handleCoffinPlace,  handleCoffinSize,  handleCoffinType } from "./components/functions";
import { types, sizes, colors } from "../../../components/arrays";
import { FormButton, SwitchBtn } from "../../../components/Buttons";
import { getAllPlaces } from "../../places/functions";
import { useAppDispatch, useAppSelector } from "../../../store/hooks";
import { getplace } from "../../../store/Slices/place";
import styles from "../styles/newAdd.module.css";

const AddCoffin = () => {
  
  const dispatch = useAppDispatch();

  const [add, setAdd] = useState(addCoffinInicialState);
  const [date, setDate] = useState("");
  const [coffin, setCoffin] = useState(initialCoffin);
  const [isOn, setIsOn] = useState(false);
  console.log(isOn)

  const places = useAppSelector(getplace);

  const handleToggleSwitch = () => {
    setIsOn(!isOn);
  };

  useEffect(() => {
    getAllPlaces(dispatch);
  }, []);

  return (
    <div className={styles.container}>
      <div className={styles.title}>Nuevo Ingreso de Ataúd</div>
      <form
        onSubmit={(e) => addHandleSubmit(e, coffin, isOn, date, add, places)}
        className={styles.formContainer}
      >
        <div className={styles.dateRow}>
          <div>Fecha: </div>
          <input
            type="date"
            id="date"
            name="date"
            value={date}
            className={styles.dateInput}
            onChange={(e) => {
              e.preventDefault()
              setDate(e.target.value)
            }}
          />
        </div>
        <div className={styles.formRow}>
          <div>Lugar de Depósito:</div>
          <select
            id="place"
            className={styles.input}
            onChange={(e) => handleCoffinPlace(e, coffin, setCoffin)}
          >
            <option defaultValue={"-"}>-</option>
            {places.map((p, i) => (
              <option key={i} value={p.initials}>
                {p.name}
              </option>
            ))}
          </select>
        </div>
        <div>Ataúd:</div>
        <div className={styles.formRow}>
          <div>Tipo:</div>
          <select
            id="type"
            className={styles.input}
            onChange={(e) => handleCoffinType(e, coffin, setCoffin)}
          >
            <option defaultValue={"-"}>-</option>
            {types.map((p, i) => (
              <option key={i} value={p.initials}>
                {p.name}
              </option>
            ))}
          </select>
        </div>
        <div className={styles.formRow}>
          <div>Tamaño:</div>
          <select
            id="size"
            className={styles.input}
            onChange={(e) => handleCoffinSize(e, coffin, setCoffin)}
          >
            <option defaultValue={"-"}>-</option>
            {sizes.map((p, i) => (
              <option key={i} value={p.initials}>
                {p.name}
              </option>
            ))}
          </select>
        </div>
        <div className={styles.formRow}>
          <div>Color:</div>
          <select
            id="color"
            className={styles.input}
            onChange={(e) => handleCoffinColor(e, coffin, setCoffin)}
          >
            <option defaultValue={"-"}>-</option>
            {colors.map((p, i) => (
              <option key={i} value={p.initials}>
                {p.name}
              </option>
            ))}
          </select>
        </div>
        <div className={styles.formRow}>
            <div>Caja metálica:</div>
            <div className={styles.metalBox}>
              <div>No</div>
              <div className={styles.switchBtnContainer}>
                <SwitchBtn isOn={isOn} onClick={handleToggleSwitch} />
              </div>
              <div>Si</div>
          </div>
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
export default AddCoffin;
