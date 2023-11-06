import { useEffect, useState } from "react";
import { FormButton } from "../../../components/Buttons";
import { handleSubmit } from "../../../components/functions/products";
import { useAppDispatch, useAppSelector } from "../../../store/hooks";
import styles from "../styles/places.module.css";
import Loading from "../../../components/Loading/loading";
import { getAllProducts } from "../../../components/functions/products";
import { getProducts } from "../../../store/Slices/products";

const initialProducteState = {
  id:"",
  name: "",
};

const NewProduct = () => {
  const [product, setProduct] = useState(initialProducteState);
  const [isLoading, setIsLoading] = useState(false);

  const dispatch = useAppDispatch();
  const products = useAppSelector(getProducts);

  useEffect(() => {
    getAllProducts(dispatch);
  }, []);

  const handleChange = (e: any) => {
    e.preventDefault();
    setProduct({
      ...product,
      [e.target.name]: e.target.value,
    });
  };

  return (
    <div className={styles.container}>
      <form onSubmit={(e)=>handleSubmit(e, products, product, setIsLoading)} className={styles.form}>
        <div className={styles.title}>Nuevo Producto:</div>
        <div className={styles.formRow}>
          <div>Nombre del Producto:</div>
          <input
            type="text"
            id="name"
            name="name"
            value={product.name}
            onChange={handleChange}
            placeholder="Vino"
            className={styles.input}
            style={{width: "calc(100% - 146px)"}}
          />
        </div>
        <FormButton title={isLoading? <Loading/> :"Guardar"} loading={isLoading} disabled={isLoading}/>
      </form>
    </div>
  );
};
export default NewProduct;
