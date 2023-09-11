import { useRouter } from "next/router"
import { useEffect, useRef, useState } from "react"
import  styles from "../styles/Adds.module.css" 
import { useAppDispatch, useAppSelector } from "../../../store/hooks";
import { getAddsCoffin } from "../../../store/Slices/addsCoffinSlice";
import { getplace } from "../../../store/Slices/place";
import { getAllAddsCoffin } from "../../../components/functions/adds/functions";
import { getAllPlaces } from "../../../components/functions/places";
import Loading from "../../../components/Loading/loading";
import Card1 from "../../../components/Cards/Card1";
import { decomposeId } from "../../../components/functions";

const initialAddState = [
  {
    id: "",
    id_coffin: "",
    date: 0,
    responsible: "",
    units: 0,
    supplier: "",
    place: "",
  },
];

const AddsCoffin = () => {
  const router = useRouter();
  const dispatch = useAppDispatch();

  const [updateData, setUpdateData] = useState(initialAddState);
  const adds = useAppSelector(getAddsCoffin);
  const prevAdds = useRef(adds);
  const places = useAppSelector(getplace);

  useEffect(() => {
    getAllAddsCoffin(dispatch);
    getAllPlaces(dispatch);
  }, []);

  useEffect(() => {
    if (prevAdds.current !== adds) {
      setUpdateData(adds);
      prevAdds.current = adds;
    }
  }, [adds]);

  return (
    <div className={styles.container}>
      {updateData.length === 0 ? (
        <div className={styles.noAdds}>No hay datos para mostrar</div>
      ) : updateData[0].id === "" ? (
        <Loading />
      ) : (
        <>
          <div className={styles.title}>Ingresos</div>
          <div className={styles.subTitle}>
            <div className={styles.smallSpace}>Fecha</div>
            <div className={styles.bigSpace}>Ataud</div>
            <div className={styles.smallSpace}>Cant</div>
          </div>
          <div className={styles.cardsContainer}>
            {adds.length > 0
              ? adds.map((add: any, i: any) => {
                  return (
                    <div className={styles.card} key={i}>
                      <Card1
                        onClick={() => router.push(`/adds/coffin/${add.id}`)}
                        space1={new Date(add.date)
                          .toLocaleDateString("es")}
                        space2={add.id_coffin}
                        space3={add.units}
                      />
                      <div className={styles.cardHover}>
                        <pre>{decomposeId(add.id_coffin, places)}</pre>
                      </div>
                    </div>
                  );
                })
              : null}
          </div>
        </>
      )}
    </div>
  );
};
export default AddsCoffin;