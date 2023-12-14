import { GetServerSideProps } from "next";
import styles from "../../styles/transfer.module.css";
import { useEffect, useRef, useState } from "react";
import { useAppDispatch, useAppSelector } from "../../../../store/hooks";
import { useRouter } from "next/router";
import { getCoffinTransferById } from "../../../../components/functions/transfers";
import { getCoffinTransfer } from "../../../../store/Slices/transfersSlice";
import Loading from "../../../../components/Loading/loading";

export const getServerSideProps: GetServerSideProps = async (context) => {
  const { params } = context;

  if (!params) {
    return {
      notFound: true,
    };
  }

  const { id } = params;

  return {
    props: {
      id,
    },
  };
};

const initialState =
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

const CoffinTransferDetail = ({ id }: { id: string }) => {
  const [updateData, setUpdateData] = useState(initialState);
  const dispatch = useAppDispatch();
  const transfer = useAppSelector(getCoffinTransfer);
  console.log(transfer)
  const prevAdd = useRef(transfer);

  const router = useRouter();

  useEffect(() => {
    getCoffinTransferById(dispatch, id);
  }, []);

  useEffect(() => {
    if (prevAdd.current !== transfer) {
      setUpdateData(transfer);
      prevAdd.current = transfer;
    }
  }, [transfer]);

  return (
    <div className={styles.container}>
      {updateData.date === 0 ? (
        <Loading />
      ) : (
        <div className={styles.card2}>
          <div className={styles.title}>Detalle:</div>
          <div className={styles.items2}>
            <div className={styles.subTitle2}>Fecha:</div>
            <div className={styles.text}>
              {new Date(updateData.date).toLocaleDateString("es")}
            </div>
          </div>
          <div className={styles.items2}>
            <div className={styles.subTitle2}>Responsable:</div>
            <div className={styles.text}>{updateData.responsible}</div>
          </div>
          <div className={styles.items2}>
            <div className={styles.subTitle2}>Depósito de origen:</div>
            <div className={styles.text}>{updateData.place_origin}</div>
          </div>
          <div className={styles.items2}>
            <div className={styles.subTitle2}>Depósito de destino:</div>
            <div className={styles.text}>{updateData.place_destiny}</div>
          </div>
          <div className={styles.itemsGroups}>
            <div className={styles.subTitle2}>1 Ataúd</div>
            <div className={styles.groups}>
              <div>Tipo: {updateData.coffin.type}</div>
              <div>Tamaño: {updateData.coffin.size}</div>
              <div>Color: {updateData.coffin.color}</div>
              <div>{updateData.coffin.mbox? "Con caja metálica" : "Sin caja metálica"}</div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};
export default CoffinTransferDetail;