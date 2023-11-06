import { useRouter } from 'next/router'
import { LargeButton } from '../../components/Buttons'
import styles from './styles/newAdd.module.css'

const NewAdds = ()=>{

    const router = useRouter()

    return(
        <div className={styles.container}>
            <div className={styles.title}>Nuevo Ingreso</div>
            <LargeButton
                title='Ataúd'
                onClick={()=>router.push('/newAdd/addCoffin')}
            />
            <LargeButton
                title='Otros'
                onClick={()=>router.push('/newAdd/addGeneral')}
            />
        </div>
    )
}
export default NewAdds