import { useRouter } from "next/router";
import { useEffect, useRef, useState } from "react";
import styles from "../styles/home.module.css";
import { places } from "../../src/components/arrays";
import { DoubleButton, LargeButton } from "../components/Buttons";

const Home = () => {
  const [dropdownOpen, setDropdownOpen] = useState(false);
  const router = useRouter();
  const dropdownRef = useRef<HTMLUListElement>(null);

  const handlePlaceClick = (place: string) => {
    router.push(`/newRequest/${place}`);
  };

  useEffect(() => {
    const handleOutsideClick = (event: MouseEvent) => {
      if (
        dropdownOpen &&
        dropdownRef.current &&
        !dropdownRef.current.contains(event.target as Node)
      ) {
        setDropdownOpen(false);
      }
    };

    document.addEventListener("mousedown", handleOutsideClick);

    return () => {
      document.removeEventListener("mousedown", handleOutsideClick);
    };
  }, [dropdownOpen]);

  return (
    <div className={styles.container}>
      <DoubleButton
        title1={"Solicitudes"}
        title2={"+"}
        onClick1={() => router.push("/requests")}
        onClick2={() => setDropdownOpen((prevState) => !prevState)}
      />
      {dropdownOpen && (
        <ul ref={dropdownRef} className={styles.dropdownList}>
          {places?.map((place, i) => {
            return (
              <li key={i} onClick={() => handlePlaceClick(place.name)}>
                {place.name}
              </li>
            );
          })}
        </ul>
      )}
      <DoubleButton
        title1={"Ingresos"}
        title2={"+"}
        onClick1={() => router.push("/adds")}
        onClick2={() => router.push("/newAdd")}
      />
      <LargeButton
        title={"Lápidas"}
        onClick={() => router.push("/tombStones")}
      />
      <LargeButton
        title={"Difuntos"}
        onClick={() => router.push("/deceased")}
      />
      <LargeButton title={"Stock"} onClick={() => router.push("/places")} />
    </div>
  );
};

export default Home;






