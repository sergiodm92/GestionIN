import { FormRequest } from "../../../types/requestsInterfaces";
import { handleCurrentDateChange, handleRequestChange } from "./functions";
import styles from "../styles/newRequest.module.css";
import { useState } from "react";
import { places, types, sizes, colors } from "../../../components/arrays";
import { SwitchBtn } from "../../../components/Buttons";

const FormRequest = (data: FormRequest) => {
  const {
    isOn,
    setIsOn,
    place,
    stock,
    request,
    setRequest,
    currentDate,
    setCurrentDate,
    coffin,
    setCoffin,
  } = data;

  let placeTypes = stock?.map((s) => s.coffin.type);
  let typesArray = [...new Set(placeTypes)];

  const [filteredSizes, setFilteredSizes] = useState<string[]>([]);
  const [filteredColors, setFilteredColors] = useState<string[]>([]);
  const [filteredMetalBoxes, setFilteredMetalBoxes] = useState<string[]>([]);

  const handleToggleSwitch = () => {
    setIsOn(!isOn);
  };

  const handleTypeChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    const selectedType = e.target.value;
    const place_initial = places.find((p) => p.name == place)?.initials;
    const type_inital = types.find((t) => t.name == selectedType)?.initials;

    // Filtrar los tamaños disponibles para el tipo seleccionado
    const sizesArray =
      stock
        ?.filter((s) => s.coffin.type === selectedType)
        .map((s) => s.coffin.size) ?? [];
    setFilteredSizes([...new Set(sizesArray)]);

    // Restablecer la selección de tamaño, color y metal_box
    setCoffin({
      place: { name: place, initials: place_initial },
      type: { name: selectedType, initials: type_inital },
      size: { name: "", initials: "" },
      color: { name: "", initials: "" },
      metal_box: { name: "", initials: "" },
    });
    (document.getElementById("size") as HTMLSelectElement).selectedIndex = 0;
    setFilteredColors([]);
    setFilteredMetalBoxes([]);
  };

  const handleSizeChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    const selectedSize = e.target.value;
    const size_initial = sizes.find((s) => s.name == selectedSize)?.initials;

    // Filtrar los colores disponibles para el tipo y tamaño seleccionados
    const colorsArray =
      stock
        ?.filter(
          (s) =>
            s.coffin.type === coffin.type.name && s.coffin.size === selectedSize
        )
        .map((s) => s.coffin.color) ?? [];
    setFilteredColors([...new Set(colorsArray)]);

    // Restablecer la selección de color y metal_box
    setCoffin((prevCoffin: any) => ({
      ...prevCoffin,
      size: { name: selectedSize, initials: size_initial },
      color: { name: "", initials: "" },
      metal_box: { name: "", initials: "" },
    }));
    setFilteredMetalBoxes([]);
  };

  const handleColorChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    const selectedColor = e.target.value;
    const color_initial = colors.find((c) => c.name == selectedColor)?.initials;

    // Filtrar las opciones de metal_box disponibles para el tipo, tamaño y color seleccionados
    const metalBoxes =
      stock
        ?.filter(
          (s) =>
            s.coffin.type === coffin.type.name &&
            s.coffin.size === coffin.size.name &&
            s.coffin.color === selectedColor
        )
        .map((s) => s.coffin.metal_box.toString()) ?? [];

    setFilteredMetalBoxes([...new Set(metalBoxes)]);

    // Actualizar la selección de color
    setCoffin((prevCoffin: any) => ({
      ...prevCoffin,
      color: { name: selectedColor, initials: color_initial },
      metal_box: { name: "", initials: "" },
    }));
  };

  const handleMetalBoxChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    const selectedMetalBox = e.target.value;
    let metal_box_initial = "";
    if (selectedMetalBox == "true") {
      metal_box_initial = "TR";
    } else if (selectedMetalBox == "false") {
      metal_box_initial = "FS";
    }
    // Actualizar la selección de metal_box
    coffin.metal_box = { name: selectedMetalBox, initials: metal_box_initial };
  };

  return (
    <div className={styles.formContainer}>
      <div className={styles.formLevel}>
        <label>
          Lugar de velatorio:
          <input
            className={styles.input}
            type="text"
            id="funeral"
            name="funeral"
            value={request.funeral}
            onChange={(e) => handleRequestChange(e, request, setRequest)}
          />
        </label>
      </div>
      <div className={styles.formLevel}>
        <label>
          Parentesco del titular:
          <input
            className={styles.input}
            type="text"
            id="holder_relationship"
            name="holder_relationship"
            value={request.holder_relationship}
            placeholder="hijo"
            onChange={(e) => handleRequestChange(e, request, setRequest)}
          />
        </label>
        <label>
          Apellido y Nombre del titular:
          <input
            className={styles.input}
            type="text"
            id="holder_name"
            name="holder_name"
            value={request.holder_name}
            placeholder="Apellido/s Nombre/s"
            onChange={(e) => handleRequestChange(e, request, setRequest)}
          />
        </label>
      </div>
      <div className={styles.formLevel}>
        <label>
          N° de Certificado:
          <input
            className={styles.input}
            type="text"
            id="cetificate_number"
            name="cetificate_number"
            value={request.cetificate_number}
            onChange={(e) => handleRequestChange(e, request, setRequest)}
          />
        </label>
        <label>
          Póliza:
          <input
            className={styles.input}
            type="text"
            id="policy"
            name="policy"
            value={request.policy}
            placeholder="ejmplo: D"
            onChange={(e) => handleRequestChange(e, request, setRequest)}
          />
        </label>
        <label>
          Forma que paga el Seguro:
          <input
            className={styles.input}
            type="text"
            id="way_to_pay"
            name="way_to_pay"
            value={request.way_to_pay}
            onChange={(e) => handleRequestChange(e, request, setRequest)}
          />
        </label>
      </div>
      <div className={styles.formLevel}>
        <label>
          Convenio:
          <input
            className={styles.input}
            type="text"
            id="agreement"
            name="agreement"
            value={request.agreement}
            onChange={(e) => handleRequestChange(e, request, setRequest)}
          />
        </label>
        <label>
          <div>Ataud:</div>
          <div className={styles.coffinDiv}>
            <div>
              <div>Lugar de Depósito: {place}</div>
            </div>
            {/* Select de tipo */}
            <div>
              <div>Tipo:</div>
              <select
                id="type"
                className={styles.input}
                onChange={handleTypeChange}
              >
                <option defaultValue="-">-</option>
                {typesArray.length > 0
                  ? typesArray.map((type, i) => (
                      <option key={i} value={type}>
                        {type}
                      </option>
                    ))
                  : null}
              </select>
            </div>

            {/* Select de tamaño */}
            <div>
              <div>Tamaño:</div>
              <select
                id="size"
                className={styles.input}
                onChange={handleSizeChange}
              >
                <option defaultValue="-">-</option>
                {filteredSizes.length > 0
                  ? filteredSizes.map((size, i) => (
                      <option key={i} value={size}>
                        {size}
                      </option>
                    ))
                  : null}
              </select>
            </div>

            {/* Select de color */}
            <div>
              <div>Color:</div>
              <select
                id="color"
                className={styles.input}
                onChange={handleColorChange}
              >
                <option defaultValue="-">-</option>
                {filteredColors.length > 0
                  ? filteredColors.map((color, i) => (
                      <option key={i} value={color}>
                        {color}
                      </option>
                    ))
                  : null}
              </select>
            </div>
            <div>
              <div>Caja de Metal:</div>
              <select
                id="metal_box"
                className={styles.input}
                onChange={handleMetalBoxChange}
              >
                <option defaultValue="">-</option>
                {filteredMetalBoxes.length > 0 &&
                  filteredMetalBoxes.map((metalBox, i) => (
                    <option
                      key={i}
                      value={metalBox == "true" ? "true" : "false"}
                    >
                      {metalBox == "true" ? "Si" : "No"}
                    </option>
                  ))}
              </select>
            </div>
          </div>
        </label>
      </div>
      <div className={styles.formLevel}>
        <label>
          Adicional:
          <input
            className={styles.input}
            type="text"
            id="additional"
            name="additional"
            value={request.additional}
            onChange={(e) => handleRequestChange(e, request, setRequest)}
          />
        </label>
        <label className={styles.metalBox}>
          Corona:
          <div className={styles.metalBox}>
            <div>No</div>
            <div>
              <SwitchBtn isOn={isOn} onClick={handleToggleSwitch} />
            </div>
            <div>Si</div>
          </div>
        </label>
        <label>
          Presente de funeral:
          <input
            className={styles.input}
            type="text"
            id="present"
            name="present"
            value={request.present}
            onChange={(e) => handleRequestChange(e, request, setRequest)}
          />
        </label>
      </div>
      <div className={styles.formLevel}>
        <label>
          Cementerio:
          <input
            className={styles.input}
            type="text"
            id="cementery"
            name="cementery"
            value={request.cementery}
            onChange={(e) => handleRequestChange(e, request, setRequest)}
          />
        </label>
      </div>
      <div className={styles.formLevel}>
        <label>
          Lugar de inhumación:
          <input
            className={styles.input}
            type="text"
            id="burial_place"
            name="burial_place"
            value={request.burial_place}
            onChange={(e) => handleRequestChange(e, request, setRequest)}
          />
        </label>
        <label>
          Hora:
          <input
            className={styles.inputDate}
            type="text"
            id="burial_time"
            name="burial_time"
            value={request.burial_time}
            placeholder="00:00"
            onChange={(e) => handleRequestChange(e, request, setRequest)}
          />
        </label>
      </div>
      <div className={styles.formLevel}>
        <label>
          Revestimiento:
          <input
            className={styles.input}
            type="text"
            id="cladding"
            name="cladding"
            value={request.cladding}
            onChange={(e) => handleRequestChange(e, request, setRequest)}
          />
        </label>
        <label>
          Mejoramiento del servicio:
          <input
            className={styles.input}
            type="text"
            id="service_improvement"
            name="service_improvement"
            value={request.service_improvement}
            onChange={(e) => handleRequestChange(e, request, setRequest)}
          />
        </label>
      </div>
      <div className={styles.formLevel}>
        <label>
          Fecha:
          <input
            className={styles.inputDate}
            type="text"
            id="day3"
            name="day"
            value={currentDate.day}
            onChange={(e) =>
              handleCurrentDateChange(e, currentDate, setCurrentDate)
            }
            placeholder="dd"
          />
          <input
            className={styles.inputDate}
            type="text"
            id="month3"
            name="month"
            value={currentDate.month}
            onChange={(e) =>
              handleCurrentDateChange(e, currentDate, setCurrentDate)
            }
            placeholder="mm"
          />
          <input
            className={styles.inputDate}
            type="text"
            id="year3"
            name="year"
            value={currentDate.year}
            onChange={(e) =>
              handleCurrentDateChange(e, currentDate, setCurrentDate)
            }
            placeholder="yyyy"
          />
        </label>
        <label>
          Lugar:
          <input
            className={styles.input}
            type="text"
            id="place"
            name="place"
            value={request.place}
            onChange={(e) => handleRequestChange(e, request, setRequest)}
          />
        </label>
      </div>
    </div>
  );
};
export default FormRequest;
