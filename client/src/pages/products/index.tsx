import { useEffect, useState } from "react"
import { useAppDispatch, useAppSelector } from "../../store/hooks"
import { getAllProducts } from "../../components/functions/products"
import { getProducts } from "../../store/Slices/products"
import styles from "./styles/places.module.css"
import Loading from "../../components/Loading/loading"

const Products = () => {
    const [initialList, setInitialList]=useState(["sin datos"])
    const dispatch = useAppDispatch()
    const products = useAppSelector(getProducts)

    useEffect(() => {
        getAllProducts(dispatch)
        setInitialList(products)
    }, [])

    return (
        <div className={styles.container}>
            {initialList[0]==="sin datos"?
            <Loading/>
            :products.length ?
                (products.map((p, i) => {
                    return (
                        <div key={i}>
                            <p>{p.name}</p>
                        </div>
                    )
                })) : <p>No hay productos cargados aún</p>}
        </div>
    )
}
export default Products