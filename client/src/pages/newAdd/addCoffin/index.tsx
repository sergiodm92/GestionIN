import React, { useState, useEffect } from "react";
import { addCoffinInicialState, initialCoffin, initialMetalBox } from "../../../components/initialState/addCoffin/initialStates";
import { addHandleSubmit, handleAddChange, handleCoffinColor, handlePlace, handleCoffinSize, handleCoffinType, handleCoffinChange, coffinGroupHandleSubmit, handleMboxSize, handleMboxChange, mboxGroupHandleSubmit } from "../../../components/functions/addCoffin/functions";
import { types, sizes, colors } from "../../../components/arrays";
import { AddBtn, FormButton, SwitchBtn } from "../../../components/Buttons";
import { getAllPlaces } from "../../../components/functions/places";
import { useAppDispatch, useAppSelector } from "../../../store/hooks";
import { getplace } from "../../../store/Slices/place";
import styles from "../styles/newAdd.module.css";
import Loading from "../../../components/Loading/loading";
import { Coffin } from "../../../types/addsInterfaces";
import { Mbox } from "../../../types/interfaces";
import { getUser, setLoginData } from '../../../store/Slices/userSlice'
import { useRouter } from 'next/navigation'

const AddCoffin = () => {

  const dispatch = useAppDispatch();

  const [add, setAdd] = useState(addCoffinInicialState);
  const [date, setDate] = useState("");
  const [coffin, setCoffin] = useState(initialCoffin);
  const [mbox, setMbox] = useState(initialMetalBox);
  const [isOn, setIsOn] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [isLoadingGroup, setIsLoadingGroup] = useState(false);
  const [cleanForm, setCleanForm] = useState(false);
  const router = useRouter()

  const places = useAppSelector(getplace);
  const user = useAppSelector(getUser)

  const handleToggleSwitch = () => {
    setIsOn(!isOn);
  };

  useEffect(() => {
    getAllPlaces(dispatch);
    if(!user.admin)router.push("/")
  }, []);

  useEffect(() => {
    // (document.getElementById("place") as HTMLSelectElement).selectedIndex = 0;
    setAdd(addCoffinInicialState)
  },[cleanForm])


  return (
    <div className={styles.container}>
      <div className={styles.title}>Nuevo Ingreso de Ataúd</div>
      <form
        onSubmit={(e) => addHandleSubmit(e, date, add, setIsLoading, setCleanForm)}
        className={styles.formContainer}
      >
        <div className={styles.dateRow}>
          <div>Fecha: </div>
          <input
            type="date"
            id="date"
            name="date"
            value={date}
            className={styles.dateInput}
            onChange={(e) => {
              e.preventDefault()
              setDate(e.target.value)
            }}
          />
        </div>
        <div className={styles.formRow}>
          <div>Lugar de Depósito:</div>
          <select
            id="place"
            className={styles.input}
            onChange={(e) => handlePlace(e, add, setAdd)}
          >
            <option defaultValue={"-"}>-</option>
            {places.map((p, i) => (
              <option key={i} value={p.name}>
                {p.name}
              </option>
            ))}
          </select>
        </div>
        <div className={styles.formRow}>
          <div>Responsable:</div>
          <input
            className={styles.input}
            type="text"
            id="responsible"
            name="responsible"
            value={add.responsible}
            onChange={(e) => handleAddChange(e, add, setAdd)}
          />
        </div>
        <div>Ataúd:</div>
        <div className={styles.coffinGroup}>
          <div className={styles.formRow}>
            <div>Tipo:</div>
            <select
              id="type"
              className={styles.input}
              onChange={(e) => handleCoffinType(e, coffin, setCoffin)}
            >
              <option defaultValue={"-"}>-</option>
              {types.map((t, i) => (
                <option key={i} value={t.name}>
                  {t.name}
                </option>
              ))}
            </select>
          </div>
          <div className={styles.formRow}>
            <div>Tamaño:</div>
            <select
              id="size"
              className={styles.input}
              onChange={(e) => handleCoffinSize(e, coffin, setCoffin)}
            >
              <option defaultValue={"-"}>-</option>
              {sizes.map((s, i) => (
                <option key={i} value={s.name}>
                  {s.name}
                </option>
              ))}
            </select>
          </div>
          <div className={styles.formRow}>
            <div>Color:</div>
            <select
              id="color"
              className={styles.input}
              onChange={(e) => handleCoffinColor(e, coffin, setCoffin)}
            >
              <option defaultValue={"-"}>-</option>
              {colors.map((c, i) => (
                <option key={i} value={c.name}>
                  {c.name}
                </option>
              ))}
            </select>
          </div>
          <div className={styles.formRow}>
            <div>Caja metálica:</div>
            <div className={styles.metalBox}>
              <div>No</div>
              <div className={styles.switchBtnContainer}>
                <SwitchBtn isOn={isOn} onClick={handleToggleSwitch} />
              </div>
              <div>Si</div>
            </div>
          </div>
          <div className={styles.formRow}>
            <div>Unidades:</div>
            <input
              className={styles.input}
              type="number"
              id="units"
              name="units"
              value={coffin.units ? coffin.units : ""}
              onChange={(e) => handleCoffinChange(e, coffin, setCoffin)}
            />
          </div>
          <div className={styles.formRow}>
            <div>Proveedor:</div>
            <input
              className={styles.input}
              type="text"
              id="supplier"
              name="supplier"
              value={coffin.supplier}
              onChange={(e) => handleCoffinChange(e, coffin, setCoffin)}
            />
          </div>
          <div className={styles.buttonContainer}>
            <AddBtn
              title={isLoadingGroup ? <Loading /> : "Agregar"}
              loading={isLoadingGroup}
              disabled={isLoadingGroup}
              onClick={(e: any) => {
                coffinGroupHandleSubmit(e, coffin, add, setCoffin, types, sizes, colors, places, setIsLoadingGroup, isOn, setIsOn)
              }}
            />
          </div>
          {
            add.coffins.length ?
              add.coffins.map((c: Coffin, i) => {
                return (
                  <div className={styles.card} key={i}>
                    <div className={styles.formRow}>
                      <div>Tipo: </div>
                      <div>{c.type}</div>
                    </div>
                    <div className={styles.formRow}>
                      <div>Tamaño: </div>
                      <div>{c.size}</div>
                    </div>
                    <div className={styles.formRow}>
                      <div>Color: </div>
                      <div>{c.color}</div>
                    </div>
                    <div className={styles.formRow}>
                      <div>Caja Metálica: </div>
                      <div>{c.mbox ? "Si" : "No"}</div>
                    </div>
                    <div className={styles.formRow}>
                      <div>Unidades: </div>
                      <div>{c.units}</div>
                    </div>
                    <div className={styles.formRow}>
                      <div>Proveedor: </div>
                      <div>{c.supplier}</div>
                    </div>
                  </div>
                )
              })
              : null
          }
        </div>
        <div>Cajas metálicas:</div>
        <div className={styles.coffinGroup}>
          <div className={styles.formRow}>
            <div>Tamaño:</div>
            <select
              id="mbsize"
              className={styles.input}
              onChange={(e) => handleMboxSize(e, mbox, setMbox)}
            >
              <option defaultValue={"-"}>-</option>
              {sizes.map((s, i) => (
                <option key={i} value={s.name}>
                  {s.name}
                </option>
              ))}
            </select>
          </div>
          <div className={styles.formRow}>
            <div>Unidades:</div>
            <input
              className={styles.input}
              type="number"
              id="mbUnits"
              name="units"
              value={mbox.units ? mbox.units : ""}
              onChange={(e) => handleMboxChange(e, mbox, setMbox)}
            />
          </div>
          <div className={styles.formRow}>
            <div>Proveedor:</div>
            <input
              className={styles.input}
              type="text"
              id="mbsupplier"
              name="supplier"
              value={mbox.supplier}
              onChange={(e) => handleMboxChange(e, mbox, setMbox)}
            />
          </div>
          <div className={styles.buttonContainer}>
            <AddBtn
              title={isLoadingGroup ? <Loading /> : "Agregar"}
              loading={isLoadingGroup}
              disabled={isLoadingGroup}
              onClick={(e: any) => mboxGroupHandleSubmit(e, mbox, add, setMbox, setIsLoadingGroup)}
            />
          </div>
          {
            add.metal_box.length ?
              add.metal_box.map((m: Mbox, i) => {
                return (
                  <div className={styles.card} key={i}>
                    <div className={styles.formRow}>
                      <div>Tamaño: </div>
                      <div>{m.size}</div>
                    </div>
                    <div className={styles.formRow}>
                      <div>Unidades: </div>
                      <div>{m.units}</div>
                    </div>
                    <div className={styles.formRow}>
                      <div>Proveedor: </div>
                      <div>{m.supplier}</div>
                    </div>
                  </div>
                )
              })
              : null
          }
        </div>
        <div className={styles.buttonContainer}>
          <FormButton loading={isLoading} title={isLoading ? <Loading /> : "Guardar"} disabled={isLoading} />
        </div>
      </form>
    </div>
  );
};
export default AddCoffin;
