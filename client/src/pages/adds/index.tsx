import { useRouter } from "next/router"
import Card1 from "../../components/Cards/Card1"
import { getAllAdds } from "./functions/functions"
import { useEffect } from "react"
import { useAppDispatch, useAppSelector } from "../../store/hooks"
import { getAdds } from "../../store/Slices/addsSlice"
import  styles from "./styles/Adds.module.css" 
import { decomposeId } from "../../components/functions"
import Loading from "../../components/Loading/loading"

const Adds = ()=>{

    const router = useRouter()
    const dispatch = useAppDispatch()

    const adds = useAppSelector(getAdds)

    useEffect(()=>{
        getAllAdds(dispatch)
    },[])
    
    return(
        <div className={styles.container}>
          {adds.adds.length==0?
          (<Loading/>)
          :(<>
            <div className={styles.title}>Ingresos</div>
            <div className={styles.subTitle}>
                <div className={styles.smallSpace}>Fecha</div>
                <div className={styles.bigSpace}>Cajon</div>
                <div className={styles.smallSpace}>Cant</div>
            </div>
            <div className={styles.cardsContainer}>
                {adds.adds.length>0?adds.adds.map((add: any, i: any)=>{
                    return(
                        <div className={styles.card} key={i}>
                          <Card1
                            onClick={() => router.push(`/adds/${add.id}`)}
                            space1={(new Date(add.date)).toLocaleDateString('es').replaceAll("/", "-")}
                            space2={add.id_coffin}
                            space3={add.units}
                          />
                          <div className={styles.cardHover}>
                            <pre>{decomposeId(add.id_coffin)}</pre>
                          </div>
                        </div>
                      )
                })
            :null}
            </div>
          </>)}
        </div>
    )    
}
export default Adds