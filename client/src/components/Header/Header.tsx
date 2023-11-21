import { useRouter } from 'next/router'
import { useAppDispatch, useAppSelector } from '../../store/hooks'
import { getUser, setLoginData } from '../../store/Slices/userSlice'
import { useEffect, useState, useRef } from 'react'
import styles from './styles/header.module.css'
import { handleRegister, handleHelp, handleHome, handleLogIn, handleLogOut, toggleMenu } from '../functions/Header/functions'

const Header = ()=>{

    const user = useAppSelector(getUser)
    const dispatch = useAppDispatch()
    const router = useRouter()

    const [menuOpen, setMenuOpen] = useState(false)
    const menuRef = useRef(null);

    useEffect(()=>{
        dispatch(setLoginData())
    },[user])

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

    return (
        <div className={styles.container}>
            <div className={styles.leftDiv} onClick={()=>handleHome(router)}>
                <div className={styles.logo}></div>
                <div className={styles.textContainer}>
                    <div className={styles.subtitle}>SERVICIOS SOCIALES</div>
                    <div className={styles.title}>INSTITUTO DEL NORTE S.A.</div>
                    <div className={styles.description}>Sepelios - Velatorios - Traslados</div>
                </div>
            </div>
            <div className={styles.rightDiv}>
                <div onClick={()=>handleHelp(router, menuOpen, setMenuOpen)} className={styles.session}>Ayuda</div>
                {user.admin && <div onClick={()=>handleRegister(router, menuOpen, setMenuOpen)} className={styles.session}>Agregar Usuario</div>}
                {user.name?
                (<div className={styles.sessionDiv}>
                    <div>{user.name}</div>
                    <div onClick={()=>handleLogOut(dispatch, menuOpen, setMenuOpen)} className={styles.session}>
                        Cerrar Sesion
                    </div>
                </div>)
                : (<div onClick={()=>handleLogIn(router, menuOpen, setMenuOpen)} className={styles.session}>
                    Iniciar Sesion
                </div>)}
            </div>
            <div className={styles.sandwichMenu} onClick={()=>toggleMenu(menuOpen, setMenuOpen)}>
                <div className={styles.line}></div>
                <div className={styles.line}></div>
                <div className={styles.line}></div>
            </div>
            <div ref={menuRef} className={menuOpen? styles.menu : styles.menuNone}>
            {user.admin && <div className={styles.menuItems} onClick={()=>handleRegister(router, menuOpen, setMenuOpen)}>Agregar Usuario</div>}
                <div className={styles.menuItems} onClick={()=>handleHelp(router, menuOpen, setMenuOpen)}>Ayuda</div>
                <div className={styles.menuItems} onClick={user.name ? ()=>handleLogOut(dispatch, menuOpen, setMenuOpen) : ()=>handleLogIn(router, menuOpen, setMenuOpen)}>{user.name? "Cerrar Sesion":"Iniciar Sesion"}</div>
            </div>
        </div>
    )
}
export default Header