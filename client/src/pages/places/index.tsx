import { useEffect } from "react"
import { FormButton, LargeButton, SmallBtn } from "../../components/Buttons"
import { useRouter } from "next/router"
import styles from "./styles/places.module.css"
import { getAllPlaces } from "../../components/functions/places"
import { useAppDispatch, useAppSelector } from "../../store/hooks"
import { getplace } from "../../store/Slices/place"
import Loading from "../../components/Loading/loading"

const Places = () => {

    const router = useRouter()
    const dispatch = useAppDispatch()

    const places = useAppSelector(getplace)

    useEffect(() => {
        getAllPlaces(dispatch)
    }, [])

    return (
        <div className={styles.container}>
            <div className={styles.newPlace} ><SmallBtn
                title={"Agregar deposito"}
                onClick={() => router.push('/places/new')}
            /></div>
            {places.length ?
                (<>
                    {places.map((p, i) => {
                        return (
                            <div key={i}>
                                <LargeButton
                                    title={p.name}
                                    onClick={() => router.push(`/stock/${p.name}`)}
                                />
                            </div>
                        )
                    }
                    )}
                    <LargeButton
                        title={"Stock Total"}
                        onClick={() => router.push('/stock')}
                    />
                </>) : <Loading />}
        </div>
    )
}
export default Places