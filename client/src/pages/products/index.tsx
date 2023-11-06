import { useEffect, useState } from "react"
import { useAppDispatch, useAppSelector } from "../../store/hooks"
import { getAllProducts } from "../../components/functions/products"
import { getProducts } from "../../store/Slices/products"
import styles from "./styles/places.module.css"
import Loading from "../../components/Loading/loading"

const initialState =[{
    id:"",
    name: "sin datos",
}]

const Products = () => {
    const [initialList, setInitialList]=useState(initialState)
    const dispatch = useAppDispatch()
    const products = useAppSelector(getProducts)

    useEffect(() => {
        getAllProducts(dispatch)
        setInitialList(products)
    }, [])

    return (
        <div className={styles.container}>
            <h1 className={styles.title}>Productos disponibles</h1>
            <div className={styles.listContainer}>
            {initialList[0]?.name==="sin datos"?
            <Loading/>
            :products.length ?
                (products.map((p, i) => {
                    return (
                        <div key={i} className={styles.products}>
                            <p>{p.name}</p>
                        </div>
                    )
                })) : <p className={styles.title}>No hay productos cargados aún</p>}
        </div>
        </div>
    )
}
export default Products