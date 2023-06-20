import { useRouter } from "next/router"
import { useEffect, useRef, useState } from "react"
import  styles from "../styles/Adds.module.css" 
import { useAppDispatch, useAppSelector } from "../../../store/hooks";
import { getplace } from "../../../store/Slices/place";
import { getAllAddsGeneral } from "../../../components/functions/adds/functions";
import { getAllPlaces } from "../../../components/functions/places";
import Loading from "../../../components/Loading/loading";
import Card1 from "../../../components/Cards/Card1";
import { getAddsGeneral } from "../../../store/Slices/addsGeneralSlice";

const initialAddState = [
  {
    id: "",
    id_doc:"",
    product: "",
    date: 0,
    responsible: "",
    amount: 0,
    supplier: "",
    place: "",
  },
];

const AddsGeneral = () => {
  const router = useRouter();
  const dispatch = useAppDispatch();

  const [updateData, setUpdateData] = useState(initialAddState);
  const adds = useAppSelector(getAddsGeneral);
  const prevAdds = useRef(adds);
  const places = useAppSelector(getplace);

  useEffect(() => {
    getAllAddsGeneral(dispatch);
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
          <div></div>
          <div className={styles.title}>Ingresos: Generales</div>
          <div className={styles.subTitle}>
            <div className={styles.smallSpace}>Fecha</div>
            <div className={styles.bigSpace}>Producto</div>
            <div className={styles.smallSpace}>Cant</div>
          </div>
          <div className={styles.cardsContainer}>
            {adds.length > 0
              ? adds.map((add: any, i: any) => {
                  return (
                    <div className={styles.card} key={i}>
                      <Card1
                        onClick={() => router.push(`/adds/general/${add.id_doc}`)}
                        space1={new Date(add.date)
                          .toLocaleDateString("es")}
                        space2={add.product}
                        space3={add.amount}
                      />
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
export default AddsGeneral;