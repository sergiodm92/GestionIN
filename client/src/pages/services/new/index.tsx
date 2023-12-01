import { useEffect, useState } from "react";
import { handleSubmitServices } from "../../../components/functions/newRequest/functions";
import FormDeceasedService from "../../../components/newRequestService/formDeceasedService";
import FormRequestService from "../../../components/newRequestService/formRequestService";
import { FormButton } from "../../../components/Buttons";
import styles from "./styles/newRequest.module.css";
import { useAppDispatch, useAppSelector } from "../../../store/hooks";
import { getAllPlaces } from "../../../components/functions/places";
import { getplace } from "../../../store/Slices/place";
import Loading from "../../../components/Loading/loading";
import { getCementery } from "../../../store/Slices/cementery";
import { getCementeriesByType } from "../../../components/functions/settings/cementeries";

const NewRequestService = () => {
  const initialRequest = {
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
    products: [],
    burial_place: "",
    burial_time: "",
    cladding: "",
    service_improvement: "",
    company: "",
  };
  const initialDeceased = {
    id: "",
    id_doc: "",
    id_request: "",
    name: "",
    dob: 0,
    dod: 0,
    pod: "",
    dni: "",
    leyend: "-",
    news_paper: "-",
    news_paper_name: "",
    tombstone: "null",
    cementery: "",
    cementery_type: "",
    sector: "",
    parcel: "",
    level: 0,
    first_level_name: "",
    second_level_name: "",
    religion_symbol: "",
  };
  const initialDate = {
    day: "",
    time: "",
  };
  const initialCoffin = {
    id_add: "",
    place: { name: "", initials: "" },
    type: { name: "", initials: "" },
    size: { name: "", initials: "" },
    color: { name: "", initials: "" },
    metal_box: { name: "", initials: "" },
  };

  const [deceased, setDeceased] = useState(initialDeceased);
  const [date, setDate] = useState(initialDate);
  const [birthDate, setBirthDate] = useState("");
  const [request, setRequest] = useState(initialRequest);
  const [currentDate, setCurrentDate] = useState("");
  const [coffin, setCoffin] = useState(initialCoffin);
  const [isOn, setIsOn] = useState(false);
  const [isLoading, setIsLoading] = useState(false);

  const dispatch = useAppDispatch();
  const places = useAppSelector(getplace);
  const cementeries = useAppSelector(getCementery);

  useEffect(() => {
    getAllPlaces(dispatch);
  }, []);

  useEffect(() => {
    getCementeriesByType(dispatch, deceased.cementery_type);
  }, [deceased.cementery_type]);

  return (
    <div className={styles.container}>
      <div className={styles.title}>Solicitud de Siniestro para Servicio</div>
      <form
        onSubmit={(e) =>
          handleSubmitServices(
            e,
            deceased,
            setDeceased,
            initialDeceased,
            request,
            setRequest,
            initialRequest,
            date,
            birthDate,
            currentDate,
            setBirthDate,
            setDate,
            setCurrentDate,
            initialDate,
            coffin,
            isOn,
            setIsLoading
          )
        }
        className={styles.form}
      >
        <FormDeceasedService
          deceased={deceased}
          setDeceased={setDeceased}
          date={date}
          setDate={setDate}
          birthDate={birthDate}
          setBirthDate={setBirthDate}
          cementeries={cementeries}
        />
        <FormRequestService
          isOn={isOn}
          setIsOn={setIsOn}
          places={places}
          request={request}
          setRequest={setRequest}
          currentDate={currentDate}
          setCurrentDate={setCurrentDate}
          coffin={coffin}
          setCoffin={setCoffin}
        />
        <div className={styles.buttonContainer}>
          <FormButton
            title={isLoading ? <Loading /> : "Guardar"}
            loading={isLoading}
            disabled={isLoading}
          />
        </div>
      </form>
    </div>
  );
};
export default NewRequestService;
