import { useRouter } from 'next/router'
import { LargeButton } from '../../components/Buttons'
import styles from './styles/newAdd.module.css'
import { useAppDispatch, useAppSelector } from '../../store/hooks'
import { getUser, setLoginData } from '../../store/Slices/userSlice'

const NewAdds = ()=>{

    const router = useRouter()
    const user = useAppSelector(getUser)
    return(
        <div className={styles.container}>
            <div className={styles.title}>Nuevo Ingreso</div>
            {user.admin &&
                <LargeButton
                    title='Ataúd'
                    onClick={()=>router.push('/newAdd/addCoffin')}
                />
            }
            <LargeButton
                title='Productos'
                onClick={()=>router.push('/newAdd/addProducts')}
            />
        </div>
    )
}
export default NewAdds