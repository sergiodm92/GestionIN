import React, { useState, useEffect } from "react";
import { addGeneralInicialState, productsInicialState, productInicialState } from "../../../components/initialState/addGeneral/initialStates";
import { addProdHandleSubmit, handleAddChange, handleProductChange, productsGroupHandleSubmit } from "../../../components/functions/addProducts/functions";
import { AddBtn, FormButton } from "../../../components/Buttons";
import { getAllPlaces } from "../../../components/functions/places";
import { useAppDispatch, useAppSelector } from "../../../store/hooks";
import { getplace } from "../../../store/Slices/place";
import Loading from "../../../components/Loading/loading";
import { getAllProducts } from "../../../components/functions/products";
import { getProducts } from "../../../store/Slices/products";
import styles from "../styles/newAdd.module.css";
import { Products } from "../../../types/addsInterfaces";
import { getUser, setLoginData } from '../../../store/Slices/userSlice'

const AddProducts = () => {
  const dispatch = useAppDispatch();

  const [add, setAdd] = useState(addGeneralInicialState);
  const [productsGroup, setProductsGroup] = useState(productsInicialState);
  const [date, setDate] = useState("");
  const [place, setPlace] = useState("");
  const [product, setProduct] = useState(productInicialState);
  const [isLoading, setIsLoading] = useState(false);
  const [isLoadingGroup, setIsLoadingGroup] = useState(false);

  const places = useAppSelector(getplace);
  const products = useAppSelector(getProducts);
  const user = useAppSelector(getUser)

  add.responsible = user?.name

  useEffect(() => {
    getAllPlaces(dispatch);
    getAllProducts(dispatch);
  }, []);

  return (
    <div className={styles.container}>
      <div className={styles.title}>Nuevo Ingreso</div>
      <form
        onSubmit={(e) => addProdHandleSubmit(e, date, place, places, add, setAdd, setIsLoading)}
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
        <div className={styles.form}>
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
        <div className={styles.form}>
          <div>Productos:</div>
          <select
            id="product"
            className={styles.input}
            onChange={(e)=>{
              setProduct({
                ...product,
                name: e.target.value,
              });
            }
            }
          >
            <option defaultValue={"-"}>-</option>
            {products?.map((p, i) => (
              <option key={i} value={p.name}>
                {p.name}
              </option>
            ))}
          </select>
          <div>Unidades:</div>
          <input
            className={styles.input2}
            type="number"
            id="units"
            name="units"
            value={product.units ? product.units : ""}
            onChange={(e) => handleProductChange(e, product, setProduct)}
          />
        </div>
        <div className={styles.buttonContainer}>
            <AddBtn
              title={isLoadingGroup ? <Loading /> : "Agregar"}
              loading={isLoadingGroup}
              disabled={isLoadingGroup}
              onClick={(e: any) => productsGroupHandleSubmit(e, product, products, add, setProduct, setIsLoadingGroup)}
            />
          </div>
          {
            add.products.length ?
              add.products.map((p: Products, i) => {
                return (
                  <div key={i} className={styles.card}>
                    <div className={styles.cardRow}>
                      <div className={styles.cardTitle}>Nombre: </div>
                      <div className={styles.cardText}>{p.name}</div>
                    </div>
                    <div className={styles.cardRow}>
                      <div className={styles.cardTitle}>Unidades: </div>
                      <div className={styles.cardText}>{p.units}</div>
                    </div>
                  </div>
                )
              })
              : null
          }
        <div className={styles.buttonContainer}>
          <FormButton title={isLoading ? <Loading /> : "Guardar"} loading={isLoading} disabled={isLoading} />
        </div>
      </form>
    </div>
  );
};
export default AddProducts;
