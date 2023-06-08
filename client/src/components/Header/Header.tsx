import { useRouter } from 'next/router'
import { useAppDispatch, useAppSelector } from '../../store/hooks'
import { getUser, setLoginData, setLogoutData } from '../../store/Slices/userSlice'
import { useEffect, useState, useRef } from 'react'
import Swal from 'sweetalert2'
import { createToast } from '../Notifications/Notifications'
import styles from './styles/header.module.css'

const Header = ()=>{

    const user = useAppSelector(getUser)
    const dispatch=useAppDispatch()
    const router = useRouter()

    const [menuOpen, setMenuOpen] = useState(false)
    const menuRef = useRef(null);

    useEffect(()=>{
        dispatch(setLoginData())
    },[])

    useEffect(() => {
        const handleClickOutside = (event : MouseEvent) => {
            if (menuRef.current && !(menuRef.current as HTMLElement).contains(event.target as Node)) {
                setMenuOpen(false);
            }
        };
    
        document.addEventListener('mousedown', handleClickOutside);
    
        return () => {
          document.removeEventListener('mousedown', handleClickOutside);
        };
      }, []);

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
                if(menuOpen){
                    setMenuOpen(!menuOpen);
                }
            } else if (
              /* Read more about handling dismissals below */
              result.dismiss === Swal.DismissReason.cancel
            ) {
                createToast("warning","No cerro sesion");
            }
          });
    }

    const handleHelp = ()=>{
        router.push('/help')
        if(menuOpen){
            setMenuOpen(!menuOpen);
        }
    }
    const handleAbout = ()=>{
        router.push('/about')
        if(menuOpen){
            setMenuOpen(!menuOpen);
        }
    }
    const handleLogIn = ()=>{
        router.push('/login')
        if(menuOpen){
            setMenuOpen(!menuOpen);
        }
    }
    const handleHome = ()=>{
        router.push('/')
    }
    const toggleMenu = () => {
        setMenuOpen(!menuOpen);
      };

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
            <div className={styles.rightDiv}>
                <div onClick={handleHelp} className={styles.session}>Ayuda</div>
                <div onClick={handleAbout} className={styles.session}>Sobre Nosotros</div>
                {user.name?
                (<div className={styles.sessionDiv}>
                    <div>{user.name}</div>
                    <div onClick={handleLogOut} className={styles.session}>
                        Cerrar Sesion
                    </div>
                </div>)
                : (<div onClick={handleLogIn} className={styles.session}>
                    Iniciar Sesion
                </div>)}
            </div>
            <div className={styles.sandwichMenu} onClick={toggleMenu}>
                <div className={styles.line}></div>
                <div className={styles.line}></div>
                <div className={styles.line}></div>
            </div>
            <div ref={menuRef} className={menuOpen? styles.menu : styles.menuNone}>
                <div className={styles.menuItems} onClick={handleAbout}>Sobre Nosotros</div>
                <div className={styles.menuItems} onClick={handleHelp}>Ayuda</div>
                <div className={styles.menuItems} onClick={user.name ? handleLogOut : handleLogIn}>{user.name? "Cerrar Sesion":"Iniciar Sesion"}</div>
            </div>
        </div>
    )
    
}
export default Header