import { setLogoutData } from "../../../store/Slices/userSlice"
import { createToast, questionAlert } from "../../Notifications/Notifications"

export const alertLogOut = (dispatch: any, menuOpen: boolean, setMenuOpen: any)=>{
    dispatch(setLogoutData())
            localStorage.setItem("authToken", "")
            localStorage.setItem("userName", "")
            localStorage.setItem("userAdmin", "")
            localStorage.setItem("userPlace", "")
            createToast("success","Cerro sesion correctamente");
            if(menuOpen){
                setMenuOpen(!menuOpen);
            }
}
export const handleLogOut = (dispatch: any, menuOpen: boolean, setMenuOpen: any)=>{
    questionAlert(
        "Cerrar Sesion",
        "¿Esta seguro que desea cerrar sesion?",
        alertLogOut(dispatch, menuOpen, setMenuOpen),
        "No cerro sesion"
    )
}

export const handleHelp = (router: any, menuOpen: boolean, setMenuOpen: any)=>{
    router.push('/help')
    if(menuOpen){
        setMenuOpen(!menuOpen);
    }
}
export const handleAbout = (router: any, menuOpen: boolean, setMenuOpen: any)=>{
    router.push('/about')
    if(menuOpen){
        setMenuOpen(!menuOpen);
    }
}
export const handleLogIn = (router: any, menuOpen: boolean, setMenuOpen: any)=>{
    router.push('/login')
    if(menuOpen){
        setMenuOpen(!menuOpen);
    }
}
export const handleHome = (router: any)=>{
    router.push('/')
}
export const toggleMenu = (menuOpen: boolean, setMenuOpen: any) => {
    setMenuOpen(!menuOpen);
  };