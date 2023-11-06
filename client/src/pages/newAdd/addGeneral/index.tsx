import React, { useState, useEffect } from "react";
import { addGeneralInicialState, productsInicialState } from "../../../components/initialState/addGeneral/initialStates";
import { addGralHandleSubmit, handleAddChange, handleProductsChange } from "../../../components/functions/addGeneral/functions";
import { FormButton } from "../../../components/Buttons";
import styles from "../styles/newAdd.module.css";
import { getAllPlaces } from "../../../components/functions/places";
import { useAppDispatch, useAppSelector } from "../../../store/hooks";
import { getplace } from "../../../store/Slices/place";
import Loading from "../../../components/Loading/loading";
import { getAllProducts } from "../../../components/functions/products";
import { getProducts } from "../../../store/Slices/products";

const AddGeneral = () => {
  const dispatch = useAppDispatch();

  const [add, setAdd] = useState(addGeneralInicialState);
  const [productsGroup, setProductsGroup] = useState(productsInicialState);
  const [date, setDate] = useState("");
  const [place, setPlace] = useState("");
  const [product, setProduct] = useState("");
  const [isLoading, setIsLoading] = useState(false);

  const places = useAppSelector(getplace);
  const products = useAppSelector(getProducts);

  useEffect(() => {
    getAllPlaces(dispatch);
    getAllProducts(dispatch);
  }, []);

  return (
    <div className={styles.container}>
      <div className={styles.title}>Nuevo Ingreso</div>
      <form
        onSubmit={(e) => addGralHandleSubmit(e, date, place, places, add, setIsLoading)}
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
            onChange={(e) => {
              e.preventDefault()
              setPlace(e.target.value)
            }}
          >
            <option defaultValue={"-"}>-</option>
            {places.map((p, i) => (
              <option key={i} value={p.initials}>
                {p.name}
              </option>
            ))}
          </select>
        </div>
        <div className={styles.formRow}>
          <div>Productos:</div>
          <div>Nombre:</div>
          <select
            id="product"
            className={styles.input}
            onChange={(e) => {
              e.preventDefault()
              setProduct(e.target.value)
            }}
          >
            <option defaultValue={"-"}>-</option>
            {products?.map((p, i) => (
              <option key={i} value={p.id}>
                {p.name}
              </option>
            ))}
          </select>
          <div>Unidades:</div>
          <input
            className={styles.input}
            type="number"
            id="units"
            name="units"
            value={productsGroup.units ? productsGroup.units : ""}
            onChange={(e) => handleProductsChange(e, productsGroup, setProductsGroup)}
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

        <div className={styles.buttonContainer}>
          <FormButton title={isLoading ? <Loading /> : "Guardar"} loading={isLoading} disabled={isLoading} />
        </div>
      </form>
    </div>
  );
};
export default AddGeneral;
