import React, { useEffect } from "react";
import { useAppDispatch, useAppSelector } from "../../store/hooks";
import { getAllPlaces } from "../../components/functions/places";
import { getplace } from "../../store/Slices/place";
import styles from "./help.module.css"; // Importa los estilos CSS del archivo help.module.css
import { colors, metalBox, sizes, types } from "../../components/arrays";

const Help = () => {
  const dispatch = useAppDispatch();

  useEffect(() => {
    getAllPlaces(dispatch);
  }, []);

  const places = useAppSelector(getplace);

  return (
    <div className={styles.container}>
      <div>
        <table className={styles.table}>
          <thead>
            <tr>
              <th>Símbolo</th>
              <th>Lugares</th>
            </tr>
          </thead>
          <tbody>
            {places?.map((name, i) => (
              <tr key={i}>
                <td>{name.initials}</td>
                <td>{name.name}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
      <div>
        <table className={styles.table}>
          <thead>
            <tr>
              <th>Símbolo</th>
              <th>Tipos</th>
            </tr>
          </thead>
          <tbody>
            {types?.map((type, i) => (
              <tr key={i}>
                <td>{type.initials}</td>
                <td>{type.name}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
      <div>
        <table className={styles.table}>
          <thead>
            <tr>
              <th>Símbolo</th>
              <th>Tamaños</th>
            </tr>
          </thead>
          <tbody>
            {sizes?.map((size, i) => (
              <tr key={i}>
                <td>{size.initials}</td>
                <td>{size.name}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
      <div>
        <table className={styles.table}>
          <thead>
            <tr>
              <th>Símbolo</th>
              <th>Colores</th>
            </tr>
          </thead>
          <tbody>
            {colors?.map((color, i) => (
              <tr key={i}>
                <td>{color.initials}</td>
                <td>{color.name}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
      <div>
        <table className={styles.table}>
          <thead>
            <tr>
              <th>Símbolo</th>
              <th>Caja metálica</th>
            </tr>
          </thead>
          <tbody>
            {metalBox?.map((box, i) => (
              <tr key={i}>
                <td>{box.initials}</td>
                <td>{box.name}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default Help;
