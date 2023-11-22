import { useEffect, useRef, useState } from "react"
import { useAppDispatch, useAppSelector } from "../../../../store/hooks"
import { getAddProductsById } from "../../../../components/functions/adds/functions"
import { GetServerSideProps } from "next";
import styles from "../../styles/addDetail.module.css"
import Loading from "../../../../components/Loading/loading";
import { useRouter } from "next/router";
import { getAddProducts } from "../../../../store/Slices/addsProductsSlice";

export const getServerSideProps: GetServerSideProps = async (context) => {
  const { params } = context;

  if (!params) {
    return {
      notFound: true,
    };
  }

  const { id } = params;

  return {
    props: {
      id,
    },
  };
};

const AddProductsDetail = ({ id }: { id: string }) => {
  const [updateData, setUpdateData] = useState({});
  const dispatch = useAppDispatch()
  const add = useAppSelector(getAddProducts)
  const prevAdd = useRef(add);

  const router = useRouter()

  useEffect(() => {
    getAddProductsById(dispatch, id)
  }, [])

  useEffect(() => {
    if (prevAdd.current !== add) {
      setUpdateData(add);
      prevAdd.current = add;
    }
  }, [add]);

  return (
    <div className={styles.container}>
      {Object.keys(updateData).length === 0 ?
        (<Loading />)
        : (
          <div className={styles.card}>
            {/* <div className={styles.deleteBtn}>
                <DeleteBtn
                  onClick={()=>handleDeleteAddProducts(add.id, id_doc, router)}
                />
              </div> */}
            <div className={styles.title}>Detalle:</div>
            <div className={styles.items}>
              <div className={styles.subTitle}>Fecha:</div>
              <div className={styles.text}>{(new Date(add.date)).toLocaleDateString('es')}</div>
            </div>
            <div className={styles.items}>
              <div className={styles.subTitle}>Lugar:</div>
              <div className={styles.text}>{add?.place}</div>
            </div>
            <div className={styles.items}>
              <div className={styles.subTitle}>Responsable:</div>
              <div className={styles.text}>{add.responsible}</div>
            </div>
            <div className={styles.items}>
              <div className={styles.subTitle}>Productos:</div>
              {add.products.map((product: any, i: any) => {
                return (
                  <div key={i}>
                    <div className={styles.text}>{product.name}</div>
                    <div className={styles.text}>{product.units}</div>
                  </div>
                )
              })}
            </div>

          </div>
        )}
    </div>
  )
}
export default AddProductsDetail