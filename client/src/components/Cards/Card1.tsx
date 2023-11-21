import { Card1 } from "../../types/interfaces";
import styles from './styles/cards.module.css'

const Card1 = (data: Card1)=>{
    const {onClick, space1, space2, space3} = data
    return(
        <div className={styles.cardContainer} onClick={onClick}>
            <div className={styles.smallSpace}>{space1}</div>
            <div className={styles.smallSpace}>{space2.length>13?space2.slice(0,13)+"..":space2}</div>
            <div className={styles.smallSpace}>{space3}</div>
        </div>
    )
}
export default Card1