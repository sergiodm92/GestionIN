import { useRouter } from "next/router"
import { useAppDispatch, useAppSelector } from "../../store/hooks"
import { getDeceaseds } from "../../store/Slices/deceasedSlice"
import { getAllDeceased } from "./functions/functions"
import { useEffect, useState, useRef } from "react"
import styles from './styles/deceaseds.module.css'
import Card1 from "../../components/Cards/Card1"
import Loading from "../../components/Loading/loading"

const initialDeceasedState = [
    {
        id: "",
        id_request: "",
        name: "",
        dob: 0,
        dod: 0,
        pod: "",
        dni: "",
        leyend: "",
        news_paper: "",
        news_paper_name: "",
        tombstone: true,
        cementery_type: ""
    }
]

const Deceased = ()=>{

    const router = useRouter()
    const dispatch = useAppDispatch()

    const [updateData, setUpdateData] = useState(initialDeceasedState);
    const deceaseds = useAppSelector(getDeceaseds)
    const prevDeceaseds = useRef(deceaseds)


    useEffect(()=>{
        getAllDeceased(dispatch)
    },[])

    useEffect(() => {
        if (prevDeceaseds.current !== deceaseds) {
          setUpdateData(deceaseds);
          prevDeceaseds.current = deceaseds;
        }
      }, [deceaseds]);

    return(
        <div className={styles.container}>
      {updateData.length === 0 ? (
        <div className={styles.noDeceased}>No hay Difuntos disponible</div>
      ) : updateData[0].id === "" ? 
            (<Loading/>)
            :(<>
                <div className={styles.title}>Difuntos</div>
                <div className={styles.subTitle}>
                    <div className={styles.smallSpace}>Fecha de fallecimiento</div>
                    <div className={styles.bigSpace}>Nombre y Apellido</div>
                    <div className={styles.smallSpace}>DNI</div>
                </div>
                <div className={styles.cardsContainer}>
                    {deceaseds.length>0?deceaseds.map((deceased: any, i: any)=>{
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
export default Deceased