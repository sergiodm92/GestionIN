import { GetServerSideProps } from "next";
import { useAppDispatch, useAppSelector } from "../../../store/hooks";
import { getCoffinStock } from "../../../store/Slices/coffinStockSlice";
import React, { useEffect, useRef, useState } from "react";
import {
  getCoffinStockByPlace,
  getGeneralStockByPlace,
  getMetalBoxStockByPlace,
} from "../../../components/functions/stock";
import styles from "../styles/stock.module.css";
import Loading from "../../../components/Loading/loading";
import { getGeneralStock } from "../../../store/Slices/generalStockSlice";
import { getmetalBoxStock } from "../../../store/Slices/metalBoxStockSlice";

export const getServerSideProps: GetServerSideProps = async (context) => {
  const { params } = context;

  if (!params) {
    return {
      notFound: true,
    };
  }

  const { place } = params;

  return {
    props: {
      place,
    },
  };
};

const initialData = [
  {
    id_coffin: "",
    place: "",
    units: 0,
    coffin: {
      type: "",
      size: "",
      color: "",
      metal_box: false,
    },
  },
];

const Stock = ({ place }: { place: string }) => {
  const [updateData, setUpdateData] = useState(initialData);
  const [searchId, setSearchId] = useState("");
  const [searchProduct, setSearchProduct] = useState("");
  const [searchSize, setSearchSize] = useState("");

  const dispatch = useAppDispatch();

  const stock = useAppSelector(getCoffinStock);
  const generalStock = useAppSelector(getGeneralStock);
  const MBStock = useAppSelector(getmetalBoxStock);

  const prevStock = useRef(stock);

  useEffect(() => {
    getCoffinStockByPlace(dispatch, place);
    getGeneralStockByPlace(dispatch, place);
    getMetalBoxStockByPlace(dispatch, place);
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
  const filteredGeneralData = generalStock.filter((s) =>
    s.product.toLowerCase().includes(searchProduct.toLowerCase())
  );
  const filteredMBData = MBStock.filter((s) =>
    s.size.toLowerCase().includes(searchSize.toLowerCase())
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

          <>
            <div className={styles.subTitle}>Ataúdes</div>
            <div className={styles.tableContainer}>
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
                    {filteredData.map((s, i) => (
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
              ) :  <p>No hay items disponibles</p>}
            </div>
          </>

          <>
            <div className={styles.subTitle}>Cajas Metálicas</div>
            <div className={styles.tableContainer}>
              <div className={styles.searchContaier}>
                <input
                  type="text"
                  placeholder="🔎"
                  value={searchSize}
                  className={styles.search}
                  onChange={(e) => setSearchSize(e.target.value)}
                />
              </div>
              {filteredMBData.length > 0 ? (
                <table className={styles.table}>
                  <thead>
                    <tr>
                      <th>Lugar</th>
                      <th>Tamaño</th>
                      <th>Unidades</th>
                    </tr>
                  </thead>
                  <tbody>
                    {filteredMBData.map((s, i) => (
                      <tr key={i}>
                        <td>{s.place}</td>
                        <td>{s.size}</td>
                        <td>{s.units}</td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              ) :  <p>No hay items disponibles</p>}
            </div>
          </>

          <>
            <div className={styles.subTitle}>Otros</div>
            <div className={styles.tableContainer}>
              <div className={styles.searchContaier}>
                <input
                  type="text"
                  placeholder="🔎"
                  value={searchProduct}
                  className={styles.search}
                  onChange={(e) => setSearchProduct(e.target.value)}
                />
              </div>
              {filteredGeneralData.length > 0 ? (
                <table className={styles.table}>
                  <thead>
                    <tr>
                      <th>Lugar</th>
                      <th>Tamaño</th>
                      <th>Cant</th>
                    </tr>
                  </thead>
                  <tbody>
                    {filteredGeneralData.map((s, i) => (
                      <tr key={i}>
                        <td>{s.place}</td>
                        <td>{s.product}</td>
                        <td>{s.amount}</td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              ) :  <p>No hay items disponibles</p>}
            </div>
          </>
        </>
      )}
    </div>
  );
};
export default Stock;
