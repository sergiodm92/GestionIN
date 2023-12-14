"use client";
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
import { FormButton, SmallBtn } from "../../../components/Buttons";
import { useRouter } from "next/router";

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
  const [originPlace, setOriginPlace] = useState("");
  const [searchId, setSearchId] = useState("");
  const [isStock, setIsStock] = useState(true);
  const [isLoading, setIsLoading] = useState(false);

  const dispatch = useAppDispatch();

  const router = useRouter();

  const stock = useAppSelector(getCoffinStock);
  const user = useAppSelector(getUser);

  const prevStock = useRef(stock);
  const places = useAppSelector(getplace);

  useEffect(() => {
    getAllPlaces(dispatch);
  }, []);

  useEffect(() => {
    getCoffinStockByPlace(dispatch, originPlace, setIsStock);
  }, [originPlace]);

  useEffect(() => {
    if (prevStock.current !== stock) {
      setUpdateData(stock);
      prevStock.current = stock;
    }
  }, [stock]);

  const date = new Date();
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
    setStep(2);
    setOriginPlace(values.place_origin);
  };
  const handleNextThree = (d: any, values: any) => {
    setStep(3);
    setIsLoading(true);
    values.coffin.id = d.id;
    values.coffin.size = d.size;
    values.coffin.type = d.type;
    values.coffin.color = d.color;
    values.coffin.mbox = d.mbox;
    values.coffin.supplier = d.supplier;
    values.coffin_group_id = d.id;
    values.add_id = d.id_add;
    values.responsible = user.name;
    setIsLoading(false);
  };

  const handleSubmit = async (values: any) => {
    setIsLoading(true);
    try {
      const response = await postCoffinTransferApi(values);
      if (response.data.status === "ok") {
        setStep(4);
        createToast("success", "Transferencia realizada con exito");
      } else {
        createToast("warning", "ocurrio un error, vuelva a intentar");
      }
    } catch (error) {
      createToast("warning", "ocurrio un error, vuelva a intentar");
      console.error(error);
    }
    setIsLoading(false);
  };

  return (
    <section className={styles.container}>
      <Formik initialValues={initialValues} onSubmit={handleSubmit}>
        {({ values, handleSubmit }) => (
          <form onSubmit={handleSubmit}>
            {step === 1 && (
              <div className={styles.formContainer}>
                <div className={styles.form}>
                  <label htmlFor="place_origin" className={styles.subTitle2}>Origen</label>
                  <Field
                    as="select"
                    name="place_origin"
                    id="place_origin"
                    className={styles.input}
                  >
                    <option value="" label="Selecciona un origen" />
                    {places.map((p, i) => (
                      <option key={i} value={p.name} label={p.name} />
                    ))}
                  </Field>
                </div>
                <div className={styles.form}>
                  <label htmlFor="place_destiny" className={styles.subTitle2}>Destino</label>
                  <Field
                    as="select"
                    name="place_destiny"
                    id="place_destiny"
                    className={styles.input}
                  >
                    <option value="" label="Selecciona el destino" />
                    {places.map((p, i) => (
                      <option key={i} value={p.name} label={p.name} />
                    ))}
                  </Field>
                </div>
                <div className={styles.form}>
                  <SmallBtn
                    onClick={() => {
                      handleNextTwo(values);
                    }}
                    title="Siguiente"
                  />
                </div>
              </div>
            )}
            {step === 2 && (
              <div className={styles.container}>
                {updateData.length === 0 ? (
                  <div className={styles.noStock}>
                    No hay Stock disponible en {originPlace}
                  </div>
                ) : updateData[0].id === "" ? (
                  <Loading />
                ) : (
                  <>
                    <div className={styles.title}>
                      Stock disponible en {originPlace}
                    </div>

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
                                  <td
                                    onClick={() => handleNextThree(d, values)}
                                    className={styles.link}
                                  >
                                    Transferir
                                  </td>
                                </tr>
                              ))}
                            </tbody>
                          </table>
                        ) : (
                          <p>No hay items disponibles</p>
                        )}
                      </div>
                    </>
                  </>
                )}
              </div>
            )}
            {step === 3 && (
              <div className={styles.container}>
                {isLoading ? (
                  <Loading />
                ) : (
                  <div className={styles.card2}>
                    <div className={styles.title}>Transferir:</div>
                    <div className={styles.subTitle2}>
                      {values.coffin.units} ataúd
                    </div>
                    <div className={styles.subTitle2}>
                      Tipo: {values.coffin.type}
                    </div>
                    <div className={styles.subTitle2}>
                      Tamaño: {values.coffin.size}
                    </div>
                    <div className={styles.subTitle2}>
                      Color: {values.coffin.color}
                    </div>
                    <div className={styles.subTitle2}>
                      {values.coffin.mbox
                        ? "Con caja metálica"
                        : "Sin caja metálica"}
                    </div>
                    <div className={styles.subTitle2}>
                      de {originPlace} a {values.place_destiny}
                    </div>
                    <div className={styles.formBtn}>
                      <FormButton
                        title={isLoading ? <Loading /> : "Confirmar"}
                        loading={isLoading}
                        disabled={isLoading}
                      />
                    </div>
                  </div>
                )}
              </div>
            )}
            {step === 4 && (
              <div className={styles.container}>
                {isLoading ? (
                  <Loading />
                ) : (
                  <div className={styles.container}>
                    <div className={styles.title}>
                      Transferencia realizada con exito
                    </div>
                  </div>
                )}
              </div>
            )}
          </form>
        )}
      </Formik>
    </section>
  );
};

export default NewTransferStepOne;
