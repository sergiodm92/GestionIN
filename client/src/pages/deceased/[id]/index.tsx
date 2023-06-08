import { useEffect, useRef, useState } from "react"
import { useAppDispatch, useAppSelector } from "../../../store/hooks"
import { GetServerSideProps } from "next";
import Loading from "../../../components/Loading/loading";
import { getDeceasedById, putDeceasedTombstone } from "../../../components/functions/deceased/functions";
import styles from "../styles/deceasedDetail.module.css"
import { getDeceased } from "../../../store/Slices/deceasedSlice";
import { SmallBtn } from "../../../components/Buttons";
import Swal from "sweetalert2";
import { createToast } from "../../../components/Notifications/Notifications";

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

  const initialData={
    name: "",
    dod: 0,
    tombstone: false,
    leyend: "",
    id: "",
    news_paper: "",
    news_paper_name: "",
    pod: "",
    dni: "",
    id_request: "",
    dob: 0
}

const DeceasedDetail = ({ id }: { id: string })=>{
    const [updateData, setUpdateData] = useState(initialData);
    const dispatch = useAppDispatch()
    const deceased = useAppSelector(getDeceased)
    const prevDeceased = useRef(deceased);

    useEffect(()=>{
        getDeceasedById(dispatch, id)
    },[])

    useEffect(() => {
      if (prevDeceased.current.id === id || prevDeceased.current !== deceased) {
        setUpdateData(deceased);
        prevDeceased.current = deceased;
      }
    }, [deceased]);

    const setTombStone = ()=>{
      Swal.fire({
        title: "Agregar lápida",
        text: "¿Esta seguro que desea agregar lápida?",
        icon: "warning",
        showCancelButton: true,
        confirmButtonText: "Si",
        cancelButtonText: "Cancelar",
        confirmButtonColor: "#43815A",
        cancelButtonColor: "#b32020",
      }).then((result) => {
        if (result.isConfirmed) {
            putDeceasedTombstone(id)
        } else if (
          /* Read more about handling dismissals below */
          result.dismiss === Swal.DismissReason.cancel
        ) {
            createToast("warning","No agregó lápida");
        }
      });
    }

    return(
        <div className={styles.container}>
          {updateData===initialData?
          (<Loading/>)
          :(
            <div className={styles.card}>
              <div className={styles.title}>Detalle:</div>
              <div className={styles.items}>
                <div className={styles.subTitle}>Apellido y Nombre:</div>
                <div className={styles.text}>{updateData.name}</div>
              </div>
              <div className={styles.items}>
                <div className={styles.subTitle}>Fecha de Fallecimiento:</div>
                <div className={styles.text}>{(new Date(updateData.dod)).toLocaleDateString('es')}</div>
                <div className={styles.text}>{`${new Date(updateData.dod).getHours()< 10 ? '0' + new Date(updateData.dod).getHours(): new Date(updateData.dod).getHours()} : ${new Date(updateData.dod).getMinutes()< 10 ? '0' + new Date(updateData.dod).getMinutes(): new Date(updateData.dod).getMinutes()}`}</div>
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
                <div className={styles.text}>{(new Date(updateData.dob)).toLocaleDateString('es')}</div>
              </div>
              <div className={styles.items}>
                <div className={styles.subTitle}>Texto de placa:</div>
                <div className={styles.text}>{updateData.leyend}</div>
              </div>
              <div className={styles.items}>
                    <div className={styles.subTitle}>Esquela:</div>
                    <div className={styles.text}>{updateData.news_paper}</div>
              </div>
              <div className={styles.items}>
                    <div className={styles.subTitle}>Nombre del Diario:</div>
                    <div className={styles.text}>{updateData.news_paper_name}</div>
              </div>
              <div className={styles.items}>
                <div className={styles.subTitle}>Lápida:</div>
                <div className={updateData.tombstone?styles.text:styles.withoutTombStone}>{updateData.tombstone?"Lápida Lista":"Sin Lápida"}</div>
              </div>
              {updateData.tombstone?
                (null)
                :(
                  <div>
                    <SmallBtn
                    title={"Agregar lápida"}
                    onClick={setTombStone}
                    />
                    </div>
                )}
            </div>
          )}
        </div>
    )    
}
export default DeceasedDetail