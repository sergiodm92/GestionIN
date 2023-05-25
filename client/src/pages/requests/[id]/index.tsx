import { useEffect, useRef, useState } from "react"
import { useAppDispatch, useAppSelector } from "../../../store/hooks"
import { GetServerSideProps } from "next";
import { decomposeId } from "../../../components/functions";
import Loading from "../../../components/Loading/loading";
import { getRequest } from "../../../store/Slices/requestsSlice";
import { getRequestById } from "../functions/functions";
import styles from "../styles/requestDetail.module.css"

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
    const request = useAppSelector(getRequest)
    const prevRequest = useRef(request.request);

    useEffect(()=>{
        getRequestById(dispatch, id)
    },[])

    useEffect(() => {
      if (prevRequest.current !== request.request) {
        setUpdateData(request.request);
        prevRequest.current = request.request;
      }
    }, [request.request]);

    return(
        <div className={styles.container}>
          {Object.keys(updateData).length === 0?
          (<Loading/>)
          :(
            <div className={styles.card}>
              <div className={styles.title}>Detalle:</div>
              <div className={styles.items}>
                <div className={styles.subTitle}>Fecha:</div>
                <div className={styles.text}>{(new Date(request.request.date)).toLocaleDateString('es')}</div>
              </div>
              <div className={styles.items}>
                <div className={styles.subTitle}>Lugar:</div>
                <div className={styles.text}>{request.request.place}</div>
              </div>
              <div className={styles.items}>
                <div className={styles.subTitle}>Cajon:</div>
                <div className={styles.text}><pre style={{fontFamily: "Cambria, Cochin, Georgia, Times, 'Times New Roman', serif"}}>{decomposeId(request.request.id_coffin)}</pre></div>
              </div>
            </div>
          )}
        </div>
    )    
}
export default AddDetail