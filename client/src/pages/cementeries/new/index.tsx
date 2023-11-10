import { useEffect, useState } from "react";
import { FormButton } from "../../../components/Buttons";
import { useAppDispatch, useAppSelector } from "../../../store/hooks";
import styles from "../styles/places.module.css";
import Loading from "../../../components/Loading/loading";
import { getCementery } from "../../../store/Slices/cementery";
import {
  getAllCementeries,
  handleCementeryPlace,
  handleCementeryType,
  handleSubmit,
} from "../../../components/functions/cementeries";
import { getAllPlaces } from "../../../components/functions/places";
import { getplace } from "../../../store/Slices/place";
import { cementeryType } from "../../../components/arrays";

const initialCementeryState = {
  name: "",
  place: "",
  type: "",
};

const NewCementery = () => {
  const [cementery, setCementery] = useState(initialCementeryState);
  const [isLoading, setIsLoading] = useState(false);

  const dispatch = useAppDispatch();
  const cementeries = useAppSelector(getCementery);
  const places = useAppSelector(getplace);

  useEffect(() => {
    getAllCementeries(dispatch);
    getAllPlaces(dispatch);
  }, []);

  const handleChange = (e: any) => {
    e.preventDefault();
    setCementery({
      ...cementery,
      [e.target.name]: e.target.value,
    });
  };

  return (
    <div className={styles.container}>
      <form
        onSubmit={(e) => handleSubmit(e, cementeries, cementery, setIsLoading)}
        className={styles.form}
      >
        <div className={styles.title}>Nuevo Cementerio:</div>
        <div className={styles.formRow}>
          <div>Nombre del Cementerio:</div>
          <input
            type="text"
            id="name"
            name="name"
            value={cementery.name}
            onChange={handleChange}
            placeholder="El Salvador"
            className={styles.input}
            style={{ width: "calc(100% - 146px)" }}
          />
        </div>
        <div className={styles.formRow}>
          <div>Lugar:</div>
          <select
            id="place"
            className={styles.input}
            onChange={(e) => handleCementeryPlace(e, cementery, setCementery)}
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
          <div>Tipo de Cementerio:</div>
          <select
            id="place"
            className={styles.input}
            onChange={(e) => handleCementeryType(e, cementery, setCementery)}
          >
            <option defaultValue={"-"}>-</option>
            {cementeryType.map((t, i) => (
              <option key={i} value={t}>
                {t}
              </option>
            ))}
          </select>
        </div>
        <FormButton
          title={isLoading ? <Loading /> : "Guardar"}
          loading={isLoading}
          disabled={isLoading}
        />
      </form>
    </div>
  );
};
export default NewCementery;
