import {
  handleDateChange,
  handleDeceasedChange,
} from "./functions";
import { FormDeceased } from "../../../types/requestsInterfaces";
import styles from "../styles/newRequest.module.css";
import { cementeryType } from "../../../components/arrays";

const FormDeceased = (data: FormDeceased) => {
  const { deceased, setDeceased, date, setDate, birthDate, setBirthDate } =
    data;
  return (
    <div className={styles.formContainer}>
      <div className={styles.formRow}>
        <div>Apellido y Nombre:</div>
        <input
          className={styles.input}
          style={{ width: "calc(100% - 135px)" }}
          type="text"
          id="name"
          name="name"
          value={deceased.name}
          onChange={(e) => handleDeceasedChange(e, deceased, setDeceased)}
          placeholder="Apellido/s Nombre/s"
        />
      </div>
      <div className={styles.formRow}>
        <div>Lugar de fallecimiento: </div>
        <input
          className={styles.input}
          style={{ width: "calc(100% - 157px)" }}
          type="text"
          id="pod"
          name="pod"
          value={deceased.pod}
          onChange={(e) => handleDeceasedChange(e, deceased, setDeceased)}
        />        
      </div>
      <div className={styles.formRow}>
        <div>Fecha: </div>
        <div className={styles.dateRow}>
          <input
            type="date"
            id="day"
            name="day"
            value={date.day}
            className={styles.dateInput}
            onChange={(e) => handleDateChange(e, date, setDate)}
          />
        </div>
        <div>Hora: </div>
        <input
          className={styles.inputDate}
          type="text"
          id="time"
          name="time"
          value={date.time}
          onChange={(e) => handleDateChange(e, date, setDate)}
          placeholder="00:00"
        />
      </div>
      <div className={styles.formRow}>
        <div>Fecha de nacimiento: </div>
        <div className={styles.dateRow}>
        <input
            type="date"
            id="birthDate"
            name="birthDate"
            value={birthDate}
            className={styles.dateInput}
            onChange={(e) => {
              e.preventDefault()
              setBirthDate(e.target.value)
            }}
          />
        </div>
      </div>
      <div className={styles.formRow}>
        <div>DNI: </div>
        <input
          className={styles.input}
          type="text"
          id="dni"
          name="dni"
          value={deceased.dni}
          onChange={(e) => handleDeceasedChange(e, deceased, setDeceased)}
        />
      </div>
      <div>
        <div>Texto de Placa: </div>
        <textarea
            className={styles.textArea}
            id="leyend"
            name="leyend"
            value={deceased.leyend}
            onChange={(e) => handleDeceasedChange(e, deceased, setDeceased)}
          />
      </div>
      <div>
        <div>Esquela (Diario): </div>
        <textarea
              className={styles.textArea}
              id="news_paper"
              name="news_paper"
              value={deceased.news_paper}
              onChange={(e) => handleDeceasedChange(e, deceased, setDeceased)}
            />
      </div>
      <div className={styles.formRow}>
        <div>Nombre del Diario: </div>
        <input
              className={styles.input}
              style={{ width: "calc(100% - 134px)" }}
              type="text"
              id="news_paper_name"
              name="news_paper_name"
              value={deceased.news_paper_name}
              onChange={(e) => handleDeceasedChange(e, deceased, setDeceased)}
            />
      </div>
      <div className={styles.formRow}>
        <div>Tipo de cementerio: </div>
        <select
          id="cementeryType"
          className={styles.selects}
          onChange={(e) => handleDeceasedChange(e, deceased, setDeceased)}
        >
          <option defaultValue="-">-</option>
          {cementeryType.length > 0
            ? cementeryType.map((c, i) => (
                <option key={i} value={c}>
                  {c}
                </option>
              ))
            : null}
        </select>
      </div>
    </div>
  );
};
export default FormDeceased;
