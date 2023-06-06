import { useRouter } from "next/router";
import { useAppDispatch, useAppSelector } from "../../store/hooks";
import { getDeceaseds } from "../../store/Slices/deceasedSlice";
import Loading from "../../components/Loading/loading";
import { getDeceasedesWithoutTombStone } from "./functions/functions";
import { useEffect, useState } from "react";
import Card1 from "../../components/Cards/Card1";
import styles from "./styles/tombStone.module.css";
import { SmallBtn } from "../../components/Buttons";

const TombStones = () => {
  const [selectedCards, setSelectedCards] = useState<string[]>([]);
  const [filterDate, setFilterDate] = useState<string | null>(null);
  const [selectAll, setSelectAll] = useState<boolean>(false);

  const router = useRouter();
  const dispatch = useAppDispatch();
  const deceaseds = useAppSelector(getDeceaseds);

  useEffect(() => {
    getDeceasedesWithoutTombStone(dispatch);
  }, []);

  const handleCardSelection = (cardId: string) => {
    if (selectedCards.includes(cardId)) {
      setSelectedCards(selectedCards.filter((id) => id !== cardId));
    } else {
      setSelectedCards([...selectedCards, cardId]);
    }
  };

  const generateDetail = () => {
    const selectedDeceaseds = deceaseds.filter((deceased) =>
      selectedCards.includes(deceased.id)
    );
    console.log(selectedDeceaseds);
  };

  const selectAllDisplayedCards = () => {
    if (selectAll) {
      setSelectedCards([]);
    } else {
      const displayedCardIds = deceaseds
        .filter(
          (deceased) =>
            filterDate === null ||
            new Date(deceased.dod).toISOString().slice(0, 10) <= filterDate
        )
        .map((deceased) => deceased.id);

      setSelectedCards(displayedCardIds);
    }
    setSelectAll(!selectAll);
  };

  const handleDateChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const selectedDate = e.target.value;
    setFilterDate(selectedDate);
  };

  return (
    <div className={styles.container}>
      {deceaseds.length === 0 ? (
        <Loading />
      ) : (
        <>
          <div className={styles.title}>Difuntos sin lápida</div>
          <div className={styles.filterContainer}>
            <input
              type="checkbox"
              checked={selectAll}
              onChange={selectAllDisplayedCards}
            />
            <label htmlFor="selectAll"></label>
            <div className={styles.dateBox}>
              <div>Filtrar por fecha</div>
              <input
                type="date"
                value={filterDate || ""}
                onChange={handleDateChange}
                placeholder="Seleccionar fecha"
                className={styles.dateInput}
              />
            </div>
          </div>
          <div className={styles.subTitle}>
            <div className={styles.smallSpace}>Fecha de fallecimiento</div>
            <div className={styles.bigSpace}>Apellido y Nombre</div>
            <div className={styles.smallSpace}>DNI</div>
          </div>
          <div className={styles.cardsContainer}>
            {deceaseds
              .filter(
                (deceased) =>
                  filterDate === null ||
                  new Date(deceased.dod).toISOString().slice(0, 10) <=
                    filterDate
              )
              .map((deceased: any, i: any) => (
                <div className={styles.card} key={i}>
                  <input
                    type="checkbox"
                    checked={selectedCards.includes(deceased.id)}
                    onChange={() => handleCardSelection(deceased.id)}
                  />
                  <Card1
                    onClick={() => router.push(`/deceased/${deceased.id}`)}
                    space1={new Date(deceased.dod)
                      .toLocaleDateString("es")
                      .replaceAll("/", "-")}
                    space2={deceased.name}
                    space3={deceased.dni}
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
