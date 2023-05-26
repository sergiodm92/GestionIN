import { useEffect, useRef, useState } from "react";
import { getStock } from "../../store/Slices/stockSlice";
import { useAppDispatch, useAppSelector } from "../../store/hooks";
import { getAllStock } from "./functions";
import styles from "./styles/stock.module.css";
import Loading from "../../components/Loading/loading";

const initialData = [{
  id_coffin: "",
  place: "",
  units: 0,
  coffin: {}
}]

const AllStock = () => {
  const [updateData, setUpdateData] = useState(initialData);
  const dispatch = useAppDispatch();
  const stock = useAppSelector(getStock);
  const prevStock = useRef(stock);

  useEffect(() => {
    getAllStock(dispatch);
  }, []);

  useEffect(() => {
    if (prevStock.current !== stock) {
      setUpdateData(stock);
      prevStock.current = stock;
    }
  }, [stock]);

  return (
    <div className={styles.container}>
      {updateData[0].id_coffin === "" ? (
        <Loading />
      ) : updateData.length > 0 ? (
        <>
          <div className={styles.title}>Stock Total</div>
          <div className={styles.subTitle}>
            <div
              className={styles.subTitleItems}
              style={{ borderLeft: "none" }}
            >
              ID
            </div>
            <div className={styles.subTitleItems}>Tipo</div>
            <div className={styles.subTitleItems}>Tamaño</div>
            <div className={styles.subTitleItems}>Color</div>
            <div className={styles.subTitleItems}>Caja Metálica</div>
            <div className={styles.subTitleItems}>Unidades</div>
          </div>
          {updateData?.map((s: any) => {
            return (
              <div className={styles.items}>
                <div className={styles.subItems} style={{ borderLeft: "none" }}>
                  {s.id_coffin}
                </div>
                <div className={styles.subItems}>{s.coffin.type}</div>
                <div className={styles.subItems}>{s.coffin.size}</div>
                <div className={styles.subItems}>{s.coffin.color}</div>
                <div className={styles.subItems}>
                  {s.coffin.metal_box ? "Si" : "No"}
                </div>
                <div className={styles.subItems}>{s.units}</div>
              </div>
            );
          })}
        </>
      ) : (
        <div className={styles.noStock}>No hay Stock disponible</div>
      )}
    </div>
  );
};
export default AllStock;