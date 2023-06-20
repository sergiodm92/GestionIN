import { useRouter } from "next/router"
import { useEffect, useRef, useState } from "react"
import  styles from "../styles/Adds.module.css" 
import { useAppDispatch, useAppSelector } from "../../../store/hooks";
import { getAllAddsMetalBox } from "../../../components/functions/adds/functions";
import Loading from "../../../components/Loading/loading";
import Card1 from "../../../components/Cards/Card1";
import { getAddsMetalBox } from "../../../store/Slices/addsMetalBoxSlice";

const initialAddState = [
  {
    id: "",
    id_doc: "",
    size: "",
    date: 0,
    responsible: "",
    units: 0,
    supplier: "",
    place: "",
  },
];

const AddsMetalBox = () => {
  const router = useRouter();
  const dispatch = useAppDispatch();

  const [updateData, setUpdateData] = useState(initialAddState);
  const adds = useAppSelector(getAddsMetalBox);
  const prevAdds = useRef(adds);

  useEffect(() => {
    getAllAddsMetalBox(dispatch);
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
          <div className={styles.title}>Ingresos: Cajas Metálicas</div>
          <div className={styles.subTitle}>
            <div className={styles.smallSpace}>Fecha</div>
            <div className={styles.bigSpace}>Tamaño</div>
            <div className={styles.smallSpace}>Cant</div>
          </div>
          <div className={styles.cardsContainer}>
            {adds.length > 0
              ? adds.map((add: any, i: any) => {
                  return (
                    <div className={styles.card} key={i}>
                      <Card1
                        onClick={() => router.push(`/adds/metal_box/${add.id_doc}`)}
                        space1={new Date(add.date)
                          .toLocaleDateString("es")}
                        space2={add.size}
                        space3={add.units}
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
export default AddsMetalBox;