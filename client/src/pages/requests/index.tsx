import { useRouter } from "next/router"
import { useEffect } from "react"
import Card1 from "../../components/Cards/Card1"
import { useAppDispatch, useAppSelector } from "../../store/hooks"
import styles from './styles/requests.module.css'
import { getRequests } from "../../store/Slices/requestsSlice"
import { getAllRequests } from "./functions/functions"
import Loading from "../../components/Loading/loading"

const Requests = ()=>{

    const router = useRouter()
    const dispatch = useAppDispatch()

    const requests = useAppSelector(getRequests)

    useEffect(()=>{
        getAllRequests(dispatch)
    },[])

    return(
        <div className={styles.container}>
            {requests.requests.length==0?
            (<Loading/>)
            :(<>
                <div className={styles.title}>Solicitudes de Siniestro</div>
                <div className={styles.subTitle}>
                    <div className={styles.smallSpace}>Fecha</div>
                    <div className={styles.bigSpace}>Lugar</div>
                    <div className={styles.smallSpace}>N° Certificado</div>
                </div>
                <div className={styles.cardsContainer}>
                    {requests.requests.length>0?requests.requests.map((request: any, i: any)=>{
                        return(
                            <div className={styles.card} key={i}>
                            <Card1
                                onClick={() => router.push(`/requests/${request.id}`)}
                                space1={(new Date(request.date)).toLocaleDateString('es').replaceAll("/", "-")}
                                space2={request.place}
                                space3={request.cetificate_number}
                            />
                            </div>
                        )
                    })
                :null}
                </div>
            </>)}
        </div>    
    )
}
export default Requests