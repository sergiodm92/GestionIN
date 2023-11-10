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
    tombstone: true,
    cementery_type: ""
  }
];

const TombStones = () => {
  const [selectedCards, setSelectedCards] = useState<string[]>([]);
  const [filterDate, setFilterDate] = useState<string | null>(null);
  const [filterCementeryType, setFilterCementeryType] = useState<string | null>(null);
  const [selectAll, setSelectAll] = useState<boolean>(false);
  const [updateData, setUpdateData] = useState(initialDeceasedState);
  const router = useRouter();
  const dispatch = useAppDispatch();
  const deceaseds = useAppSelector(getDeceaseds);
  const prevDeceaseds = useRef(deceaseds);

  useEffect(() => {
    getDeceasedesWithoutTombStone(dispatch);
  }, []);

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
      ) : updateData[0].id === "" ? (
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
            <div className={styles.smallSpace}>DNI</div>
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
                    checked={selectedCards.includes(deceased.id_doc)}
                    onChange={() => handleCardSelection(deceased.id)}
                  />
                  <Card2
                    onClick={() => router.push(`/deceased/${deceased.id_doc}`)}
                    space1={new Date(deceased.dod)
                      .toLocaleDateString("es")
                      .replaceAll("/", "-")}
                    space2={deceased.name}
                    space3={deceased.cementery_type === cementery_type1 ? tombstone_type2 : tombstone_type1}
                    space4={deceased.dni}
                  />
                </div>
              ))}
            <SmallBtn title={"Generar detalle"} onClick={generateDetail} />
          </div>
        </>
      )}
    </div>
  );
};

export default TombStones;

