import { useEffect, useState } from "react";
import { initialRequest, initialDate, initialCoffin, initialDeceased} from "../../components/initialState/newRequest/initialStates";
import { handleSubmit } from "../../components/functions/newRequest/functions";
import FormDeceased from "../../components/newRequest/components/formDeceased";
import FormRequest from "../../components/newRequest/components/formRequest";
import { FormButton } from "../../components/Buttons";
import styles from "./styles/newRequest.module.css"
import { useAppDispatch, useAppSelector } from "../../store/hooks";
import { getAllPlaces } from "../../components/functions/places";
import { getplace } from "../../store/Slices/place";
import Loading from "../../components/Loading/loading";
import { getCementery } from "../../store/Slices/cementery";
import { getCementeriesByType } from "../../components/functions/cementeries";

const NewRequest = () => {

  const [deceased, setDeceased] = useState(initialDeceased);
  const [date, setDate] = useState(initialDate);
  const [birthDate, setBirthDate] = useState("");
  const [request, setRequest] = useState(initialRequest);
  const [currentDate, setCurrentDate] = useState("");
  const [coffin, setCoffin] = useState(initialCoffin);
  const [isOn, setIsOn] = useState(false);
  const [isLoading, setIsLoading] = useState(false);

  const dispatch = useAppDispatch()
  const places = useAppSelector(getplace)
  const cementeries = useAppSelector(getCementery)

  useEffect(()=>{
    getAllPlaces(dispatch)
  },[])

  useEffect(()=>{
    getCementeriesByType( dispatch, deceased.cementery_type)
  },[deceased.cementery_type])

  return (
    <div className={styles.container}>
      <div className={styles.title}>Nueva Solicitud de Siniestro</div>
      <form onSubmit={(e) => handleSubmit(e, deceased, request, date, birthDate, currentDate, coffin, isOn, setIsLoading)} className={styles.form}>
          <FormDeceased
            deceased={deceased}
            setDeceased={setDeceased}
            date={date}
            setDate={setDate}
            birthDate={birthDate}
            setBirthDate={setBirthDate}
            cementeries={cementeries}
          />
          <FormRequest
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
              title={isLoading? <Loading/> :"Guardar"}
              loading={isLoading}
              disabled={isLoading}
            />
          </div>
      </form>
    </div>
  );
};
export default NewRequest;