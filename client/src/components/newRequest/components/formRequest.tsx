"use client";
import { useEffect } from "react";
import { FormRequest, Request } from "../../../types/requestsInterfaces";
import {
  handleRequestChange,
  handleToggleSwitch,
} from "../../functions/newRequest/functions";
import styles from "../../../pages/newRequest/styles/newRequest.module.css";
import { useState } from "react";
import { AddBtn, SwitchBtn } from "../../Buttons";
import { useAppDispatch, useAppSelector } from "../../../store/hooks";
import { getCoffinStock } from "../../../store/Slices/coffinStockSlice";
import {
  getCoffinStockByPlace,
  getMboxStockByPlace,
  getProductsStockByPlace,
} from "../../functions/stock";
import { getmetalBoxStock } from "../../../store/Slices/metalBoxStockSlice";
import { getProductsStock } from "../../../store/Slices/productsStockSlice";
import Loading from "../../Loading/loading";
import { Products } from "../../../types/addsInterfaces";
import { createToast } from "../../Notifications/Notifications";
import { validateProduct } from "../../Validations/addCoffin";
import {
  getAllColors,
  getAllSizes,
  getAllTypes,
} from "../../functions/settings/coffinProperty";
import {
  getColors,
  getSizes,
  getTypes,
} from "../../../store/Slices/coffinProperty";

const initialState = {
  id: "",
  name: "",
  units: 0,
};

