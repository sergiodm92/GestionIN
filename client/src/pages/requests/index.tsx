import { useRouter } from "next/router"
import { LargeButton } from "../../components/Buttons"
import styles from "./styles/requests.module.css"

const RequestsMenu = () => {
    const router = useRouter()
    return(
        <div className={styles.containerII}>
            <div className={styles.title}>Ver solicitudes</div>
            <LargeButton title="Solicitudes de siniestro" onClick={()=>{router.push('/requests/requests')}}/>
            <LargeButton title="Servicios" onClick={()=>{router.push('/requests/services')}}/>
        </div>
    )
}

export default RequestsMenu