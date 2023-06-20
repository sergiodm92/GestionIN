import { useEffect, useRef, useState } from "react"
import { useAppDispatch, useAppSelector } from "../../../../store/hooks"
import { getAddGeneralById } from "../../../../components/functions/adds/functions"
import { GetServerSideProps } from "next";
import styles from "../../styles/addDetail.module.css"
import Loading from "../../../../components/Loading/loading";
import { DeleteBtn} from "../../../../components/Buttons";
import { handleDeleteAddGeneral } from "../../../../components/functions/addCoffin/functions";
import { useRouter } from "next/router";
import { getAddGeneral } from "../../../../store/Slices/addsGeneralSlice";

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

const AddGeneralDetail = ({ id_doc }: { id_doc: string })=>{
    const [updateData, setUpdateData] = useState({});
    const dispatch = useAppDispatch()
    const add = useAppSelector(getAddGeneral)
    const prevAdd = useRef(add);

    const router = useRouter()

    useEffect(()=>{
        getAddGeneralById(dispatch, id_doc)
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
              <div className={styles.deleteBtn}>
                <DeleteBtn
                  onClick={()=>handleDeleteAddGeneral(id_doc, router)}
                />
              </div>
              <div className={styles.title}>Detalle:</div>
              <div className={styles.items}>
                <div className={styles.subTitle}>Fecha:</div>
                <div className={styles.text}>{(new Date(add.date)).toLocaleDateString('es')}</div>
              </div>
              <div className={styles.items}>
                <div className={styles.subTitle}>Lugar:</div>
                <div className={styles.text}>{add?.place}</div>
              </div>
              <div className={styles.items}>
                <div className={styles.subTitle}>Producto:</div>
                <div className={styles.text}>{add.product}</div>
              </div>
              <div className={styles.items}>
                <div className={styles.subTitle}>Cantidad:</div>
                <div className={styles.text}>{add.amount}</div>
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
export default AddGeneralDetail