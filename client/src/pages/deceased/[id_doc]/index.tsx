import { useEffect, useRef, useState } from "react";
import { useAppDispatch, useAppSelector } from "../../../store/hooks";
import { GetServerSideProps } from "next";
import Loading from "../../../components/Loading/loading";
import { getDeceasedById } from "../../../components/functions/deceased/functions";
import styles from "../styles/deceasedDetail.module.css";
import { getDeceased } from "../../../store/Slices/deceasedSlice";
import { SmallBtn } from "../../../components/Buttons";
import { questionAlert } from "../../../components/Notifications/Notifications";
import {
  cementery_type1,
  tombstone_type1,
  tombstone_type2,
} from "../../../utils/constants";

export const getServerSideProps: GetServerSideProps = async (context) => {
  const { params } = context;

  if (!params) {
    return {
      notFound: true,
    };
  }

  const { id_doc } = params;

  return {
    props: {
      id_doc,
    },
  };
};

const initialData = {
  id_doc: "",
  name: "",
  dod: 0,
  tombstone: "pending",
  leyend: "",
  id: "",
  news_paper: "",
  news_paper_name: "",
  pod: "",
  dni: "",
  id_request: "",
  dob: 0,
  cementery: "",
  cementery_type: "",
  sector: "",
  parcel: "",
  level: 0,
  first_level_name: "",
  second_level_name: "",
  religion_symbol: "",
};

const DeceasedDetail = ({ id_doc }: { id_doc: string }) => {
  const [updateData, setUpdateData] = useState(initialData);
  const [cementeryType, setCementeryType] = useState("");
  const dispatch = useAppDispatch();
  const deceased = useAppSelector(getDeceased);
  const prevDeceased = useRef(deceased);

  useEffect(() => {
    getDeceasedById(dispatch, id_doc);
  }, []);

  useEffect(() => {
    if (
      prevDeceased.current.id_doc === id_doc ||
      prevDeceased.current !== deceased
    ) {
      setUpdateData(deceased);
      setCementeryType(deceased.cementery_type);
      prevDeceased.current = deceased;
    }
  }, [deceased]);

  return (
    <div className={styles.container}>
      {updateData === initialData ? (
        <Loading />
      ) : (
        <div className={styles.card}>
          <div className={styles.title}>Detalle:</div>
          <div className={styles.items}>
            <div className={styles.subTitle}>Apellido y Nombre:</div>
            <div className={styles.text}>{updateData.name}</div>
          </div>
          <div className={styles.items}>
            <div className={styles.subTitle}>Fecha de Fallecimiento:</div>
            <div className={styles.text}>
              {new Date(updateData.dod).toLocaleDateString("es")}
            </div>
            <div className={styles.text}>{`${
              new Date(updateData.dod).getHours() < 10
                ? "0" + new Date(updateData.dod).getHours()
                : new Date(updateData.dod).getHours()
            } : ${
              new Date(updateData.dod).getMinutes() < 10
                ? "0" + new Date(updateData.dod).getMinutes()
                : new Date(updateData.dod).getMinutes()
            }`}</div>
          </div>
          <div className={styles.items}>
            <div className={styles.subTitle}>Lugar de Fallecimiento:</div>
            <div className={styles.text}>{updateData.pod}</div>
          </div>
          <div className={styles.items}>
            <div className={styles.subTitle}>DNI:</div>
            <div className={styles.text}>{updateData.dni}</div>
          </div>
          <div className={styles.items}>
            <div className={styles.subTitle}>Fecha de Nacimiento:</div>
            <div className={styles.text}>
              {new Date(updateData.dob).toLocaleDateString("es")}
            </div>
          </div>
          <div className={styles.items}>
            <div className={styles.subTitle}>Esquela:</div>
            <div className={styles.text}>{updateData.news_paper}</div>
          </div>
          <div className={styles.items}>
            <div className={styles.subTitle}>Nombre del Diario:</div>
            <div className={styles.text}>{updateData.news_paper_name}</div>
          </div>
          {updateData.cementery == "cremation" ? (
            <div className={styles.items}>
              <div className={styles.subTitle}>Cremación</div>
            </div>
          ) : (
            <div className={styles.items}>
              <div className={styles.subTitle}>Cementerio:</div>
              <div className={styles.text}>{updateData.cementery}</div>
            </div>
          )}
          {cementeryType === cementery_type1 ? (
            <>
              <div className={styles.items}>
                <div className={styles.subTitle}>Sector:</div>
                <div className={styles.text}>{updateData.sector}</div>
              </div>
              <div className={styles.items}>
                <div className={styles.subTitle}>Parcela:</div>
                <div className={styles.text}>{updateData.parcel}</div>
              </div>
              <div className={styles.items}>
                <div className={styles.subTitle}>Nivel:</div>
                <div className={styles.text}>{updateData.level}</div>
              </div>
              {updateData.level == 2 ? (
                <>
                  <div className={styles.items}>
                    <div className={styles.subTitle}>1° Nivel:</div>
                    <div className={styles.text}>
                      {updateData.first_level_name}
                    </div>
                  </div>
                </>
              ) : updateData.level == 3 ? (
                <>
                  <div className={styles.items}>
                    <div className={styles.subTitle}>1° Nivel:</div>
                    <div className={styles.text}>
                      {updateData.first_level_name}
                    </div>
                  </div>
                  <div className={styles.items}>
                    <div className={styles.subTitle}>2° Nivel:</div>
                    <div className={styles.text}>
                      {updateData.second_level_name}
                    </div>
                  </div>
                </>
              ) : null}
              <div className={styles.items}>
                <div className={styles.subTitle}>Símbolo de la Religión:</div>
                <div className={styles.text}>{updateData.religion_symbol}</div>
              </div>
            </>
          ) : null}
          <div className={styles.items}>
            <div className={styles.subTitle}>Placa:</div>
            <div className={styles.text}>
              {updateData.tombstone == "pending"
                ? "Pendiente"
                : updateData.tombstone == "sent"
                ? "Enviada"
                : updateData.tombstone == "approved"
                ? "Aprobada"
                : updateData.tombstone == "null"
                ? "No requiere"
                : "Despachada"}
            </div>
          </div>
        </div>
      )}
    </div>
  );
};
export default DeceasedDetail;
