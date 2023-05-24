import React,{ useState } from "react";
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
import { places, types, sizes, colors } from "../../components/arrays";
import { FormButton, SwitchBtn } from "../../components/Buttons";
import styles from "./styles/newAdd.module.css";

const Adds = () => {

  const [add, setAdd] = useState(addInicialState);
  const [date, setDate] = useState(initialDate);
  const [coffin, setCoffin] = useState(initialCoffin);
  const [isOn, setIsOn] = useState(false);

  const handleToggleSwitch = () => {
    setIsOn(!isOn);
  };

  return (
    <div className={styles.container}>
      <div className={styles.title}>Nuevo Ingreso</div>
      <form
        onSubmit={(e) => addHandleSubmit(e, coffin, date, add, setAdd, setDate)}
        className={styles.formContainer}
      >
        <div>
          <div>Fecha</div>
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
        <div>
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
