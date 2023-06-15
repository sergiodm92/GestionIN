import { useEffect, useState } from "react";
import { FormButton } from "../../../components/Buttons";
import { getAllPlaces, handleSubmit } from "../../../components/functions/places";
import { useAppDispatch, useAppSelector } from "../../../store/hooks";
import { getplace } from "../../../store/Slices/place";
import styles from "../styles/places.module.css";

const initialPlaceState = {
  name: "",
  initials: "",
};

const NewPlace = () => {
  const [place, setPlace] = useState(initialPlaceState);

  const dispatch = useAppDispatch();
  const places = useAppSelector(getplace);

  useEffect(() => {
    getAllPlaces(dispatch);
  }, []);

  const handleChange = (e: any) => {
    e.preventDefault();
    setPlace({
      ...place,
      [e.target.name]: e.target.value,
    });
  };

  return (
    <div className={styles.container}>
      <form onSubmit={(e)=>handleSubmit(e, places, place)} className={styles.form}>
        <div className={styles.title}>Nuevo Depósito:</div>
        <div className={styles.formRow}>
          <div>Nombre del Lugar:</div>
          <input
            type="text"
            id="name"
            name="name"
            value={place.name}
            onChange={handleChange}
            placeholder="San Pedro"
            className={styles.input}
            style={{width: "calc(100% - 146px)"}}
          />
        </div>
        <div className={styles.formRow}>
          <div>Iniciales:</div>
          <input
            type="text"
            id="initials"
            name="initials"
            value={place.initials}
            onChange={handleChange}
            placeholder="SP"
            className={styles.input}
            style={{width: "100%"}}
          />
        </div>
        <FormButton title="Guardar" loading={true} />
      </form>
    </div>
  );
};
export default NewPlace;
