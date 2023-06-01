import {
  handleBirthDateChange,
  handleDateChange,
  handleDeceasedChange,
} from "./functions";
import { FormDeceased } from "../../../types/requestsInterfaces";
import styles from "../styles/newRequest.module.css";

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
            className={styles.inputDate}
            type="text"
            id="day"
            name="day"
            value={date.day}
            onChange={(e) => handleDateChange(e, date, setDate)}
            placeholder="dd"
          />
          <input
            className={styles.inputDate}
            type="text"
            id="month"
            name="month"
            value={date.month}
            onChange={(e) => handleDateChange(e, date, setDate)}
            placeholder="mm"
          />
          <input
            className={styles.inputDate}
            type="text"
            id="year"
            name="year"
            value={date.year}
            onChange={(e) => handleDateChange(e, date, setDate)}
            placeholder="yyyy"
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
          placeholder="hh:mm"
        />
      </div>
      <div className={styles.formRow}>
        <div>Fecha de nacimiento: </div>
        <div className={styles.dateRow}>
          <input
            className={styles.inputDate}
            type="text"
            id="day2"
            name="day"
            value={birthDate.day}
            onChange={(e) => handleBirthDateChange(e, birthDate, setBirthDate)}
            placeholder="dd"
          />
          <input
            className={styles.inputDate}
            type="text"
            id="month2"
            name="month"
            value={birthDate.month}
            onChange={(e) => handleBirthDateChange(e, birthDate, setBirthDate)}
            placeholder="mm"
          />
          <input
            className={styles.inputDate}
            type="text"
            id="year2"
            name="year"
            value={birthDate.year}
            onChange={(e) => handleBirthDateChange(e, birthDate, setBirthDate)}
            placeholder="yyyy"
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
    </div>
  );
};
export default FormDeceased;
