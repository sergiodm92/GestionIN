'use client'
import { Formik, Field } from "formik";
import { useState, useEffect, useRef } from "react";
import { useAppDispatch, useAppSelector } from "../../../store/hooks";
import { getCoffinStockByPlace } from "../../../components/functions/stock";
import { getCoffinStock } from "../../../store/Slices/coffinStockSlice";
import Loading from "../../../components/Loading/loading";
import styles from "../styles/transfer.module.css";
import { getAllPlaces } from "../../../components/functions/places";
import { getplace } from "../../../store/Slices/place";
import { getUser } from "../../../store/Slices/userSlice";
import { postCoffinTransferApi } from "../../../services/transferApi";
import { createToast } from "../../../components/Notifications/Notifications";

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

const NewTransferStepOne = () => {
  const [updateData, setUpdateData] = useState(initialData);
  const [step, setStep] = useState(1);
  const [originPlace, setOriginPlace] = useState('');
  const [searchId, setSearchId] = useState("");
  const [isStock, setIsStock] = useState(true);
  const [isLading, setIsLoading] = useState(false);

  const dispatch = useAppDispatch();

  const stock = useAppSelector(getCoffinStock);
  const user = useAppSelector(getUser);

  const prevStock = useRef(stock);
  const places = useAppSelector(getplace)

  useEffect(() => {
    getAllPlaces(dispatch)
  }, [])

  useEffect(() => {
    getCoffinStockByPlace(dispatch, originPlace, setIsStock);
  }, [originPlace]);

  useEffect(() => {
    if (prevStock.current !== stock) {
      setUpdateData(stock);
      prevStock.current = stock;
    }
  }, [stock]);

  const date = new Date()
  const initialValues = {
    date: date.getTime(),
    add_id: "",
    coffin_group_id: "",
    place_origin: "",
    place_destiny: "",
    responsible: "",
    coffin: {
      id: "",
      units: 1,
      size: "",
      color: "",
      type: "",
      mbox: false,
      supplier: "",
    },
  };
  const filteredData = updateData.filter((s) =>
    s.id.toLowerCase().includes(searchId.toLowerCase())
  );
  const handleNextTwo = (values: any) => {
    setStep(2)
    setOriginPlace(values.place_origin)
  }
  const handleNextThree = (d: any, values: any) => {
    setStep(3)
    setIsLoading(true)
    values.coffin.id = d.id
    values.coffin.size = d.size
    values.coffin.type = d.type
    values.coffin.color = d.color
    values.coffin.mbox = d.mbox
    values.coffin.supplier = d.supplier
    values.coffin_group_id = d.id
    values.add_id = d.id_add
    values.responsible = user.name
    setIsLoading(false)
  }


  const handleSubmit = async (values: any) => {
    setIsLoading(true)
    try {
      const response = await postCoffinTransferApi(values);
      if (response.data.status === "ok") {
        setStep(4)
        createToast("success", "Transferencia realizada con exito");
      }
      else {
        createToast("warning", "ocurrio un error, vuelva a intentar");
      }
    } catch (error) {
      createToast("warning", "ocurrio un error, vuelva a intentar");
      console.error(error);
    }
    setTimeout(() => {
      setIsLoading(false)
    }, 5000)
  };

  return (
    <section>
      <Formik initialValues={initialValues} onSubmit={handleSubmit}>
        {({ values, handleSubmit }) => (
          <form onSubmit={handleSubmit}>
            {
              step === 1 && (
                <div className={styles.container}>
                  <div className={styles.formGroup}>
                    <label htmlFor="place_origin">Origen</label>
                    <Field
                      as="select"
                      name="place_origin"
                      id="place_origin"
                      className={styles.formControl}
                    >
                      <option value="" label="Selecciona un origen" />
                      {places.map((p, i) => (
                        <option key={i} value={p.name} label={p.name} />
                      ))}
                    </Field>
                  </div>
                  <div className={styles.formGroup}>
                    <label htmlFor="place_destiny">Destino</label>
                    <Field
                      as="select"
                      name="place_destiny"
                      id="place_destiny"
                      className={styles.formControl}
                    >
                      <option value="" label="Selecciona el destino" />
                      {places.map((p, i) => (
                        <option key={i} value={p.name} label={p.name} />
                      ))}
                    </Field>
                  </div>
                  <div className={styles.formGroup}>
                    <button className={styles.nextBtn} onClick={() => { handleNextTwo(values) }}>
                      Siguiente
                    </button>
                  </div>
                </div>)}
            {
              step === 2 && (
                <div className={styles.container}>
                  {updateData.length === 0 ? (
                    <div className={styles.noStock}>No hay Stock disponible en {originPlace}</div>
                  ) : updateData[0].id === "" ? (
                    <Loading />
                  ) : (
                    <>
                      <div className={styles.title}>Stock disponible en {originPlace}</div>

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
                                  <th></th>
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
                                    <td onClick={() => handleNextThree(d, values)}>Transferir</td>
                                  </tr>
                                ))}
                              </tbody>
                            </table>
                          ) : <p>No hay items disponibles</p>}
                        </div>
                      </>
                    </>
                  )}
                </div>)}
            {
              step === 3 && (
                <div className={styles.container}>
                  {isLading ? <Loading />
                    : (
                      <>
                        <div className={styles.title}>Transferir {values.coffin.units} ataúd {values.coffin.type} {values.coffin.size} {values.coffin.color} {values.coffin.mbox ? "con caja metálica" : "sin caja metálica"} de {originPlace} a {values.place_destiny}</div>
                        <div className={styles.formGroup}>
                          <button type="submit" className={styles.nextBtn}>
                            Transferir
                          </button>
                        </div>
                      </>
                    )
                  }
                </div>
              )
            }
            {step === 4 && (
              <div className={styles.container}>
                {isLading ? <Loading />
                  : (<div className={styles.title}>Transferencia realizada con exito</div>)}
              </div>
            )}
          </form>
        )}
      </Formik>
    </section>
  );
};

export default NewTransferStepOne