import { useRouter } from "next/router";
import { useAppDispatch, useAppSelector } from "../../store/hooks";
import { useEffect, useRef, useState } from "react";
import { getAllCoffinTransfers } from "../../components/functions/transfers";
import { getCoffinTransfers } from "../../store/Slices/transfersSlice";
import styles from "./styles/transfer.module.css";
import Loading from "../../components/Loading/loading";
import Card2 from "../../components/Cards/Card2";

let initialValues = [
  {
    date: 0,
    add_id: "",
    coffin_group_id: "",
    place_origin: "",
    place_destiny: "",
    responsible: "",
    coffin: {
      id: "",
      supplier: "",
      units: 0,
      type: "",
      size: "",
      color: "",
      mbox: false,
    },
  }
];

const Transfer = () => {
  const router = useRouter();
  const dispatch = useAppDispatch();
  const [updateData, setUpdateData] = useState(initialValues);
  const transfers = useAppSelector(getCoffinTransfers);
  const prevAdds = useRef(transfers);

  useEffect(() => {
    getAllCoffinTransfers(dispatch);
  }, []);

  useEffect(() => {
    if (prevAdds.current !== transfers) {
      setUpdateData(transfers);
      prevAdds.current = transfers;
    }
  }, [transfers]);

  return (
    <section className={styles.container}>
      {updateData.length === 0 ? (
        <div className={styles.noAdds}>No hay datos para mostrar</div>
      ) : updateData[0].add_id === "" ? (
        <Loading />
      ) : (
        <>
          <div className={styles.title}>Transferecias</div>
          <div className={styles.subTitle}>
            <div className={styles.smallSpace}>Fecha</div>
            <div className={styles.smallSpace}>Origen</div>
            <div className={styles.smallSpace}>Destino</div>
            <div className={styles.smallSpace}>ID</div>
          </div>
          <div className={styles.cardsContainer}>
            {updateData.length > 0
              ? updateData.map((t: any, i: any) => {
                  return (
                    <div className={styles.card} key={i}>
                      <Card2
                        onClick={() =>
                          router.push(`/`)
                        }
                        space1={new Date(t.date).toLocaleDateString("es")}
                        space2={t.place_origin}
                        space3={t.place_destiny}
                        space4={t.coffin_group_id}
                      />
                    </div>
                  );
                })
              : null}
          </div>
        </>
      )}
    </section>
  );
};
export default Transfer;
