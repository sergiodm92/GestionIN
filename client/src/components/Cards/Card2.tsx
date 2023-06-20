import { Card2 } from "../../types/interfaces";
import styles from './styles/cards.module.css'

const Card2 = (data: Card2)=>{
    const {onClick, space1, space2, space3, space4} = data
    return(
        <div className={styles.cardContainer} onClick={onClick}>
            <div className={styles.smallSpace}>{space1}</div>
            <div className={styles.smallSpace}>{space2}</div>
            <div className={styles.smallSpace}>{space3}</div>
            <div className={styles.smallSpace}>{space4}</div>
        </div>
    )
}
export default Card2