import { Button, ButtonClick, DobleButton } from "../../types/interfaces";
import styles from "./styles/buttons.module.css";

export const FormButton = (data: Button) => {
  const { title } = data;
  return (
    <div>
      <button className={styles.btn} type="submit">
        {title}
      </button>
    </div>
  );
};

export const DoubleButton = (data: DobleButton) => {
  const { title1, title2, onClick1, onClick2 } = data;
  return (
    <div className={styles.cont}>
      <button className={styles.button1} onClick={onClick1}>
        {title1}
      </button>
      <button className={styles.button2} onClick={onClick2}>
        {title2}
      </button>
    </div>
  );
};

export const LargeButton = (data: ButtonClick) => {
  const { title, onClick } = data;
  return (
    <div>
      <button className={styles.largeButton} onClick={onClick}>
        {title}
      </button>
    </div>
  );
};