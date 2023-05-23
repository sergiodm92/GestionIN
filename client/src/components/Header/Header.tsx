import { useRouter } from 'next/router'
import { useAppDispatch, useAppSelector } from '../../store/hooks'
import { getUser, setLoginData, setLogoutData } from '../../store/Slices/userSlice'
import { useEffect } from 'react'
import Swal from 'sweetalert2'
import { createToast } from '../Notifications/Notifications'
import styles from './styles/header.module.css'

const Header = ()=>{

    const user = useAppSelector(getUser)
    const dispatch=useAppDispatch()
    const router = useRouter()

    useEffect(()=>{
        dispatch(setLoginData())
    },[])

    const handleLogOut = ()=>{
        Swal.fire({
            title: "Cerrar Sesion",
            text: "¿Esta seguro que desea cerrar sesion?",
            icon: "warning",
            showCancelButton: true,
            confirmButtonText: "Si",
            cancelButtonText: "Cancelar",
            confirmButtonColor: "#43815A",
            cancelButtonColor: "#b32020",
          }).then((result) => {
            if (result.isConfirmed) {
                dispatch(setLogoutData())
                localStorage.setItem("authToken", "")
                localStorage.setItem("userName", "")
                localStorage.setItem("userAdmin", "")
                localStorage.setItem("userPlace", "")
                createToast("success","Cerro sesion correctamente");
            } else if (
              /* Read more about handling dismissals below */
              result.dismiss === Swal.DismissReason.cancel
            ) {
                createToast("warning","No cerro sesion");
            }
          });
    }

    const handleLogIn = ()=>{
        router.push('/login')
    }
    const handleHome = ()=>{
        router.push('/')
    }

    return (
        <div className={styles.container}>
            <div className={styles.leftDiv} onClick={handleHome}>
                <div className={styles.logo}></div>
                <div className={styles.textContainer}>
                    <div className={styles.subtitle}>SERVICIOS SOCIALES</div>
                    <div className={styles.title}>INSTITUTO DEL NORTE S.A.</div>
                    <div className={styles.description}>Sepelios - Velatorios - Traslados</div>
                </div>
            </div>
            <div className={styles.rigthDiv}>
                {user.name?
                (<>
                    <div>{user.name}</div>
                    <div onClick={handleLogOut} className={styles.sesion}>
                        Cerrar Sesion
                    </div>
                </>)
                : (<div onClick={handleLogIn} className={styles.sesion}>
                    Iniciar Sesion
                </div>)}
            </div>
        </div>
    )
    
}
export default Header