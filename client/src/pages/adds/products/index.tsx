import { useRouter } from "next/router"
import { useEffect, useRef, useState } from "react"
import  styles from "../styles/Adds.module.css" 
import { useAppDispatch, useAppSelector } from "../../../store/hooks";
import { getAllAddsProducts } from "../../../components/functions/adds/functions";
import Loading from "../../../components/Loading/loading";
import Card1 from "../../../components/Cards/Card1";
import { getAddsProducts } from "../../../store/Slices/addsProductsSlice";

const initialAddState = [
  {
    id: "",
    products: [{id:"", name:"", units:0}],
    date: 0,
    responsible: "",
    place: "",
    status:""
  },
];

const AddsGeneral = () => {
  const router = useRouter();
  const dispatch = useAppDispatch();

  const [updateData, setUpdateData] = useState(initialAddState);
  const adds = useAppSelector(getAddsProducts);
  const prevAdds = useRef(adds);

  useEffect(() => {
    getAllAddsProducts(dispatch);
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
          <div className={styles.title}>Ingresos: Productos</div>
          <div className={styles.subTitle}>
            <div className={styles.smallSpace}>Fecha</div>
            <div className={styles.bigSpace}>Responsable</div>
            <div className={styles.smallSpace}>Estado</div>
          </div>
          <div className={styles.cardsContainer}>
            {adds.length > 0
              ? adds.map((add: any, i: any) => {
                  return (
                    <div className={styles.card} key={i}>
                      <Card1
                        onClick={() => router.push(`/adds/products/${add.id_doc}`)}
                        space1={new Date(add.date)
                          .toLocaleDateString("es")}
                        space2={add.responsible}
                        space3={add.status}
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