import { useEffect, useRef, useState } from "react";
import { useAppDispatch, useAppSelector } from "../../../store/hooks";
import { GetServerSideProps } from "next";
import { decomposeId } from "../../../components/functions";
import Loading from "../../../components/Loading/loading";
import { getRequest } from "../../../store/Slices/requestsSlice";
import { getRequestById, handleDeleteRequest } from "../../../components/functions/requests/functions";
import styles from "../styles/requestDetail.module.css";
import { DeleteBtn, SmallBtn } from "../../../components/Buttons";
import { useRouter } from "next/router";
import { getAllPlaces } from "../../../components/functions/places";
import { getplace } from "../../../store/Slices/place";

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

const initialData = {
  deceased: {
    name: "",
    dod: 0,
    tombstone: false,
    leyend: "",
    id: "",
    news_paper: "",
    news_paper_name: "",
    pod: "",
    dni: "",
    id_request: "",
    dob: 0,
  },
  request: {
    cladding: "",
    cementery: "",
    additional: "",
    id: "",
    agreement: "",
    burial_time: "",
    wreath: false,
    id_deceased: "",
    way_to_pay: "",
    policy: "",
    id_coffin: "",
    burial_place: "",
    service_improvement: "",
    holder_relationship: "",
    cetificate_number: 0,
    date: 0,
    present: "",
    funeral: "",
    place: "",
    holder_name: "",
  },
};

