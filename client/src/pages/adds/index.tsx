import { useRouter } from 'next/router'
import { LargeButton } from '../../components/Buttons'
import styles from './styles/Adds.module.css'

const Adds = ()=>{

    const router = useRouter()

    return(
        <div className={styles.containerII}>
            <div className={styles.title}>Ver Ingresos</div>
            <LargeButton
                title='Ataúdes'
                onClick={()=>router.push('/adds/coffin')}
            />
            <LargeButton
                title='Productos'
                onClick={()=>router.push('/adds/products')}
            />
        </div>
    )
}
export default Adds