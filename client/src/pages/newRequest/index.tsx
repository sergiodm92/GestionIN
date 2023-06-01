import { useEffect, useState } from "react";
import { initialRequest, initialDate, initialCoffin, initialDeceased} from "./components/initialStates";
import { handleSubmit } from "./components/functions";
import FormDeceased from "./components/formDeceased";
import FormRequest from "./components/formRequest";
import { FormButton } from "../../components/Buttons";
import styles from "./styles/newRequest.module.css"
import { useAppDispatch, useAppSelector } from "../../store/hooks";
import { getStock } from "../../store/Slices/stockSlice";
import { getAllStock } from "../stock/functions";
import { getAllPlaces } from "../places/functions";
import { getplace } from "../../store/Slices/place";

const NewRequest = () => {

  const [deceased, setDeceased] = useState(initialDeceased);
  const [date, setDate] = useState(initialDate);
  const [birthDate, setBirthDate] = useState(initialDate);
  const [request, setRequest] = useState(initialRequest);
  const [currentDate, setCurrentDate] = useState(initialDate);
  const [coffin, setCoffin] = useState(initialCoffin);
  const [isOn, setIsOn] = useState(false);
  const [isOnBox, setIsOnBox] = useState(false);

  const dispatch = useAppDispatch()

  const stock = useAppSelector(getStock)
  const places = useAppSelector(getplace)

  useEffect(()=>{
    getAllStock(dispatch)
    getAllPlaces(dispatch)
  },[])

  return (
    <div className={styles.container}>
      <div className={styles.title}>Nueva Solicitud de Siniestro</div>
      <form onSubmit={(e) => handleSubmit(e, deceased, request, date, birthDate, currentDate, coffin, isOn)} className={styles.form}>
          <FormDeceased
            deceased={deceased}
            setDeceased={setDeceased}
            date={date}
            setDate={setDate}
            birthDate={birthDate}
            setBirthDate={setBirthDate}
          />
          <FormRequest
            isOn={isOn}
            setIsOn={setIsOn}
            isOnBox={isOnBox}
            setIsOnBox={setIsOnBox}
            places={places}
            stock={stock}
            request={request}
            setRequest={setRequest}
            currentDate={currentDate}
            setCurrentDate={setCurrentDate}
            coffin={coffin}
            setCoffin={setCoffin}
          />
          <div className={styles.buttonContainer}>
            <FormButton
              title={"Guardar"}
            />
          </div>
      </form>
    </div>
  );
};
export default NewRequest;