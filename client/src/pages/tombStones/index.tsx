import { useRouter } from "next/router";
import { useAppDispatch, useAppSelector } from "../../store/hooks";
import { getDeceaseds } from "../../store/Slices/deceasedSlice";
import Loading from "../../components/Loading/loading";
import { getDeceasedesWithoutTombStone } from "../../components/functions/tombStones/functions";
import { useEffect, useState, useRef } from "react";
import styles from "./styles/tombStone.module.css";
import { SmallBtn } from "../../components/Buttons";
import Card2 from "../../components/Cards/Card2";
import { cementery_type1, cementery_type2, tombstone_type1, tombstone_type2 } from "../../utils/constants";
import Card3 from "../../components/Cards/Card3";
import { tombstoneState } from "../../types/interfaces";
import Swal from "sweetalert2";
import { putDeceasedTombstone } from "../../components/functions/deceased/functions";
import { TombstoneStatus } from "../../types/requestsInterfaces";

const initialDeceasedState = [
  {
    id: "",
    id_request: "",
    name: "",
    dob: 0,
    dod: 0,
    pod: "",
    dni: "",
    leyend: "",
    news_paper: "",
    news_paper_name: "",
    tombstone: "pending",
    cementery_type: ""
  }
];

const TombStones = () => {
  const [selectedCards, setSelectedCards] = useState<string[]>([]);
  const [filterDate, setFilterDate] = useState<string | null>(null);
  const [filterCementeryType, setFilterCementeryType] = useState<string | null>(null);
  const [selectAll, setSelectAll] = useState<boolean>(false);
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [updateData, setUpdateData] = useState(initialDeceasedState);
  const router = useRouter();
  const dispatch = useAppDispatch();
  const deceaseds = useAppSelector(getDeceaseds);
  const prevDeceaseds = useRef(deceaseds);

  useEffect(() => {
    getDeceasedesWithoutTombStone(dispatch);
  }, [isLoading]);

  useEffect(() => {
    if (prevDeceaseds.current !== deceaseds) {
      setUpdateData(deceaseds);
      prevDeceaseds.current = deceaseds;
    }
  }, [deceaseds]);

  const handleCardSelection = (cardId: string) => {
    if (selectedCards.includes(cardId)) {
      setSelectedCards(selectedCards.filter((id) => id !== cardId));
    } else {
      setSelectedCards([...selectedCards, cardId]);
    }
  };

  const generateDetail = () => {
    const selecteds = deceaseds.filter((deceased) =>
      selectedCards.includes(deceased.id)
    );
    const selectedTombStones = selecteds.filter((d) => d.cementery_type === cementery_type1);
    const selectedPlaques = selecteds.filter((d) => d.cementery_type !== cementery_type1);
    const selectedDeceaseds = { tombstones: selectedTombStones, plaques: selectedPlaques };
    const arrayString = JSON.stringify(selectedDeceaseds);
    localStorage.setItem("deceaseds", arrayString);
    router.push("/tombStones/detail");
  };
  
  const changeState = () => {
    const selecteds = deceaseds.filter((deceased) =>
      selectedCards.includes(deceased.id)
    );
    Swal.fire({
      title: 'Selecciona una opción',
      input: 'radio',
      inputOptions: {
        'pending': 'Pendiente',
        'sent': 'Enviada',
        'approved': 'Aprobada',
        'dispatched': 'Despachada'
      },
      inputValidator: (value) => {
        return new Promise((resolve) => {
          if (value === null) {
            resolve('Debes seleccionar una opción');
          }
            resolve('');
        });
      },
      showCancelButton: true
    }).then((result) => {
      if (result.isConfirmed) {
        const array: TombstoneStatus[] = []
        selecteds.forEach((d) => {
          array.push({ doc_id: d.id_doc, status: result.value })
        })
        const json = {data_put_status: array}
        putDeceasedTombstone(json, setIsLoading)
        setSelectedCards([])
      }
    });
    
  }

  const selectAllDisplayedCards = () => {
    if (selectAll) {
      setSelectedCards([]);
    } else {
      let displayedCardIds;
      if (filterCementeryType === "all") {
        displayedCardIds = deceaseds
          .filter(
            (deceased) =>
            (filterDate === null ||
              new Date(deceased.dod).toISOString().slice(0, 10) <= filterDate)
          )
          .map((deceased) => deceased.id);
      } else {
        displayedCardIds = deceaseds
          .filter(
            (deceased) =>
              (filterDate === null ||
                new Date(deceased.dod).toISOString().slice(0, 10) <= filterDate) &&
              (filterCementeryType === null ||
                deceased.cementery_type === filterCementeryType)
          )
          .map((deceased) => deceased.id);
      }

      setSelectedCards(displayedCardIds);
    }
    setSelectAll(!selectAll);
  };


  const handleDateChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const selectedDate = e.target.value;
    setFilterDate(selectedDate);
  };

  const handleCementeryTypeChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    const selectedCementeryType = e.target.value;
    setFilterCementeryType(selectedCementeryType === "all" ? null : selectedCementeryType);
  };

  return (
    <div className={styles.container}>
      {updateData.length === 0 ? (
        <div className={styles.noDeceased}>No hay Placas o Lápidas pendientes</div>
      ) : updateData[0].id === "" || isLoading ? (
        <Loading />
      ) : (
        <>
          <div className={styles.title}>Placas y Lápidas pendientes</div>
          <div className={styles.filterContainer}>

            <div className={styles.dateBox}>
              <div>Filtrar hasta</div>
              <input
                type="date"
                value={filterDate || ""}
                onChange={handleDateChange}
                className={styles.dateInput}
              />
            </div>
            <div className={styles.dateBox}>
              <div>Tipo de cementerio</div>
              <select
                value={filterCementeryType || ""}
                onChange={handleCementeryTypeChange}
                className={styles.cementeryTypeSelect}
              >
                <option value="all">-</option>
                <option value={cementery_type1}>{cementery_type1}</option>
                <option value={cementery_type2}>{cementery_type2}</option>
              </select>
            </div>
          </div>
          <div className={styles.subTitle}>
            <input
              type="checkbox"
              checked={selectAll}
              onChange={selectAllDisplayedCards}
            />
            <div className={styles.smallSpace}>Fecha</div>
            <div className={styles.smallSpace}>Nombre</div>
            <div className={styles.smallSpace}>Tipo</div>
            <div className={styles.smallSpace}>Estado</div>
          </div>
          <div className={styles.cardsContainer}>
            {deceaseds
              .filter(
                (deceased) =>
                  (filterDate === null ||
                    new Date(deceased.dod).toISOString().slice(0, 10) <= filterDate) &&
                  (filterCementeryType === null ||
                    deceased.cementery_type === filterCementeryType)
              )
              .map((deceased: any, i: any) => (
                <div className={styles.card} key={i}>
                  <input
                    type="checkbox"
                    checked={selectedCards.includes(deceased.id)}
                    onChange={() => handleCardSelection(deceased.id)}
                  />
                  <Card3
                    onClick={() => router.push(`/deceased/${deceased.id_doc}`)}
                    space1={new Date(deceased.dod)
                      .toLocaleDateString("es")
                      .replaceAll("/", "-")}
                    space2={deceased.name}
                    space3={deceased.cementery_type === cementery_type1 ? tombstone_type2 : tombstone_type1}
                    space4={deceased.tombstone == 'pending' ? "Pendiente" : deceased.tombstone == 'sent' ? "Enviada" : deceased.tombstone == 'approved' ? "Aprobada" : "Despachadas"}
                  />
                </div>
              ))}
            <SmallBtn title={"Generar detalle"} onClick={generateDetail} />
            <SmallBtn title={"Cambiar Estado"} onClick={changeState} />
          </div>
        </>
      )}
    </div>
  );
};

export default TombStones;

