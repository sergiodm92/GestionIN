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
                title='Cajas Metálicas'
                onClick={()=>router.push('/adds/metal_box')}
            />
            <LargeButton
                title='Otros'
                onClick={()=>router.push('/adds/general')}
            />
        </div>
    )
}
export default Adds