const FormRequest = (data: FormRequest) => {
  const {
    isOn,
    setIsOn,
    places,
    request,
    setRequest,
    currentDate,
    setCurrentDate,
    coffin,
    setCoffin,
  } = data;

  const [placeSelected, setPlaceSelected] = useState("");
  const [isLoadingSelectPlace, setIsLoadingSelectPlace] = useState(false);
  const [isMetalBox, setIsMetalBox] = useState(false);
  const [isLoadingProducts, setIsLoadingProducts] = useState(false);
  const [product, setProduct] = useState(initialState);
  const [addProducts, setAddProducts] = useState(false);
  const [productSelectedUnits, setProductSelectedUnits] = useState("");
  const [filteredTypes, setFilteredTypes] = useState<string[]>([]);
  const [filteredSizes, setFilteredSizes] = useState<string[]>([]);
  const [filteredColors, setFilteredColors] = useState<string[]>([]);
  const [filteredMetalBoxes, setFilteredMetalBoxes] = useState<string[]>([]);

  const dispatch = useAppDispatch();

  const stock = useAppSelector(getCoffinStock);
  const mboxStock = useAppSelector(getmetalBoxStock);
  const productsStock = useAppSelector(getProductsStock);
  const types = useAppSelector(getTypes);
  const sizes = useAppSelector(getSizes);
  const colors = useAppSelector(getColors);

  const [isStock, setIsStock] = useState(true);

  useEffect(() => {
    getAllTypes(dispatch);
    getAllSizes(dispatch);
    getAllColors(dispatch);
  }, []);

  useEffect(() => {
    setIsStock(true);
    getCoffinStockByPlace(dispatch, placeSelected, setIsStock);
    getMboxStockByPlace(dispatch, placeSelected);
    getProductsStockByPlace(dispatch, placeSelected);
  }, [placeSelected]);

  useEffect(() => {
    // Filtrar los tipos disponibles para el lugar seleccionado
    const typesArray = stock.map((s) => s.type) ?? [];
    const uniqueTypes = [...new Set(typesArray)];
    setFilteredTypes(uniqueTypes);
  }, [stock]);

  useEffect(() => {
    if (stock.length) {
      setIsLoadingSelectPlace(false);
    } else {
      if (placeSelected) {
        setIsLoadingSelectPlace(true);
      }
    }
  }, [placeSelected, stock]);

  const handlePlaceChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    const selectedPlace = e.target.value;
    setPlaceSelected(selectedPlace);
    const place_initial = places.find((s) => s.name == selectedPlace)?.initials;
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
      stock?.filter((s) => s.type === selectedType).map((s) => s.size) ?? [];
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
        ?.filter((s) => s.type === coffin.type.name && s.size === selectedSize)
        .map((s) => s.color) ?? [];
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
            s.type === coffin.type.name &&
            s.size === coffin.size.name &&
            s.color === selectedColor
        )
        .map((s) => s.mbox.toString()) ?? [];

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
    const coffinSelected =
      stock?.filter(
        (s) =>
          s.type === coffin.type.name &&
          s.size === coffin.size.name &&
          s.color === coffin.color.name &&
          s.mbox.toString() == selectedMetalBox
      ) ?? [];
    setCoffin({
      ...coffin,
      id_add: coffinSelected[0]?.id_add,
    });
    setIsMetalBox(e.target.value === "true");
    let metal_box_initial = "";
    if (selectedMetalBox == "true") {
      metal_box_initial = "TR";
    } else {
      metal_box_initial = "FS";
    }
    // Actualizar la selección de metal_box
    setCoffin((prevCoffin: any) => ({
      ...prevCoffin,
      metal_box: { name: selectedMetalBox, initials: metal_box_initial },
    }));
  };

  const handleNewMetalBoxChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    e.preventDefault();
    const array = e.target.value.split(",");
    setRequest({
      ...request,
      id_metal_box_group: array[0],
      id_add_metal_box: array[1],
    });
  };

  const handleProductNameChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    e.preventDefault();
    const array = e.target.value.split(",");
    setProductSelectedUnits(array[2]);
    setProduct({
      ...product,
      name: array[0],
      id: array[1],
    });
  };
  const handleProductChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    e.preventDefault();
    setProduct({
      ...product,
      [e.target.name]: +e.target.value,
    });
  };

  const productGroupHandleSubmit = async (
    e: any,
    product: Products,
    request: Request,
    setProduct: any,
    productSelectedUnits: number,
    setIsLoading: React.Dispatch<React.SetStateAction<boolean>>
  ) => {
    e.preventDefault();
    setIsLoading(true);
    try {
      if (!product.units || product.units > productSelectedUnits) {
        createToast("warning", "no hay stock suficiente");
        setIsLoading(false);
        return;
      } else if (validateProduct(product)) {
        request.products.push(product);
      }
    } catch (error) {
      createToast("warning", "ocurrio un error, vuelva a intentar");
      console.error(error);
    }
    setProduct(initialState);
    const selectElement = document.getElementById(
      "mbsize"
    ) as HTMLSelectElement;
    selectElement.selectedIndex = 0;
    setIsLoading(false);
  };

  return (
    <div className={styles.formContainer}>
      <div className={styles.formRow}>
        <div className={styles.items}>Lugar de velatorio: </div>
        <input
          className={`${styles.input2} ${styles.backgroundColor}`}
          type="text"
          id="funeral"
          name="funeral"
          value={request.funeral}
          onChange={(e) => handleRequestChange(e, request, setRequest)}
        />
      </div>
      <div className={styles.formRow}>
        <div className={styles.items}>Apellido y Nombre del Titular: </div>
        <input
          className={`${styles.input2} ${styles.backgroundColor}`}
          type="text"
          id="holder_name"
          name="holder_name"
          value={request.holder_name}
          placeholder="Apellido/s Nombre/s"
          onChange={(e) => handleRequestChange(e, request, setRequest)}
        />
      </div>
      <div className={styles.formRow}>
        <div className={styles.items}>Parentesco: </div>
        <input
          className={`${styles.input2} ${styles.backgroundColor}`}
          type="text"
          id="holder_relationship"
          name="holder_relationship"
          value={request.holder_relationship}
          placeholder="hijo"
          onChange={(e) => handleRequestChange(e, request, setRequest)}
        />
      </div>
      <div className={styles.formRow}>
        <div className={styles.items}>N° de Certificado: </div>
        <input
          className={`${styles.input2} ${styles.backgroundColor}`}
          type="text"
          id="certificate_number"
          name="certificate_number"
          value={request.certificate_number ? request.certificate_number : ""}
          onChange={(e) => handleRequestChange(e, request, setRequest)}
        />
        <div className={styles.items}>Póliza: </div>
        <input
          className={`${styles.input2} ${styles.backgroundColor}`}
          type="text"
          id="policy"
          name="policy"
          value={request.policy}
          placeholder="ejmplo: D"
          onChange={(e) => handleRequestChange(e, request, setRequest)}
        />
      </div>
      <div className={styles.formRow}>
        <div className={styles.items}>Forma que paga el Seguro: </div>
        <input
          className={`${styles.input2} ${styles.backgroundColor}`}
          type="text"
          id="way_to_pay"
          name="way_to_pay"
          value={request.way_to_pay}
          onChange={(e) => handleRequestChange(e, request, setRequest)}
        />
      </div>
      <div className={styles.formRow}>
        <div className={styles.items}>Convenio:</div>
        <input
          className={`${styles.input2} ${styles.backgroundColor}`}
          type="text"
          id="agreement"
          name="agreement"
          value={request.agreement}
          onChange={(e) => handleRequestChange(e, request, setRequest)}
        />
      </div>
      <div
        className={`${styles.formContainer2} ${styles.backgroundColor} ${styles.space}`}
      >
        <div className={styles.subTitle}>Ataud:</div>
        <div className={styles.items}>Lugar de depósito:</div>
        <select
          id="place"
          className={styles.input}
          onChange={handlePlaceChange}
        >
          {places.length == 0 ? (
            <option defaultValue="-">cargando...</option>
          ) : (
            <option defaultValue="-">-</option>
          )}
          {places.length > 0
            ? places.map((place, i) => (
                <option key={i} value={place.name}>
                  {place.name}
                </option>
              ))
            : null}
        </select>
        <div className={styles.items}>Tipo:</div>
        <select id="type" className={styles.input} onChange={handleTypeChange}>
          {isLoadingSelectPlace && isStock ? (
            <option defaultValue="-">cargando...</option>
          ) : (
            <option defaultValue="-">-</option>
          )}
          {filteredTypes.length > 0
            ? filteredTypes.map((type, i) => (
                <option key={i} value={type}>
                  {type}
                </option>
              ))
            : null}
        </select>
        <div className={styles.items}>Tamaño:</div>
        <select id="size" className={styles.input} onChange={handleSizeChange}>
          <option defaultValue="-">-</option>
          {filteredSizes.length > 0
            ? filteredSizes.map((size, i) => (
                <option key={i} value={size}>
                  {size}
                </option>
              ))
            : null}
        </select>
        <div className={styles.items}>Color:</div>
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
        <div className={styles.items}>Caja Metálica:</div>
        <select
          id="metal_box"
          className={styles.input}
          onChange={handleMetalBoxChange}
        >
          <option defaultValue="">-</option>
          {filteredMetalBoxes.length > 0 &&
            filteredMetalBoxes.map((metalBox, i) => (
              <option key={i} value={metalBox === "true" ? metalBox : "false"}>
                {metalBox === "true" ? "Si" : "No"}
              </option>
            ))}
        </select>
      </div>
      <div className={styles.formRow}>
        <div className={styles.items}>Agregar Caja metálica</div>
        <select
          id="id_metal_box_group"
          className={`${styles.input} ${styles.backgroundColor}`}
          onChange={handleNewMetalBoxChange}
          disabled={isMetalBox}
        >
          <option defaultValue="">-</option>
          {mboxStock.length > 0 &&
            mboxStock.map((metalBox, i) => (
              <option key={i} value={[metalBox.size, metalBox.id_add]}>
                {metalBox.size}
              </option>
            ))}
        </select>
      </div>
      <div className={styles.formRow}>
        <div className={styles.items}>Adicional: </div>
        <input
          className={`${styles.input2} ${styles.backgroundColor}`}
          type="text"
          id="additional"
          name="additional"
          value={request.additional}
          onChange={(e) => handleRequestChange(e, request, setRequest)}
        />
      </div>
      <div className={styles.dateRow}>
        <div className={styles.items}>Corona: </div>
        <div className={styles.switch}>
          <div>No</div>
          <div>
            <SwitchBtn
              isOn={isOn}
              onClick={() => handleToggleSwitch(isOn, setIsOn)}
            />
          </div>
          <div>Si</div>
        </div>
      </div>
      <div className={styles.formRow}>
        <div className={styles.items}>Presente de funeral: </div>
        <input
          className={`${styles.input2} ${styles.backgroundColor}`}
          type="text"
          id="present"
          name="present"
          value={request.present}
          onChange={(e) => handleRequestChange(e, request, setRequest)}
        />
      </div>
      <div
        className={`${styles.products} ${styles.space}`}
        onClick={() => {
          setAddProducts(!addProducts);
        }}
      >
        Agregar Productos
      </div>
      {!addProducts ? null : (
        <div className={`${styles.formContainer2} ${styles.backgroundColor}`}>
          <div className={styles.formRow}>
            <div className={styles.items}>Producto:</div>
            <select
              id="mbsize"
              className={styles.input}
              onChange={(e) => handleProductNameChange(e)}
            >
              <option defaultValue={"-"}>-</option>
              {productsStock.map((p, i) => (
                <option key={i} value={[p.name, p.id, p.units.toString()]}>
                  {p.name}
                </option>
              ))}
            </select>
          </div>
          <div className={styles.formRow}>
            <div className={styles.items}>Unidades:</div>
            <input
              className={styles.input2}
              type="number"
              id="pUnits"
              name="units"
              value={product.units ? product.units : ""}
              onChange={(e) => handleProductChange(e)}
            />
            {product.units && product.units > +productSelectedUnits ? (
              <p>
                No hay stock suficiente, solo hay {productSelectedUnits}{" "}
                disponibles
              </p>
            ) : null}
          </div>
          <div className={styles.buttonContainer}>
            <AddBtn
              title={isLoadingProducts ? <Loading /> : "Agregar"}
              loading={isLoadingProducts}
              disabled={isLoadingProducts}
              onClick={(e: any) =>
                productGroupHandleSubmit(
                  e,
                  product,
                  request,
                  setProduct,
                  +productSelectedUnits,
                  setIsLoadingProducts
                )
              }
            />
          </div>
          {request.products.length
            ? request.products.map((p, i) => {
                return (
                  <div key={i} className={styles.productsCard}>
                      <p>- {p.units}</p>
                      <p>{p.name}</p>
                  </div>
                );
              })
            : null}
        </div>
      )}

      <div className={styles.dateRow}>
        <div className={styles.items}>Lugar de inhumación: </div>
        <input
          className={`${styles.input2} ${styles.backgroundColor}`}
          type="text"
          id="burial_place"
          name="burial_place"
          value={request.burial_place}
          onChange={(e) => handleRequestChange(e, request, setRequest)}
        />
        <div className={styles.items}>Hora: </div>
        <input
          className={`${styles.inputDate} ${styles.backgroundColor}`}
          type="text"
          id="burial_time"
          name="burial_time"
          value={request.burial_time.trim()}
          placeholder="00:00"
          onChange={(e) => handleRequestChange(e, request, setRequest)}
        />
      </div>
      <div className={styles.formRow}>
        <div className={styles.items}>Revestimiento: </div>
        <input
          className={`${styles.input2} ${styles.backgroundColor}`}
          type="text"
          id="cladding"
          name="cladding"
          value={request.cladding}
          onChange={(e) => handleRequestChange(e, request, setRequest)}
        />
      </div>
      <div className={styles.formRow}>
        <div className={styles.items}>Mejoramiento del servicio: </div>
        <input
          className={`${styles.input2} ${styles.backgroundColor}`}
          type="text"
          id="service_improvement"
          name="service_improvement"
          value={request.service_improvement}
          onChange={(e) => handleRequestChange(e, request, setRequest)}
        />
      </div>
      <div className={styles.dateRow}>
        <div className={styles.items}>Fecha: </div>
        <div className={styles.dateRow}>
          <input
            type="date"
            id="currentDate"
            name="currentDate"
            value={currentDate}
            className={styles.dateInput}
            onChange={(e) => {
              e.preventDefault();
              setCurrentDate(e.target.value);
            }}
          />
        </div>
        <div className={styles.items}>Lugar: </div>
        <input
          className={`${styles.input2} ${styles.backgroundColor}`}
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
