import { useEffect, useState } from "react";
import { GetServerSideProps } from 'next';
import { initialRequest, initialDate, initialCoffin, initialDeceased} from "../components/initialStates";
import { handleSubmit } from "../components/functions";
import FormDeceased from "../components/formDeceased";
import FormRequest from "../components/formRequest";
import { FormButton } from "../../../components/Buttons";
import styles from "../styles/newRequest.module.css";
import { useAppDispatch, useAppSelector } from "../../../store/hooks";
import { getStock } from "../../../store/Slices/stockSlice";
import { getStockByPlace } from "../../stock/functions";

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

const NewRequest = ({ place }: { place: string }) => {

  const [deceased, setDeceased] = useState(initialDeceased);
  const [date, setDate] = useState(initialDate);
  const [birthDate, setBirthDate] = useState(initialDate);
  const [request, setRequest] = useState(initialRequest);
  const [currentDate, setCurrentDate] = useState(initialDate);
  const [coffin, setCoffin] = useState(initialCoffin);

  const dispatch = useAppDispatch()

  const stock = useAppSelector(getStock)

  useEffect(()=>{
    getStockByPlace(dispatch, place)
  },[])

  return (
    <div className={styles.container}>
      <div className={styles.title}>Nueva Solicitud de Siniestro</div>
      <form onSubmit={(e) => handleSubmit(e, deceased, request, date, birthDate, currentDate, coffin)} className={styles.form}>
        <div >
          <FormDeceased
            deceased={deceased}
            setDeceased={setDeceased}
            date={date}
            setDate={setDate}
            birthDate={birthDate}
            setBirthDate={setBirthDate}
          />
          <FormRequest
            place={place}
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
        </div>
      </form>
    </div>
  );
};
export default NewRequest;
