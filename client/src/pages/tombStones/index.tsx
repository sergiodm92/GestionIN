import { useRouter } from "next/router"
import { useAppDispatch, useAppSelector } from "../../store/hooks"
import { getDeceaseds } from "../../store/Slices/deceasedSlice"
import Loading from "../../components/Loading/loading"
import { getDeceasedesWithoutTombStone } from "./functions/functions"
import { useEffect } from "react"
import Card1 from "../../components/Cards/Card1"
import styles from "./styles/tombStone.module.css"

const TombStones = ()=>{

    const router = useRouter()
    const dispatch = useAppDispatch()

    const deceaseds = useAppSelector(getDeceaseds)

    useEffect(()=>{
        getDeceasedesWithoutTombStone(dispatch)
    },[])
    return(
        <div className={styles.container}>
            {deceaseds.deceaseds.length==0?
            (<Loading/>)
            :(<>
                <div className={styles.title}>Difuntos sin lápida</div>
                <div className={styles.subTitle}>
                    <div className={styles.smallSpace}>Fecha de fallecimiento</div>
                    <div className={styles.bigSpace}>Nombre y Apellido</div>
                    <div className={styles.smallSpace}>DNI</div>
                </div>
                <div className={styles.cardsContainer}>
                    {deceaseds.deceaseds.length>0?deceaseds.deceaseds.map((deceased: any, i: any)=>{
                        return(
                            <div className={styles.card} key={i}>
                            <Card1
                                onClick={() => router.push(`/deceased/${deceased.id}`)}
                                space1={(new Date(deceased.dod)).toLocaleDateString('es').replaceAll("/", "-")}
                                space2={deceased.name}
                                space3={deceased.dni}
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
export default TombStones