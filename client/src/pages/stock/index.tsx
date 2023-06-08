import { useEffect, useRef, useState } from "react";
import { getCoffinStock } from "../../store/Slices/coffinStockSlice";
import { useAppDispatch, useAppSelector } from "../../store/hooks";
import { getAllCoffinStock } from "../../components/functions/stock";
import styles from "./styles/stock.module.css";
import Loading from "../../components/Loading/loading";

const initialData = [
  {
    id_coffin: "",
    place: "",
    units: 0,
    coffin: {}
  }
];

const AllStock = () => {
  const [updateData, setUpdateData] = useState(initialData);
  const [searchId, setSearchId] = useState("");
  const dispatch = useAppDispatch();
  const stock = useAppSelector(getCoffinStock);
  const prevStock = useRef(stock);

  useEffect(() => {
    getAllCoffinStock(dispatch);
  }, []);

  useEffect(() => {
    if (prevStock.current !== stock) {
      setUpdateData(stock);
      prevStock.current = stock;
    }
  }, [stock]);

  const filteredData = updateData.filter((s) =>
    s.id_coffin.toLowerCase().includes(searchId.toLowerCase())
  );

  return (
    <div className={styles.container}>
      {updateData.length === 0 ? (
        <div className={styles.noStock}>No hay Stock disponible</div>
      ) : updateData[0].id_coffin === "" ? (
        <Loading />
      ) : (
        <>
          <div className={styles.title}>Stock total disponible</div>
          <div className={styles.searchContaier}>
            <input
              type="text"
              placeholder="🔎"
              value={searchId}
              className={styles.search}
              onChange={(e) => setSearchId(e.target.value)}
            />
          </div>
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
          {filteredData.length > 0 ? (
            filteredData.map((s: any, i: any) => {
              return (
                <div className={styles.items} key={i}>
                  <div
                    className={styles.subItems}
                    style={{ borderLeft: "none" }}
                  >
                    {s.id_coffin}
                  </div>
                  <div className={styles.subItems}>{s.coffin.type}</div>
                  <div className={styles.subItems}>{s.coffin.size}</div>
                  <div className={styles.subItems}>{s.coffin.color}</div>
                  <div className={styles.subItems}>
                    {s.coffin.metal_box ? "Si" : "No"}
                  </div>
                  <div className={styles.subItems} style={s.units>0?{color:"black"}:{color: "red"}}>{s.units}</div>
                </div>
              );
            })
          ) : (
            <div className={styles.noStock}>
              No hay Stock con ese ID
            </div>
          )}
        </>
      )}
    </div>
  );
};

export default AllStock;



