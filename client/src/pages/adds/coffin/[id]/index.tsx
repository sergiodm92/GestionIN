import { useEffect, useRef, useState } from "react"
import { getAddCoffin } from "../../../../store/Slices/addsCoffinSlice"
import { useAppDispatch, useAppSelector } from "../../../../store/hooks"
import { getAddCoffinById } from "../../../../components/functions/adds/functions"
import { GetServerSideProps } from "next";
import styles from "../../styles/addDetail.module.css"
import Loading from "../../../../components/Loading/loading";
import { DeleteBtn} from "../../../../components/Buttons";
import { handleDeleteAddCoffin } from "../../../../components/functions/addCoffin/functions";
import { useRouter } from "next/router";

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

const AddCoffinDetail = ({ id }: { id: string })=>{
    const [updateData, setUpdateData] = useState({});
    const dispatch = useAppDispatch()
    const add = useAppSelector(getAddCoffin)
    const prevAdd = useRef(add);

    const router = useRouter()

    useEffect(()=>{
        getAddCoffinById(dispatch, id)
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
                  onClick={()=>handleDeleteAddCoffin(id, router)}
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
                <div className={styles.subTitle}>Responsable:</div>
                <div className={styles.text}>{add.responsible}</div>
              </div>
              <div className={styles.items}>
                <div className={styles.subTitle}>Estado:</div>
                <div className={styles.text}>{add.status==="pending"?"Pendiente":"Completo"}</div>
              </div>
              <div className={add.coffins.length? styles.itemsGroups: styles.none}>
                <div className={styles.subTitle}>Ataudes:</div>
                <div className={styles.groups}>
                  {add.coffins.map((c,i)=>{
                    return(
                      <div key={i}>
                        <div>Tamaño: {c.size}</div>
                        <div>Tipo: {c.type}</div>
                        <div>Color: {c.color}</div>
                        <div>Con caja metálica: {c.mbox===true?"Si":"No"}</div>
                        <div>Cantidad: {c.units}</div>
                      </div>
                    )
                  })}
                </div>
              </div>
              <div className={add.metal_box.length? styles.itemsGroups: styles.none}>
                <div className={styles.subTitle}>Cajas metálicas:</div>
                <div className={styles.groups}>
                  {add.metal_box.map((m,i)=>{
                    return(
                      <div key={i}>
                        <div>Tamaño: {m.size}</div>
                        <div>Cantidad: {m.units}</div>
                      </div>
                    )
                  })}
                </div>
              </div>
            </div>
          )}
        </div>
    )    
}
export default AddCoffinDetail
