import { GetServerSideProps } from "next";
import { useAppDispatch, useAppSelector } from "../../../store/hooks";
import React, { useEffect, useRef, useState } from "react";
import {
  getCoffinStockByPlace,
  getMboxStockByPlace,
  getProductsStockByPlace,
} from "../../../components/functions/stock";
import Loading from "../../../components/Loading/loading";
import { getCoffinStock } from "../../../store/Slices/coffinStockSlice";
import { getProductsStock } from "../../../store/Slices/productsStockSlice";
import { getmetalBoxStock } from "../../../store/Slices/metalBoxStockSlice";
import styles from "../styles/stock.module.css";
import { SmallBtn } from "../../../components/Buttons";
import { useRouter } from "next/router";

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
    id: "",
    units: 0,
    type: "",
    size: "",
    color: "",
    mbox: false,
  },
];

const Stock = ({ place }: { place: string }) => {
  const [updateData, setUpdateData] = useState(initialData);
  const [searchId, setSearchId] = useState("");
  const [searchProduct, setSearchProduct] = useState("");
  const [searchSize, setSearchSize] = useState("");
  const [total, setTotal] = useState(0);
  const [isStock, setIsStock] = useState(true);

  const dispatch = useAppDispatch();
  const route = useRouter();

  const stock = useAppSelector(getCoffinStock);
  const productsStock = useAppSelector(getProductsStock);
  const MBStock = useAppSelector(getmetalBoxStock);

  const prevStock = useRef(stock);

  useEffect(() => {
    getCoffinStockByPlace(dispatch, place, setIsStock);
    getProductsStockByPlace(dispatch, place);
    getMboxStockByPlace(dispatch, place);
  }, []);

  useEffect(() => {
    if (prevStock.current !== stock) {
      setUpdateData(stock);
      prevStock.current = stock;
    }
  }, [stock]);
  const filteredData = updateData.filter((s) =>
    s.id.toLowerCase().includes(searchId.toLowerCase())
  );
  const filteredProductsData = productsStock.filter((s) =>
    s.name.toLowerCase().includes(searchProduct.toLowerCase())
  );
  const filteredMBData = MBStock.filter((s) =>
    s.size.toLowerCase().includes(searchSize.toLowerCase())
  );
  let totalFilterData = 0;
  filteredData.forEach((d) => {
    totalFilterData += d.units;
  });
  let totalFilterMBData = 0;
  filteredMBData.forEach((d) => {
    totalFilterMBData += d.units;
  });
  let totalFilterProductsData = 0;
  filteredProductsData.forEach((d) => {
    totalFilterProductsData += d.units;
  });

  return (
    <div className={styles.container}>
      {updateData.length === 0 ? (
        <div className={styles.noStock}>No hay Stock disponible</div>
      ) : updateData[0].id === "" ? (
        <Loading />
      ) : (
        <>
          <div className={styles.title}>Stock disponible en {place}</div>

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
                    {filteredData.map((d, i) => (
                      <tr key={i}>
                        <td>{d.id}</td>
                        <td>{d.type}</td>
                        <td>{d.size}</td>
                        <td>{d.color}</td>
                        <td>{d.mbox ? "Si" : "No"}</td>
                        <td>{d.units}</td>
                      </tr>
                    ))}
                    <tr key={"total"}>
                      <td></td>
                      <td></td>
                      <td></td>
                      <td></td>
                      <td>Total</td>
                      <td>{totalFilterData || 0}</td>
                    </tr>
                  </tbody>
                </table>
              ) : (
                <p>No hay items disponibles</p>
              )}
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
                    <tr key={"total"}>
                      <td></td>
                      <td>Total</td>
                      <td>{totalFilterMBData || 0}</td>
                    </tr>
                  </tbody>
                </table>
              ) : (
                <p>No hay items disponibles</p>
              )}
            </div>
          </>

          <>
            <div className={styles.subTitle}>Productos</div>
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
              {filteredProductsData.length > 0 ? (
                <table className={styles.table}>
                  <thead>
                    <tr>
                      <th>id</th>
                      <th>Nombre</th>
                      <th>Cant</th>
                    </tr>
                  </thead>
                  <tbody>
                    {filteredProductsData.map((s, i) => (
                      <tr key={i}>
                        <td>{s.id}</td>
                        <td>{s.name}</td>
                        <td>{s.units}</td>
                      </tr>
                    ))}
                    <tr key={"total"}>
                      <td></td>
                      <td>Total</td>
                      <td>{totalFilterProductsData || 0}</td>
                    </tr>
                  </tbody>
                </table>
              ) : (
                <p>No hay items disponibles</p>
              )}
            </div>
          </>
          <SmallBtn
            title={"Generar PDF"}
            onClick={() => route.push(`/stock/pdf/${place}`)}
          />
        </>
      )}
    </div>
  );
};
export default Stock;
