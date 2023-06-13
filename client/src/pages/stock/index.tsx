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
    coffin: {
      type: "",
      size: "",
      color: "",
      metal_box: false
    }
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
          {filteredData.length > 0 ? (
          <div>
            <table className={styles.table}>
              <thead>
                <tr>
                  <th>ID</th>
                  <th>Tipo</th>
                  <th>Tamaño</th>
                  <th>Color</th>
                  <th>Caja Metálica</th>
                  <th>Unidades</th>
                </tr>
              </thead>
              
              <tbody>
                {filteredData?.map((s, i) => (
                  <tr key={i}>
                    <td>{s.id_coffin}</td>
                    <td>{s.coffin.type}</td>
                    <td>{s.coffin.size}</td>
                    <td>{s.coffin.color}</td>
                    <td>{s.coffin.metal_box ? "Si" : "No"}</td>
                    <td>{s.units}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
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



