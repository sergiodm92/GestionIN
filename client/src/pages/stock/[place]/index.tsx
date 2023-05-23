import { GetServerSideProps } from 'next';
import { useAppDispatch, useAppSelector } from "../../../store/hooks"
import { getStock } from '../../../store/Slices/stockSlice';
import React,{ useEffect } from 'react';
import { getStockByPlace } from '../functions';
import styles from '../styles/stock.module.css'

export const getServerSideProps: GetServerSideProps = async (context) => {
  const { params } = context;

  if (!params) {
    return {
      notFound: true,
    };
  }

  const { place } = params;

  return {
    props: {
      place,
    },
  };
};

const Stock = ({ place }: { place: string })=>{

    const dispatch = useAppDispatch()

    const stock = useAppSelector(getStock)
    console.log(stock.stock)

  useEffect(()=>{
    getStockByPlace(dispatch, place)
  },[])

    return(
        <div className={styles.container}>
            {stock?.stock.length>0?
            <>
                <div className={styles.title}>Stock disponible {place}</div>
                <div className={styles.subTitle}>
                    <div className={styles.subTitleItems} style={{borderLeft: "none"}}>ID</div>
                    <div className={styles.subTitleItems}>Tipo</div>
                    <div className={styles.subTitleItems}>Tamaño</div>
                    <div className={styles.subTitleItems}>Color</div>
                    <div className={styles.subTitleItems}>Caja Metálica</div>
                    <div className={styles.subTitleItems}>Unidades</div>
                </div>
                {stock.stock?.map((s)=>{
                    return (
                        <div className={styles.items}>
                            <div className={styles.subItems} style={{borderLeft: "none"}}>{s.id_coffin}</div>
                            <div className={styles.subItems}>{s.coffin.type}</div>
                            <div className={styles.subItems}>{s.coffin.size}</div>
                            <div className={styles.subItems}>{s.coffin.color}</div>
                            <div className={styles.subItems}>{s.coffin.metal_box? "Si" : "No"}</div>
                            <div className={styles.subItems}>{s.units}</div>
                        </div>
                    )
                })}
            </>
            :<div>No hay Stock disponible en {place}</div>}
        </div>
    )    
}
export default Stock