'use client'
import { useEffect } from "react";
import { FormRequest, Request } from "../../types/requestsInterfaces";
import { handleRequestChange, handleToggleSwitch } from "../functions/newRequest/functions";
import styles from "../../pages/newRequest/styles/newRequest.module.css";
import { useState } from "react";
import { types, sizes, colors } from "../arrays";
import { AddBtn, SwitchBtn } from "../Buttons";
import { useAppDispatch, useAppSelector } from "../../store/hooks";
import { getCoffinStock } from "../../store/Slices/coffinStockSlice";
import { getCoffinStockByPlace, getMboxStockByPlace, getProductsStockByPlace } from "../functions/stock";
import { getmetalBoxStock } from "../../store/Slices/metalBoxStockSlice";
import { getProductsStock } from "../../store/Slices/productsStockSlice";
import Loading from "../Loading/loading";
import { Products } from "../../types/addsInterfaces";
import { createToast } from "../Notifications/Notifications";
import { validateProduct } from "../Validations/addCoffin";

const initialState = {
  id:"",
  name:"",
  units:0
}

const FormRequestService = (data: FormRequest) => {
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
  const [isLoadingSelectPlace, setIsLoadingSelectPlace] = useState(false)
  const [isMetalBox, setIsMetalBox] = useState(false)
  const [isLoadingProducts, setIsLoadingProducts] = useState(false)
  const [product, setProduct] = useState(initialState)
  const [productSelectedUnits, setProductSelectedUnits] = useState("")
  const [filteredTypes, setFilteredTypes] = useState<string[]>([]);
  const [filteredSizes, setFilteredSizes] = useState<string[]>([]);
  const [filteredColors, setFilteredColors] = useState<string[]>([]);
  const [filteredMetalBoxes, setFilteredMetalBoxes] = useState<string[]>([]);

  const dispatch = useAppDispatch();

  const stock = useAppSelector(getCoffinStock);
  const mboxStock = useAppSelector(getmetalBoxStock);
  const productsStock = useAppSelector(getProductsStock);
  const [isStock, setIsStock] = useState(true)


  useEffect(() => {
    setIsStock(true)
    getCoffinStockByPlace(dispatch, placeSelected,setIsStock);
    getMboxStockByPlace(dispatch, placeSelected)
    getProductsStockByPlace(dispatch, placeSelected)
  }, [placeSelected]);

  useEffect(() => {
    // Filtrar los tipos disponibles para el lugar seleccionado
    const typesArray = stock.map((s) => s.type) ?? [];
    const uniqueTypes = [...new Set(typesArray)];
    setFilteredTypes(uniqueTypes);
  }, [stock]);

  useEffect(() => {
    if (stock.length) {
      setIsLoadingSelectPlace(false)
    }
    else {
      if (placeSelected) {
        setIsLoadingSelectPlace(true)
      }
    }
  }, [placeSelected, stock])

  
  const handlePlaceChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    const selectedPlace = e.target.value;
    setPlaceSelected(selectedPlace)
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
      stock
        ?.filter(
          (s) =>
            s.type === selectedType
        )
        .map((s) => s.size) ?? [];
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
            s.type === coffin.type.name &&
            s.size === selectedSize
        )
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
    const coffinSelected = stock?.filter(
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
    setIsMetalBox(e.target.value === "true")
    let metal_box_initial = "";
    if (selectedMetalBox=="true") {
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
    e.preventDefault()
    const array = e.target.value.split(",")
    setRequest({
      ...request,
      id_metal_box_group: array[0],
      id_add_metal_box: array[1]
    });
  };

  const handleProductNameChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    e.preventDefault()
    const array = e.target.value.split(",")
    setProductSelectedUnits(array[2])
    setProduct({
      ...product,
      name: array[0],
      id: array[1]
    });
  };
  const handleProductChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    e.preventDefault()
    setProduct({
      ...product,
      [e.target.name]: +e.target.value
    });
  };

  const productGroupHandleSubmit = async (e: any, product: Products, request: Request, setProduct: any, productSelectedUnits:number, setIsLoading: React.Dispatch<React.SetStateAction<boolean>>) => {
    e.preventDefault();
    setIsLoading(true)
    try {
      if(!product.units || product.units > productSelectedUnits){
        createToast("warning", "no hay stock suficiente")
        setIsLoading(false)
        return
      }
      else if (validateProduct(product)) {
        request.products.push(product)
      }
    } catch (error) {
      createToast("warning", "ocurrio un error, vuelva a intentar");
      console.error(error);
    }
    setProduct(initialState)
    const selectElement = document.getElementById("mbsize") as HTMLSelectElement;
    selectElement.selectedIndex = 0;
    setIsLoading(false)
  }

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
          value={request.certificate_number ? request.certificate_number : ""}
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
          {places.length == 0 ?
            <option defaultValue="-">cargando...</option>

            :
            <option defaultValue="-">-</option>
          }
          {places.length > 0
            ? places.map((place, i) => (
              <option key={i} value={place.name}>
                {place.name}
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
          {isLoadingSelectPlace && isStock?
            <option defaultValue="-">cargando...</option>
            :
            <option defaultValue="-">-</option>
          }
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
        <div>Caja Metálica:</div>
        <select
          id="metal_box"
          className={styles.selects}
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
        <div>Agregar Caja metálica</div>
        <select
          id="id_metal_box_group"
          className={styles.selects}
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
            <SwitchBtn isOn={isOn} onClick={() => handleToggleSwitch(isOn, setIsOn)} />
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
        <div>Agregar Productos:</div>
        <div className={styles.productsGroup}>
          <div className={styles.formRow}>
            <div>Producto:</div>
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
            <div>Unidades:</div>
            <input
              className={styles.input}
              type="number"
              id="pUnits"
              name="units"
              value={product.units ? product.units : ""}
              onChange={(e) => handleProductChange(e)}
            />
            {product.units && product.units > +productSelectedUnits?
            <p>No hay stock suficiente, solo hay {productSelectedUnits} disponibles</p>
          : null}
          </div>
          <div className={styles.buttonContainer}>
            <AddBtn
              title={isLoadingProducts ? <Loading /> : "Agregar"}
              loading={isLoadingProducts}
              disabled={isLoadingProducts}
              onClick={(e: any) => productGroupHandleSubmit(e, product, request, setProduct, +productSelectedUnits, setIsLoadingProducts)}
            />
          </div>
        </div>
        {
            request.products.length ?
              request.products.map((p, i) => {
                return (
                  <div key={i}>
                    <div className={styles.formRow}>
                      <div>Producto: </div>
                      <div>{p.name}</div>
                    </div>
                    <div className={styles.formRow}>
                      <div>Unidades: </div>
                      <div>{p.units}</div>
                    </div>
                  </div>
                )
              })
              : null
          }
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
export default FormRequestService;
