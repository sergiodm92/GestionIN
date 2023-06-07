import { useEffect } from "react"
import { LargeButton } from "../../components/Buttons"
import { useRouter } from "next/router"
import styles from "./styles/places.module.css"
import { getAllPlaces } from "./functions"
import { useAppDispatch, useAppSelector } from "../../store/hooks"
import { getplace } from "../../store/Slices/place"

const Places = ()=>{

    const router = useRouter()
    const dispatch = useAppDispatch()
    
    const places = useAppSelector(getplace)

    useEffect(()=>{
        getAllPlaces(dispatch)
    },[])

    return(
        <div className={styles.container}>
            <div className={styles.newPlace} onClick={()=>router.push('/places/new')}>+</div>
            {places.length?
            (places.map(p=>{
                return(
                    <div>
                        <LargeButton
                            title={p.name}
                            onClick={()=>router.push(`/stock/${p.name}`)}
                        />
                    </div>
                )
            })):null}
            <LargeButton
                title={"Stock Total"}
                onClick={()=>router.push('/stock')}
            />
        </div>
    )    
}
export default Places