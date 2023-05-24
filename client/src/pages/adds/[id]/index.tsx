import { useEffect, useRef, useState } from "react"
import { getAdd } from "../../../store/Slices/addsSlice"
import { useAppDispatch, useAppSelector } from "../../../store/hooks"
import { getAddsById } from "../functions/functions"
import { GetServerSideProps } from "next";
import styles from "../styles/addDetail.module.css"
import { decomposeId } from "../../../components/functions";
import Loading from "../../../components/Loading/loading";

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

const AddDetail = ({ id }: { id: string })=>{
    const [updateData, setUpdateData] = useState({});
    const dispatch = useAppDispatch()
    const add = useAppSelector(getAdd)
    const prevAdd = useRef(add.add);

    useEffect(()=>{
        getAddsById(dispatch, id)
    },[])

    useEffect(() => {
      if (prevAdd.current !== add.add) {
        setUpdateData(add.add);
        prevAdd.current = add.add;
      }
    }, [add.add]);

    return(
        <div className={styles.container}>
          {Object.keys(updateData).length === 0?
          (<Loading/>)
          :(
            <div className={styles.card}>
              <div className={styles.title}>Detalle:</div>
              <div className={styles.items}>
                <div className={styles.subTitle}>Fecha:</div>
                <div className={styles.text}>{(new Date(add.add.date)).toLocaleDateString('es')}</div>
              </div>
              <div className={styles.items}>
                <div className={styles.subTitle}>Lugar:</div>
                <div className={styles.text}>{add.add.place}</div>
              </div>
              <div className={styles.items}>
                <div className={styles.subTitle}>Cajon:</div>
                <div className={styles.text}><pre style={{fontFamily: "Cambria, Cochin, Georgia, Times, 'Times New Roman', serif"}}>{decomposeId(add.add.id_coffin)}</pre></div>
              </div>
              <div className={styles.items}>
                <div className={styles.subTitle}>Unidades:</div>
                <div className={styles.text}>{add.add.units}</div>
              </div>
              <div className={styles.items}>
                <div className={styles.subTitle}>Responsable:</div>
                <div className={styles.text}>{add.add.responsible}</div>
              </div>
              <div className={styles.items}>
                <div className={styles.subTitle}>Proveedor:</div>
                <div className={styles.text}>{add.add.supplier}</div>
              </div>
            </div>
          )}
        </div>
    )    
}
export default AddDetail