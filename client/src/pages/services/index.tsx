import { useRouter } from "next/router";
import { useEffect, useState, useRef } from "react";
import Card1 from "../../components/Cards/Card1";
import { useAppDispatch, useAppSelector } from "../../store/hooks";
import styles from "./styles/requests.module.css";
import { getParticularRequests } from "../../store/Slices/particularRequestsSlice";
import { getAllParticularRequests } from "../../components/functions/requests/functions";
import Loading from "../../components/Loading/loading";
import { getAllCompanies } from "../../components/functions/settings/companies";
import { getCompanies } from "../../store/Slices/companies";

const initialParticularRequestState = [
  {
    id: "",
    id_deceased: "",
    date: 0,
    place: "",
    funeral: "",
    id_add: "",
    id_coffin_group: "",
    id_add_metal_box: "",
    id_metal_box_group: "",
    additional: "",
    wreath: false,
    present: "",
    products: [{
      id: "",
      name: "",
      units: 0
    }],
    burial_place: "",
    burial_time: "",
    cladding: "",
    service_improvement: "",
    company: "",
  },
];

const ParticularRequests = () => {
  const router = useRouter();
  const dispatch = useAppDispatch();

  const [updateData, setUpdateData] = useState(initialParticularRequestState);
  const requests = useAppSelector(getParticularRequests);
  const companies = useAppSelector(getCompanies);
  const prevRequests = useRef(requests);

  useEffect(() => {
    getAllParticularRequests(dispatch);
    getAllCompanies(dispatch);
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
          <div className={styles.title}>Servicios</div>
          <div className={styles.subTitle}>
            <div className={styles.smallSpace}>Fecha</div>
            <div className={styles.bigSpace}>Nombre</div>
            <div className={styles.smallSpace}>Empresa</div>
          </div>
          <div className={styles.cardsContainer}>
            {requests.length > 0
              ? requests.map((request: any, i: any) => {
                  return (
                    <Card1
                      key={i}
                      onClick={() => router.push(`/services/${request.id}`)}
                      space1={new Date(request.request.date)
                        .toLocaleDateString("es")
                        .replaceAll("/", "-")}
                      space2={request.deceased.name}
                      space3={companies?.find((c)=>{c.name == request.request.company})?request.request.company: "Particular"}
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
export default ParticularRequests;
