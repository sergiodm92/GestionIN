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
            onClick={() => router.push("/settings/products")}
          />
          <LargeButton
            title={"Ataúdes"}
            onClick={() => router.push("/settings/coffins")}
          />
          <LargeButton
            title={"Depósitos"}
            onClick={() => router.push("/settings/places")}
          />
          <LargeButton
            title={"Proveedores"}
            onClick={() => router.push("/settings/suppliers")}
          />
          <LargeButton
            title={"Empresas"}
            onClick={() => router.push("/settings/companies")}
          />
          <LargeButton
            title={"Cementerios"}
            onClick={() => router.push("/settings/cementeries")}
          />
        </>
      )}
    </div>
  );
};

export default Settings;
