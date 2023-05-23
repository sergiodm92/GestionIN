import { useRouter } from "next/router";
import { useState } from "react";
import styles from "../styles/home.module.css"
import { places } from "../../src/components/arrays";
import { DoubleButton, LargeButton } from "../components/Buttons";

const Home = ()=>{

    const [dropdownOpen, setDropdownOpen] = useState(false);

    const router = useRouter()

    const handlePlaceClick = (place: string) => {
        router.push(`/NewRequest/${place}`);
      };

    return(
        <div className={styles.container}>
            <DoubleButton
                title1={"Solicitudes"}
                title2={"+"}
                onClick1={()=>router.push('/requests')}
                onClick2={() => setDropdownOpen(!dropdownOpen)}
            />
            {dropdownOpen && (
                <ul className={styles.dropdownList}>
                    {places?.map((place, i)=>{
                        return (
                            <li key={i} onClick={() => handlePlaceClick(place.name)}>{place.name}</li>
                        )
                    })}
                </ul>
            )}
            <DoubleButton
                title1={"Ingresos"}
                title2={"+"}
                onClick1={()=>router.push('/adds')}
                onClick2={()=>router.push('/newAdd')}
            />
            <LargeButton
                title={"Lápidas"}
                onClick={()=>router.push('/tombStones')}
            />
            <LargeButton
                title={"Difuntos"}
                onClick={()=>router.push('/deceased')}
            />
            <LargeButton
                title={"Stock"}
                onClick={()=>router.push('/places')}
            />
        </div>
    )
}
export default Home