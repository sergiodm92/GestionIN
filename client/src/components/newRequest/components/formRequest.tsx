import { FormRequest } from "../../../types/requestsInterfaces";
import { handleRequestChange, handleToggleSwitch } from "../../functions/newRequest/functions";
import styles from "../../../pages/newRequest/styles/newRequest.module.css";
import { useState } from "react";
import { types, sizes, colors } from "../../arrays";
import { SwitchBtn } from "../../Buttons";

const FormRequest = (data: FormRequest) => {
  const {
    isOn,
    setIsOn,
    places,
    stock,
    request,
    setRequest,
    currentDate,
    setCurrentDate,
    coffin,
    setCoffin,
  } = data;

  let stockPlaces = stock?.map((s) => s.place);
  let placesArray = [...new Set(stockPlaces)];

  const [filteredTypes, setFilteredTypes] = useState<string[]>([]);
  const [filteredSizes, setFilteredSizes] = useState<string[]>([]);
  const [filteredColors, setFilteredColors] = useState<string[]>([]);
  const [filteredMetalBoxes, setFilteredMetalBoxes] = useState<string[]>([]);

  const handlePlaceChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    const selectedPlace = e.target.value;
    const place_initial = places.find((s) => s.name == selectedPlace)?.initials;

    // Filtrar los tipos disponibles para el lugar seleccionados
    const typesArray =
      stock
        ?.filter((s) => s.place === selectedPlace)
        .map((s) => s.coffin.type) ?? [];
    setFilteredTypes([...new Set(typesArray)]);

    setCoffin({
      place: { name: selectedPlace, initials: place_initial },
      type: { name: "", initials: "" },
      size: { name: "", initials: "" },
      color: { name: "", initials: "" },
      metal_box: { name: "", initials: "" },
    });
    (document.getElementById("type") as HTMLSelectElement).selectedIndex = 0;
    setFilteredSizes([]);
    setFilteredColors([]);
    setFilteredMetalBoxes([]);
  };

  const handleTypeChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    const selectedType = e.target.value;
    const type_inital = types.find((t) => t.name == selectedType)?.initials;

    // Filtrar los tamaños disponibles para el lugar y tipo seleccionado
    const sizesArray =
      stock
        ?.filter(
          (s) =>
            s.place === coffin.place.name &&
            s.coffin.type === selectedType
        )
        .map((s) => s.coffin.size) ?? [];
    setFilteredSizes([...new Set(sizesArray)]);

    // Restablecer la selección de tamaño, color y metal_box
    setCoffin((prevCoffin: any) => ({
      ...prevCoffin,
      type: { name: selectedType, initials: type_inital },
      size: { name: "", initials: "" },
      color: { name: "", initials: "" },
      metal_box: { name: "", initials: "" },
    }));
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
            s.place === coffin.place.name &&
            s.coffin.type === coffin.type.name &&
            s.coffin.size === selectedSize
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
            s.place === coffin.place.name &&
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
      <div className={styles.formRow}>
        <div>Lugar de velatorio: </div>
        <input
          className={styles.input}
          style={{ width: "calc(100% - 132px)" }}
          type="text"
          id="funeral"
          name="funeral"
          value={request.funeral}
          onChange={(e) => handleRequestChange(e, request, setRequest)}
        />
      </div>
      <div className={styles.formRow}>
        <div>Apellido y Nombre del Titular: </div>
        <input
          className={styles.input}
          style={{ width: "calc(100% - 203px)" }}
          type="text"
          id="holder_name"
          name="holder_name"
          value={request.holder_name}
          placeholder="Apellido/s Nombre/s"
          onChange={(e) => handleRequestChange(e, request, setRequest)}
        />
      </div>
      <div className={styles.formRow}>
        <div>Parentesco: </div>
        <input
          className={styles.input}
          style={{ width: "calc(100% - 88px)" }}
          type="text"
          id="holder_relationship"
          name="holder_relationship"
          value={request.holder_relationship}
          placeholder="hijo"
          onChange={(e) => handleRequestChange(e, request, setRequest)}
        />
      </div>
      <div className={styles.formRow}>
        <div>N° de Certificado: </div>
        <input
          className={styles.input}
          style={{ width: "calc(50% - 93px)" }}
          type="text"
          id="certificate_number"
          name="certificate_number"
          value={request.certificate_number?request.certificate_number:""}
          onChange={(e) => handleRequestChange(e, request, setRequest)}
        />
        <div>Póliza: </div>
        <input
          className={styles.input}
          style={{ width: "calc(50% - 100px)" }}
          type="text"
          id="policy"
          name="policy"
          value={request.policy}
          placeholder="ejmplo: D"
          onChange={(e) => handleRequestChange(e, request, setRequest)}
        />
      </div>
      <div className={styles.formRow}>
        <div>Forma que paga el Seguro: </div>
        <input
          className={styles.input}
          style={{ width: "calc(100% - 177px)" }}
          type="text"
          id="way_to_pay"
          name="way_to_pay"
          value={request.way_to_pay}
          onChange={(e) => handleRequestChange(e, request, setRequest)}
        />
      </div>
      <div className={styles.formRow}>
        <div>Convenio:</div>
        <input
          className={styles.input}
          style={{ width: "calc(100% - 75px)" }}
          type="text"
          id="agreement"
          name="agreement"
          value={request.agreement}
          onChange={(e) => handleRequestChange(e, request, setRequest)}
        />
      </div>
      <div>
        <div>Ataud:</div>
        <div>Lugar de depósito:</div>
        <select
          id="place"
          className={styles.selects}
          onChange={handlePlaceChange}
        >
          <option defaultValue="-">-</option>
          {placesArray.length > 0
            ? placesArray.map((place, i) => (
                <option key={i} value={place}>
                  {place}
                </option>
              ))
            : null}
        </select>
        <div>Tipo:</div>
        <select
          id="type"
          className={styles.selects}
          onChange={handleTypeChange}
        >
          <option defaultValue="-">-</option>
          {filteredTypes.length > 0
            ? filteredTypes.map((type, i) => (
                <option key={i} value={type}>
                  {type}
                </option>
              ))
            : null}
        </select>
        <div>Tamaño:</div>
        <select
          id="size"
          className={styles.selects}
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
        <div>Color:</div>
        <select
          id="color"
          className={styles.selects}
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
        <div>Caja de Metal:</div>
        <select
          id="metal_box"
          className={styles.selects}
          onChange={handleMetalBoxChange}
        >
          <option defaultValue="">-</option>
          {filteredMetalBoxes.length > 0 &&
            filteredMetalBoxes.map((metalBox, i) => (
              <option key={i} value={metalBox == "true" ? "true" : "false"}>
                {metalBox == "true" ? "Si" : "No"}
              </option>
            ))}
        </select>
      </div>
      <div className={styles.formRow}>
        <div>Adicional: </div>
        <input
          className={styles.input}
          style={{ width: "calc(100% - 78px)" }}
          type="text"
          id="additional"
          name="additional"
          value={request.additional}
          onChange={(e) => handleRequestChange(e, request, setRequest)}
        />
      </div>
      <div className={styles.formRow}>
        <div>Corona: </div>
        <div className={styles.switch}>
          <div>No</div>
          <div>
            <SwitchBtn isOn={isOn} onClick={()=>handleToggleSwitch(isOn, setIsOn)} />
          </div>
          <div>Si</div>
        </div>
      </div>
      <div className={styles.formRow}>
        <div>Presente de funeral: </div>
        <input
          className={styles.input}
          style={{ width: "calc(100% - 139px)" }}
          type="text"
          id="present"
          name="present"
          value={request.present}
          onChange={(e) => handleRequestChange(e, request, setRequest)}
        />
      </div>
      <div className={styles.formRow}>
        <div>Lugar de inhumación: </div>
        <input
          className={styles.input}
          style={{ width: "calc(100% - 250px)" }}
          type="text"
          id="burial_place"
          name="burial_place"
          value={request.burial_place}
          onChange={(e) => handleRequestChange(e, request, setRequest)}
        />
        <div>Hora: </div>
        <input
          className={styles.inputDate}
          type="text"
          id="burial_time"
          name="burial_time"
          value={request.burial_time.trim()}
          placeholder="00:00"
          onChange={(e) => handleRequestChange(e, request, setRequest)}
        />
      </div>
      <div className={styles.formRow}>
        <div>Revestimiento: </div>
        <input
          className={styles.input}
          style={{ width: "calc(100% - 110px)" }}
          type="text"
          id="cladding"
          name="cladding"
          value={request.cladding}
          onChange={(e) => handleRequestChange(e, request, setRequest)}
        />
      </div>
      <div className={styles.formRow}>
        <div>Mejoramiento del servicio: </div>
        <input
          className={styles.input}
          style={{ width: "calc(100% - 183px)" }}
          type="text"
          id="service_improvement"
          name="service_improvement"
          value={request.service_improvement}
          onChange={(e) => handleRequestChange(e, request, setRequest)}
        />
      </div>
      <div className={styles.formRow}>
        <div>Fecha: </div>
        <div className={styles.dateRow}>
          <input
            type="date"
            id="currentDate"
            name="currentDate"
            value={currentDate}
            className={styles.dateInput}
            onChange={(e) => {
              e.preventDefault()
              setCurrentDate(e.target.value)
            }}
          />
        </div>
        <div>Lugar: </div>
        <input
          className={styles.input}
          style={{ width: "calc(100% - 269px)" }}
          type="text"
          id="place"
          name="place"
          value={request.place}
          onChange={(e) => handleRequestChange(e, request, setRequest)}
        />
      </div>
    </div>
  );
};
export default FormRequest;
