import { useEffect, useRef, useState } from "react"
import { useAppDispatch, useAppSelector } from "../../../../store/hooks"
import { getAddMetalBoxById } from "../../../../components/functions/adds/functions"
import { GetServerSideProps } from "next";
import styles from "../../styles/addDetail.module.css"
import Loading from "../../../../components/Loading/loading";
import { DeleteBtn} from "../../../../components/Buttons";
import { handleDeleteAddMetalBox } from "../../../../components/functions/addCoffin/functions";
import { useRouter } from "next/router";
import { getAddMetalBox } from "../../../../store/Slices/addsMetalBoxSlice";

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

const AddMetalBoxDetail = ({ id_doc }: { id_doc: string })=>{
    const [updateData, setUpdateData] = useState({});
    const dispatch = useAppDispatch()
    const add = useAppSelector(getAddMetalBox)
    const prevAdd = useRef(add);

    const router = useRouter()

    useEffect(()=>{
        getAddMetalBoxById(dispatch, id_doc)
    },[])

    useEffect(() => {
      if (prevAdd.current !== add) {
        setUpdateData(add);
        prevAdd.current = add;
      }
    }, [add]);

    return(
        <div className={styles.container}>
          {updateData && Object.keys(updateData).length === 0?
          (<Loading/>)
          :(
            <div className={styles.card}>
              <div className={styles.deleteBtn}>
                <DeleteBtn
                  onClick={()=>handleDeleteAddMetalBox(add.id, id_doc, router)}
                />
              </div>
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
                <div className={styles.subTitle}>Tamaño:</div>
                <div className={styles.text}>{add.size}</div>
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
export default AddMetalBoxDetail