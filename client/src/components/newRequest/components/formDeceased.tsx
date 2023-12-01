import {
  cementerySelect,
  cementeryTypeSelect,
  handleDateChange,
  handleDeceasedChange,
  levelSelect,
} from "../../functions/newRequest/functions";
import { FormDeceased } from "../../../types/requestsInterfaces";
import styles from "../../../pages/newRequest/styles/newRequest.module.css";
import { cementeryType } from "../../arrays";
import { cementery_type1 } from "../../../utils/constants";
import { useRouter } from "next/router";

const FormDeceased = (data: FormDeceased) => {
  
  const { deceased, setDeceased, date, setDate, birthDate, setBirthDate, cementeries } = data;

  const router = useRouter()

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
          value={date.time.trim()}
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
          value={deceased.dni.trim()}
          onChange={(e) => handleDeceasedChange(e, deceased, setDeceased)}
        />
      </div>
      {/* <div>
        <div>Texto de Placa: </div>
        <textarea
            className={styles.textArea}
            id="leyend"
            name="leyend"
            value={deceased.leyend==="-"?"":deceased.leyend}
            onChange={(e) => handleDeceasedChange(e, deceased, setDeceased)}
          />
      </div> */}
      <div>
        <div>Esquela (Diario): </div>
        <textarea
              className={styles.textArea}
              id="news_paper"
              name="news_paper"
              value={deceased.news_paper==="-"?"":deceased.news_paper}
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
          id="cementery_type"
          className={styles.selects}
          onChange={(e)=>cementeryTypeSelect(e, setDeceased, deceased)}
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
      <div className={styles.formRow}>
        <div>Cementerio: </div>
        <select
          id="cementery"
          className={styles.selects}
          onChange={(e)=>cementerySelect(e, setDeceased, deceased)}
        >
          <option defaultValue="-">-</option>
          {cementeries.length > 0
            ? cementeries.map((c, i) => (
                <option key={i} value={c.name}>
                  {c.name}
                </option>
              ))
            : null}
        </select>
        <div  className={styles.newCementery} onClick={()=>router.push('/settings/cementeries')}>Agregar cementerio</div>
      </div>
      {deceased.cementery_type === cementery_type1?
      (
        <>
          <div className={styles.formRow}>
            <div>Sector: </div>
            <input
                  className={styles.input}
                  style={{ width: "calc(100% - 62px)" }}
                  type="text"
                  id="sector"
                  name="sector"
                  value={deceased.sector}
                  onChange={(e) => handleDeceasedChange(e, deceased, setDeceased)}
                />
          </div>
          <div className={styles.formRow}>
            <div>Parcela: </div>
            <input
                  className={styles.input}
                  style={{ width: "calc(100% - 70px)" }}
                  type="text"
                  id="parcel"
                  name="parcel"
                  value={deceased.parcel}
                  onChange={(e) => handleDeceasedChange(e, deceased, setDeceased)}
                />
          </div>
          <div className={styles.formRow}>
            <div>Nivel: </div>
            <select
              id="level"
              className={styles.selects}
              onChange={(e)=>levelSelect(e, setDeceased, deceased)}
            >
              <option key={0} defaultValue="-">-</option>
              <option key={1} value={1}>1</option>
              <option key={2} value={2}>2</option>
              <option key={3} value={3}>3</option>
            </select>
          </div>
          {deceased.level==2?(
            <>
              <div className={styles.formRow}>
                <div>1° Nivel: </div>
                <input
                      className={styles.input}
                      style={{ width: "calc(100% - 70px)" }}
                      type="text"
                      id="first_level_name"
                      name="first_level_name"
                      value={deceased.first_level_name}
                      onChange={(e) => handleDeceasedChange(e, deceased, setDeceased)}
                    />
              </div>
            </>
          )
          :deceased.level==3?
          (
            <>
              <div className={styles.formRow}>
                <div>1° Nivel: </div>
                <input
                      className={styles.input}
                      style={{ width: "calc(100% - 70px)" }}
                      type="text"
                      id="first_level_name"
                      name="first_level_name"
                      value={deceased.first_level_name}
                      onChange={(e) => handleDeceasedChange(e, deceased, setDeceased)}
                    />
              </div>
              <div className={styles.formRow}>
                <div>2° Nivel: </div>
                <input
                      className={styles.input}
                      style={{ width: "calc(100% - 70px)" }}
                      type="text"
                      id="second_level_name"
                      name="second_level_name"
                      value={deceased.second_level_name}
                      onChange={(e) => handleDeceasedChange(e, deceased, setDeceased)}
                    />
              </div>
            </>
          )
          :null}
          <div className={styles.formRow}>
            <div>Simbolo de la Religion: </div>
            <input
                  className={styles.input}
                  style={{ width: "calc(100% - 160px)" }}
                  type="text"
                  id="religion_symbol"
                  name="religion_symbol"
                  value={deceased.religion_symbol}
                  onChange={(e) => handleDeceasedChange(e, deceased, setDeceased)}
                />
          </div>
        </>
      )
      :null
      }
      
    </div>
  );
};
export default FormDeceased;
