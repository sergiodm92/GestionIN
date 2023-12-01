import { useRouter } from "next/router";
import styles from "../styles/home.module.css";
import { DoubleButton, LargeButton } from "../components/Buttons";
import { useAppDispatch, useAppSelector } from "../store/hooks";
import { getUser, setLoginData } from "../store/Slices/userSlice";
import { useEffect } from "react";

const Home = () => {
  const router = useRouter();
  const user = useAppSelector(getUser);

  return (
    <div className={styles.container}>
      {user.name && (
        <>
            <DoubleButton
              title1={"Ingresos"}
              title2={"+"}
              onClick1={() => router.push("/adds")}
              onClick2={() => router.push("/newAdd")}
            />
          <DoubleButton
            title1={"Solicitudes"}
            title2={"+"}
            onClick1={() => router.push("/requests")}
            onClick2={() => router.push("/newRequest")}
          />
          <DoubleButton
            title1={"Transferencias"}
            title2={"+"}
            onClick1={() => router.push("/transfer")}
            onClick2={() => router.push("/transfer/new")}
          />
          <LargeButton
            title={"Lápidas y Placas"}
            onClick={() => router.push("/tombStones")}
          />
          <LargeButton
            title={"Difuntos"}
            onClick={() => router.push("/deceased")}
          />
          <LargeButton title={"Stock"} onClick={() => router.push("/places")} />
          <LargeButton
            title={"Configuración"}
            onClick={() => router.push("/settings")}
          />
        </>
      )}
    </div>
  );
};

export default Home;
