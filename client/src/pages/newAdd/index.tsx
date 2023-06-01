import React,{ useState, useEffect } from "react";
import {
  addInicialState,
  initialDate,
  initialCoffin,
} from "./components/initialStates";
import {
  addHandleSubmit,
  handleAddChange,
  handleCoffinColor,
  handleCoffinPlace,
  handleCoffinSize,
  handleCoffinType,
  handleDateChange,
} from "./components/functions";
import { types, sizes, colors } from "../../components/arrays";
import { FormButton, SwitchBtn } from "../../components/Buttons";
import styles from "./styles/newAdd.module.css";
import { getAllPlaces } from "../places/functions";
import { useAppDispatch, useAppSelector } from "../../store/hooks";
import { getplace } from "../../store/Slices/place";

const Adds = () => {

  const dispatch = useAppDispatch()

  const [add, setAdd] = useState(addInicialState);
  const [product, setProduct] = useState("")
  const [date, setDate] = useState(initialDate);
  const [coffin, setCoffin] = useState(initialCoffin);
  const [isOn, setIsOn] = useState(false);

  const places = useAppSelector(getplace)

  const handleToggleSwitch = () => {
    setIsOn(!isOn);
  };

  useEffect(()=>{
    getAllPlaces(dispatch)
  },[])

  return (
    <div className={styles.container}>
      <div className={styles.title}>Nuevo Ingreso</div>
      <form
        onSubmit={(e) => addHandleSubmit(e, coffin, date, add, places)}
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
        <div>
          <div>Ingreso: </div>
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
        <div>
          <div>Ataud:</div>
          <div className={styles.coffinDiv}>
            <div>
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
            <div>
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
            <div>
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
            <div className={styles.switchBox}>
              <div>Caja metálica:</div>
              <div className={styles.metalBox}>
                <div>No</div>
                <div className={styles.switchBtnContainer}><SwitchBtn isOn={isOn} onClick={handleToggleSwitch} /></div>
                <div>Si</div>
              </div>
            </div>
          </div>
        </div>
        <div>
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
        <div>
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
        <div>
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
export default Adds;
