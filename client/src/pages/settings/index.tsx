import { useRouter } from "next/router";
import styles from "../../styles/home.module.css";
import { DoubleButton, LargeButton } from "../../components/Buttons";
import { useAppDispatch, useAppSelector } from "../../store/hooks";
import { getUser, setLoginData } from "../../store/Slices/userSlice";

const Settings = () => {
  const router = useRouter();
  const user = useAppSelector(getUser);

  return (
    <div className={styles.container}>
      {user.name && (
        <>
          <LargeButton
            title={"Productos"}
            onClick={() => router.push("/products")}
          />
          <LargeButton
            title={"Ataúdes"}
            onClick={() => router.push("/deceased")}
          />
          <LargeButton
            title={"Depósitos"}
            onClick={() => router.push("/deceased")}
          />
          <LargeButton
            title={"Proveedores"}
            onClick={() => router.push("/places")}
          />
          <LargeButton
            title={"Empresas"}
            onClick={() => router.push("/places")}
          />
          <LargeButton
            title={"Cementerios"}
            onClick={() => router.push("/cementeries/new")}
          />
        </>
      )}
    </div>
  );
};

export default Settings;
