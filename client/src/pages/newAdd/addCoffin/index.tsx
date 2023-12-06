import React, { useState, useEffect } from "react";
import {
  addHandleSubmit,
  handlePlace,
  handleCoffinChange,
  coffinGroupHandleSubmit,
  handleMboxChange,
  mboxGroupHandleSubmit,
} from "../../../components/functions/addCoffin/functions";
import { AddBtn, FormButton, SwitchBtn } from "../../../components/Buttons";
import { getAllPlaces } from "../../../components/functions/places";
import { useAppDispatch, useAppSelector } from "../../../store/hooks";
import { getplace } from "../../../store/Slices/place";
import styles from "../styles/newAdd.module.css";
import Loading from "../../../components/Loading/loading";
import { Coffin } from "../../../types/addsInterfaces";
import { Mbox } from "../../../types/interfaces";
import { getUser } from "../../../store/Slices/userSlice";
import { useRouter } from "next/navigation";
import { getAllColors, getAllSizes, getAllTypes } from "../../../components/functions/settings/coffinProperty";
import { getColors, getSizes, getTypes } from "../../../store/Slices/coffinProperty";
import { getAllSuppliers } from "../../../components/functions/settings/suppliers";
import { getSuppliers } from "../../../store/Slices/suppliers";

const AddCoffin = () => {
  const dispatch = useAppDispatch();
  const user = useAppSelector(getUser);

  const addCoffinInicialState = {
    id: "",
    date: 0,
    responsible: user.name || "",
    place: "",
    coffins: [],
    metal_box: [],
    status: "",
  };
  const initialCoffin = {
    id: "",
    units: 0,
    type: "",
    size: "",
    color: "",
    mbox: false,
    supplier: "",
  };
  const initialMetalBox = {
    units: 0,
    size: "",
    supplier: "",
  };

  const [add, setAdd] = useState(addCoffinInicialState);
  const [date, setDate] = useState("");
  const [coffin, setCoffin] = useState(initialCoffin);
  const [mbox, setMbox] = useState(initialMetalBox);
  const [isOn, setIsOn] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [isLoadingGroup, setIsLoadingGroup] = useState(false);
  const [cleanForm, setCleanForm] = useState(false);
  const router = useRouter();

  const places = useAppSelector(getplace);
  const types = useAppSelector(getTypes);
  const sizes = useAppSelector(getSizes);
  const colors = useAppSelector(getColors);
  const suppliers = useAppSelector(getSuppliers);


  const handleToggleSwitch = () => {
    setIsOn(!isOn);
  };

  useEffect(() => {
    getAllPlaces(dispatch);
    getAllTypes(dispatch);
    getAllSizes(dispatch);
    getAllColors(dispatch);
    getAllSuppliers(dispatch);
    if (!user.admin) router.push("/");
  }, []);

  useEffect(() => {
    setAdd(addCoffinInicialState);
  }, [cleanForm]);

  return (
    <div className={styles.container}>
      <div className={styles.title}>Nuevo Ingreso de Ataúd</div>
      <form
        onSubmit={(e) =>
          addHandleSubmit(e, date, add, setAdd, setIsLoading, setCleanForm)
        }
        className={styles.formContainer}
      >
        <div className={styles.dateRow}>
          <div>Fecha: </div>
          <input
            type="date"
            id="date1"
            name="date"
            value={date}
            className={styles.dateInput}
            onChange={(e) => {
              e.preventDefault();
              setDate(e.target.value);
            }}
          />
        </div>
        <div className={styles.formRow}>
          <div>Lugar de Depósito:</div>
          <select
            id="place1"
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
        <div>Ataúd:</div>
        <div className={styles.coffinGroup}>
          <div className={styles.formRow}>
            <div>Tipo:</div>
            <select
              id="type"
              name="type"
              className={styles.input}
              onChange={(e) => handleCoffinChange(e, coffin, setCoffin)}
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
              name="size"
              className={styles.input}
              onChange={(e) => handleCoffinChange(e, coffin, setCoffin)}
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
              name="color"
              className={styles.input}
              onChange={(e) => handleCoffinChange(e, coffin, setCoffin)}
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
            <select
              id="supplier1"
              name="supplier"
              className={styles.input}
              onChange={(e) => handleCoffinChange(e, coffin, setCoffin)}
            >
              <option defaultValue={"-"}>-</option>
              {suppliers.map((s, i) => (
                <option key={i} value={s.name}>
                  {s.name}
                </option>
              ))}
            </select>
          </div>
          <div className={styles.buttonContainer}>
            <AddBtn
              title={isLoadingGroup ? <Loading /> : "Agregar"}
              loading={isLoadingGroup}
              disabled={isLoadingGroup}
              onClick={(e: any) => {
                coffinGroupHandleSubmit(
                  e,
                  coffin,
                  add,
                  setCoffin,
                  types,
                  sizes,
                  colors,
                  places,
                  setIsLoadingGroup,
                  isOn,
                  setIsOn
                );
              }}
            />
          </div>
          {add.coffins.length
            ? add.coffins.map((c: Coffin, i) => {
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
              );
            })
            : null}
        </div>
        <div>Cajas metálicas:</div>
        <div className={styles.coffinGroup}>
          <div className={styles.formRow}>
            <div>Tamaño:</div>
            <select
              id="mbsize"
              name="size"
              className={styles.input}
              onChange={(e) => handleMboxChange(e, mbox, setMbox)}
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
            <select
              id="supplier2"
              name="supplier"
              className={styles.input}
              onChange={(e) => handleMboxChange(e, mbox, setMbox)}
            >
              <option defaultValue={"-"}>-</option>
              {suppliers.map((s, i) => (
                <option key={i} value={s.name}>
                  {s.name}
                </option>
              ))}
            </select>
          </div>
          <div className={styles.buttonContainer}>
            <AddBtn
              title={isLoadingGroup ? <Loading /> : "Agregar"}
              loading={isLoadingGroup}
              disabled={isLoadingGroup}
              onClick={(e: any) =>
                mboxGroupHandleSubmit(e, mbox, add, setMbox, setIsLoadingGroup)
              }
            />
          </div>
          {add.metal_box.length
            ? add.metal_box.map((m: Mbox, i) => {
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
              );
            })
            : null}
        </div>
        <div className={styles.buttonContainer}>
          <FormButton
            loading={isLoading}
            title={isLoading ? <Loading /> : "Guardar"}
            disabled={isLoading}
          />
        </div>
      </form>
    </div>
  );
};
export default AddCoffin;
