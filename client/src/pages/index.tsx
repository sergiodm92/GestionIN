import { useRouter } from "next/router";
import styles from "../styles/home.module.css";
import { DoubleButton, LargeButton } from "../components/Buttons";
import { useAppDispatch, useAppSelector } from '../store/hooks'
import { getUser, setLoginData } from '../store/Slices/userSlice'

const Home = () => {
  const router = useRouter();
  const user = useAppSelector(getUser)


  return (
    <div className={styles.container}>
      {user.name&&
      <>
      <DoubleButton
        title1={"Solicitudes"}
        title2={"+"}
        onClick1={() => router.push("/requests")}
        onClick2={() => router.push("/newRequest")}
      />
      <DoubleButton
        title1={"Ingresos"}
        title2={"+"}
        onClick1={() => router.push("/adds")}
        onClick2={() => router.push("/newAdd")}
      />
      <DoubleButton
        title1={"Productos"}
        title2={"+"}
        onClick1={() => router.push("/products")}
        onClick2={() => router.push("/products/new")}
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
      </>
  }
    </div>
   
  );
};

export default Home;






