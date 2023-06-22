import React, { useState, useEffect } from "react";
import { addMetalBoxInicialState } from "../../../components/initialState/addMetalBox/initialStates";
import { addMetalBoxHandleSubmit, handleAddChange } from "../../../components/functions/addMetalBox/functions";
import { FormButton } from "../../../components/Buttons";
import styles from "../styles/newAdd.module.css";
import { getAllPlaces } from "../../../components/functions/places";
import { useAppDispatch, useAppSelector } from "../../../store/hooks";
import { getplace } from "../../../store/Slices/place";
import { sizes } from "../../../components/arrays";
import Loading from "../../../components/Loading/loading";

const AddMetalBox = () => {
  const dispatch = useAppDispatch();

  const [add, setAdd] = useState(addMetalBoxInicialState);
  const [date, setDate] = useState("");
  const [place, setPlace] = useState("");
  const [size, setSize] = useState("");
  const [isLoading, setIsLoading] = useState(false);


  const places = useAppSelector(getplace);

  useEffect(() => {
    getAllPlaces(dispatch);
  }, []);

  return (
    <div className={styles.container}>
      <div className={styles.title}>Nuevo Ingreso de Cajas Metálicas</div>
      <form
        onSubmit={(e) => addMetalBoxHandleSubmit(e, date, place, places, size, sizes, add, setIsLoading)}
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
            onChange={(e)=>{
              e.preventDefault()
              setPlace(e.target.value)
            }}
          >
            <option defaultValue={"-"}>-</option>
            {places?.map((p, i) => (
              <option key={i} value={p.initials}>
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
            onChange={(e) =>{
              e.preventDefault()
              setSize(e.target.value)
            }}
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
          <div>Unidades:</div>
          <input
            className={styles.input}
            type="number"
            id="units"
            name="units"
            value={add.units?add.units:""}
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
          <FormButton title={isLoading? <Loading/> :"Guardar"} loading={isLoading} disabled={isLoading}/>
        </div>
      </form>
    </div>
  );
};
export default AddMetalBox;
