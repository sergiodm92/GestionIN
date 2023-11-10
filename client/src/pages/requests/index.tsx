import { useRouter } from "next/router"
import { useEffect, useState, useRef } from "react"
import Card1 from "../../components/Cards/Card1"
import { useAppDispatch, useAppSelector } from "../../store/hooks"
import styles from './styles/requests.module.css'
import { getRequests } from "../../store/Slices/requestsSlice"
import { getAllRequests } from "../../components/functions/requests/functions"
import Loading from "../../components/Loading/loading"

const initialRequestState = [
  {
    id: "",
    date: 0,
    place: "",
    funeral: "",
    id_coffin_group: "",
    id_metal_box_group: "",
    id_deceased: "",
    holder_name: "",
    holder_relationship: "",
    policy: "",
    certificate_number: 0,
    way_to_pay: "",
    agreement: "",
    additional: "",
    wreath: false,
    present: "",
    burial_place: "",
    burial_time: "",
    cladding: "",
    service_improvement: "",
  },
];

const Requests = () => {
  const router = useRouter();
  const dispatch = useAppDispatch();

  const [updateData, setUpdateData] = useState(initialRequestState);
  const requests = useAppSelector(getRequests);
  console.log(requests)
  const prevRequests = useRef(requests);

  useEffect(() => {
    getAllRequests(dispatch);
  }, []);

  useEffect(() => {
    if (prevRequests.current !== requests) {
      setUpdateData(requests);
      prevRequests.current = requests;
    }
  }, [requests]);
  return (
    <div className={styles.container}>
      {updateData.length === 0 ? (
        <div className={styles.noRequests}>No hay datos para mostrar</div>
      ) : updateData[0].id === "" ? (
        <Loading />
      ) : (
        <>
          <div className={styles.title}>Solicitudes de Siniestro</div>
          <div className={styles.subTitle}>
            <div className={styles.smallSpace}>Fecha</div>
            <div className={styles.bigSpace}>Nombre</div>
            <div className={styles.smallSpace}>N° Certificado</div>
          </div>
          <div className={styles.cardsContainer}>
            {requests.length > 0
              ? requests.map((request: any, i: any) => {
                  return (
                      <Card1
                        key={i}
                        onClick={() => router.push(`/requests/${request.id}`)}
                        space1={new Date(request.request.date)
                          .toLocaleDateString("es")
                          .replaceAll("/", "-")}
                        space2 = {request.deceased.name }
                        space3={request.request.certificate_number}
                      />
                  );
                })
              : null}
          </div>
        </>
      )}
    </div>
  );
};
export default Requests;
