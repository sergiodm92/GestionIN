import { useEffect, useRef, useState } from "react"
import { getAddCoffin } from "../../../store/Slices/addsCoffinSlice"
import { useAppDispatch, useAppSelector } from "../../../store/hooks"
import { getAddCoffinById } from "../functions/functions"
import { GetServerSideProps } from "next";
import styles from "../styles/addDetail.module.css"
import { decomposeId } from "../../../components/functions";
import Loading from "../../../components/Loading/loading";
import { getAllPlaces } from "../../places/functions";
import { getplace } from "../../../store/Slices/place";

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
    const add = useAppSelector(getAddCoffin)
    const places = useAppSelector(getplace)
    const prevAdd = useRef(add);

    useEffect(()=>{
        getAddCoffinById(dispatch, id)
        getAllPlaces(dispatch)
    },[])

    useEffect(() => {
      if (prevAdd.current !== add) {
        setUpdateData(add);
        prevAdd.current = add;
      }
    }, [add]);

    return(
        <div className={styles.container}>
          {Object.keys(updateData).length === 0?
          (<Loading/>)
          :(
            <div className={styles.card}>
              <div className={styles.title}>Detalle:</div>
              <div className={styles.items}>
                <div className={styles.subTitle}>Fecha:</div>
                <div className={styles.text}>{(new Date(add.date)).toLocaleDateString('es')}</div>
              </div>
              <div className={styles.items}>
                <div className={styles.subTitle}>Lugar:</div>
                <div className={styles.text}>{add.place}</div>
              </div>
              <div className={styles.items}>
                <div className={styles.subTitle}>Ataúd:</div>
                <div className={styles.text}><pre style={{fontFamily: "Cambria, Cochin, Georgia, Times, 'Times New Roman', serif"}}>{decomposeId(add.id_coffin, places)}</pre></div>
              </div>
              <div className={styles.items}>
                <div className={styles.subTitle}>Unidades:</div>
                <div className={styles.text}>{add.units}</div>
              </div>
              <div className={styles.items}>
                <div className={styles.subTitle}>Responsable:</div>
                <div className={styles.text}>{add.responsible}</div>
              </div>
              <div className={styles.items}>
                <div className={styles.subTitle}>Proveedor:</div>
                <div className={styles.text}>{add.supplier}</div>
              </div>
            </div>
          )}
        </div>
    )    
}
export default AddDetail