const RequestDetail = ({ id }: { id: string }) => {
  const [updateData, setUpdateData] = useState(initialData);
  const dispatch = useAppDispatch();
  const request = useAppSelector(getRequest);
  const places = useAppSelector(getplace);
  const prevRequest = useRef(request);

  const route = useRouter()

  useEffect(() => {
    getRequestById(dispatch, id);
    getAllPlaces(dispatch)
  }, []);

  useEffect(() => {
    if (
      prevRequest.current.request.id === id ||
      prevRequest.current !== request
    ) {
      setUpdateData(request);
      prevRequest.current = request;
    }
  }, [request]);

  return (
    <div className={styles.container}>
      {updateData === initialData ? (
        <Loading />
      ) : (
        <div className={styles.secondContainer}>
          <div className={styles.card}>
            <div className={styles.deleteBtn}>
              <DeleteBtn
                onClick={()=>handleDeleteRequest(id, route)}
              />
            </div>
            <div className={styles.title}>Detalle:</div>
            <div className={styles.items}>
              <div className={styles.subItems}>
                <div className={styles.subTitle}>Fecha:</div>
                <div className={styles.text}>
                  {new Date(updateData.request.date).toLocaleDateString("es")}
                </div>
              </div>
              <div className={styles.subItems}>
                <div className={styles.subTitle}>Lugar:</div>
                <div className={styles.text}>{updateData.request.place}</div>
              </div>
            </div>
            <div className={styles.items}>
              <div className={styles.subItems}>
                <div className={styles.subTitle}>Apellido y Nombre:</div>
                <div className={styles.text}>{updateData.deceased.name}</div>
              </div>
            </div>
            <div className={styles.items}>
              <div className={styles.subItems}>
                <div className={styles.subTitle}>Lugar de fallecimiento:</div>
                <div className={styles.text}>{updateData.deceased.pod}</div>
              </div>
            </div>
            <div className={styles.items}>
              <div className={styles.subItems}>
                <div className={styles.subTitle}>Fecha:</div>
                <div className={styles.text}>
                  {new Date(updateData.deceased.dod).toLocaleDateString("es")}
                </div>
              </div>
              <div className={styles.subItems}>
                <div className={styles.subTitle}>Hora:</div>
                <div className={styles.text}>{`${
                  new Date(updateData.deceased.dod).getHours() < 10
                    ? "0" + new Date(updateData.deceased.dod).getHours()
                    : new Date(updateData.deceased.dod).getHours()
                } : ${
                  new Date(updateData.deceased.dod).getMinutes() < 10
                    ? "0" + new Date(updateData.deceased.dod).getMinutes()
                    : new Date(updateData.deceased.dod).getMinutes()
                }`}</div>
              </div>
            </div>
            <div className={styles.items}>
              <div className={styles.subItems}>
                <div className={styles.subTitle}>Fecha de nacimiento:</div>
                <div className={styles.text}>
                  {new Date(updateData.deceased.dob).toLocaleDateString("es")}
                </div>
              </div>
              <div className={styles.subItems}>
                <div className={styles.subTitle}>DNI:</div>
                <div className={styles.text}>{updateData.deceased.dni}</div>
              </div>
            </div>
            <div className={styles.items}>
              <div className={styles.subItems}>
                <div className={styles.subTitle}>Lugar de velatorio:</div>
                <div className={styles.text}>{updateData.request.funeral}</div>
              </div>
            </div>
            <div className={styles.items}>
              <div className={styles.subItems}>
                <div className={styles.subTitle}>Nombre del titular:</div>
                <div className={styles.text}>
                  {updateData.request.holder_name}
                </div>
              </div>
            </div>
            <div className={styles.items}>
              <div className={styles.subItems}>
                <div className={styles.subTitle}>Parentesco del titular:</div>
                <div className={styles.text}>
                  {updateData.request.holder_relationship}
                </div>
              </div>
            </div>
            <div className={styles.items}>
              <div className={styles.subItems}>
                <div className={styles.subTitle}>N° de Certificado:</div>
                <div className={styles.text}>
                  {updateData.request.cetificate_number}
                </div>
              </div>
              <div className={styles.subItems}>
                <div className={styles.subTitle}>Póliza:</div>
                <div className={styles.text}>{updateData.request.policy}</div>
              </div>
            </div>
            <div className={styles.items}>
              <div className={styles.subItems}>
                <div className={styles.subTitle}>Forma que paga el seguro:</div>
                <div className={styles.text}>
                  {updateData.request.way_to_pay}
                </div>
              </div>
            </div>
            <div className={styles.items}>
              <div className={styles.subItems}>
                <div className={styles.subTitle}>Convenio:</div>
                <div className={styles.text}>
                  {updateData.request.agreement}
                </div>
              </div>
            </div>
            <div className={styles.items}>
              <div className={styles.subItems}>
                <div className={styles.subTitle}>Ataúd:</div>
                <div className={styles.text}>
                  <pre
                    style={{
                      fontFamily:
                        "Cambria, Cochin, Georgia, Times, 'Times New Roman', serif",
                    }}
                  >
                    {decomposeId(updateData.request.id_coffin, places)}
                  </pre>
                </div>
              </div>
            </div>
            <div className={styles.items}>
              <div className={styles.subItems}>
                <div className={styles.subTitle}>Adicional:</div>
                <div className={styles.text}>
                  {updateData.request.additional}
                </div>
              </div>
            </div>
            <div className={styles.items}>
              <div className={styles.subItems}>
                <div className={styles.subTitle}>Corona:</div>
                <div className={styles.text}>
                  {updateData.request.wreath ? "Si" : "No"}
                </div>
              </div>
            </div>
            <div className={styles.items}>
              <div className={styles.subItems}>
                <div className={styles.subTitle}>Presente de funeral:</div>
                <div className={styles.text}>{updateData.request.present}</div>
              </div>
            </div>
            <div className={styles.items}>
              <div className={styles.subItems}>
                <div className={styles.subTitle}>Cementerio:</div>
                <div className={styles.text}>
                  {updateData.request.cementery}
                </div>
              </div>
            </div>
            <div className={styles.items}>
              <div className={styles.subItems}>
                <div className={styles.subTitle}>Lugar de inhumación:</div>
                <div className={styles.text}>
                  {updateData.request.burial_place}
                </div>
              </div>
              <div className={styles.subItems}>
                <div className={styles.subTitle}>Hora:</div>
                <div className={styles.text}>
                  {updateData.request.burial_time}
                </div>
              </div>
            </div>
            <div className={styles.items}>
              <div className={styles.subItems}>
                <div className={styles.subTitle}>Revestimiento:</div>
                <div className={styles.text}>{updateData.request.cladding}</div>
              </div>
            </div>
            <div className={styles.items}>
              <div className={styles.subItems}>
                <div className={styles.subTitle}>
                  Mejoramiento del servicio:
                </div>
                <div className={styles.text}>
                  {updateData.request.service_improvement}
                </div>
              </div>
            </div>
            <div className={styles.items}>
              <div className={styles.subItems}>
                <div className={styles.subTitle}>Texto Placa:</div>
                <div className={styles.text}>{updateData.deceased.leyend}</div>
              </div>
            </div>
            <div className={styles.items}>
              <div className={styles.subItems}>
                <div className={styles.subTitle}>Esquela:</div>
                <div className={styles.text}>
                  {updateData.deceased.news_paper}
                </div>
              </div>
            </div>
            <div className={styles.items}>
              <div className={styles.subItems}>
                <div className={styles.subTitle}>Nombre del Diario:</div>
                <div className={styles.text}>
                  {updateData.deceased.news_paper_name}
                </div>
              </div>
            </div>
          </div>
          <SmallBtn
            title={"Generar PDF"}
            onClick = {()=>route.push(`/requests/pdf/${id}`)}
          />
        </div>
      )}
    </div>
  );
};
export default RequestDetail;
