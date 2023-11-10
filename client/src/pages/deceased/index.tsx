import { useRouter } from "next/router"
import { useAppDispatch, useAppSelector } from "../../store/hooks"
import { getDeceaseds } from "../../store/Slices/deceasedSlice"
import { getAllDeceased } from "../../components/functions/deceased/functions"
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
        cementery: "",
        cementery_type: "",
        sector: "",
        parcel: "",
        level: 0,
        first_level_name: "",
        second_level_name: "",
        religion_symbol: ""
    }
]

const Deceased = () => {

    const router = useRouter()
    const dispatch = useAppDispatch()

    const [updateData, setUpdateData] = useState(initialDeceasedState);
    const [searchDeceased, setSearchDeceased] = useState("");
    const deceaseds = useAppSelector(getDeceaseds)
    const prevDeceaseds = useRef(deceaseds)


    useEffect(() => {
        getAllDeceased(dispatch)
    }, [])

    useEffect(() => {
        if (prevDeceaseds.current !== deceaseds) {
            setUpdateData(deceaseds);
            prevDeceaseds.current = deceaseds;
        }
    }, [deceaseds]);

    const filteredData = updateData.filter((s) =>
        s.name.toLowerCase().includes(searchDeceased.toLowerCase())
    );

    return (
        <div className={styles.container}>
            {updateData.length === 0 ? (
                <div className={styles.noDeceased}>No hay datos para mostrar</div>
            ) : updateData[0].id === "" ?
                (<Loading />)
                : (<>
                    <div className={styles.title}>Difuntos</div>
                    <div className={styles.searchContaier}>
                        <input
                            type="text"
                            placeholder="🔎"
                            value={searchDeceased}
                            className={styles.search}
                            onChange={(e) => setSearchDeceased(e.target.value)}
                        />
                    </div>
                    <div className={styles.subTitle}>
                        <div className={styles.smallSpace}>Fecha de fallecimiento</div>
                        <div className={styles.bigSpace}>Nombre y Apellido</div>
                        <div className={styles.smallSpace}>DNI</div>
                    </div>
                    <div className={styles.cardsContainer}>
                        {filteredData.length > 0 ? filteredData.map((deceased: any, i: any) => {
                            return (
                                <div className={styles.card} key={i}>
                                    <Card1
                                        onClick={() => router.push(`/deceased/${deceased.id_doc}`)}
                                        space1={(new Date(deceased.dod)).toLocaleDateString('es').replaceAll("/", "-")}
                                        space2={deceased.name}
                                        space3={deceased.dni}
                                    />
                                </div>
                            )
                        })
                            : <p className={styles.noDeceased}>No hay datos para mostrar</p>}
                    </div>
                </>)}
        </div>
    )
}
export default Deceased