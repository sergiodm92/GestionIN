import { use, useEffect, useState } from "react"
import { useRouter } from 'next/router';
import { postNewUserApi } from "../../services/userApi"
import { createToast } from "../../components/Notifications/Notifications"
import { FormButton } from "../../components/Buttons";
import styles from './styles/register.module.css'
import Loading from "../../components/Loading/loading";
import { getUser, setLoginData } from '../../store/Slices/userSlice'
import { useAppDispatch, useAppSelector } from '../../store/hooks'

const initialStateUser = {
    name: '',
    password: '',
    admin: false,
    place: ''
}


const Register = ()=>{

    const router = useRouter()
    const userGlobal = useAppSelector(getUser)
    const [user, setUser] = useState(initialStateUser)
    const [p1, setP1]=useState('')
    const [p2, setP2]=useState('')
    const [isLoading, setIsLoading] = useState(false);

    const handleChangeP1 = (e: any) => {
        e.preventDefault();
        setP1(e.target.value)
    }

    const handleChangeP2 = (e: any) => {
        e.preventDefault();
        setP2(e.target.value)
    }

    const handleChange = (e: any) => {
        e.preventDefault();
        setUser({
            ...user,
            [e.target.name]: e.target.value
        })
    }

    const handleSelectChange = (e: any) => {
        e.preventDefault();
        setUser({
            ...user,
            admin: e.target.value==="true"?true:false
        })
    }

    const handleSubmit = async (e: any) => {
        e.preventDefault();
        setIsLoading(true)
            user.password=p1
        if(p1===p2){
            try {
                const response = await postNewUserApi(user);
                if(response.data.status === "ok"){
                    createToast("success","Usuario creado correctamente");
                    router.push('/login');
                }
                else{
                    createToast("error","Verifique que los datos ingresados sean correctos");
                }
              } catch (error) {
                    createToast("warning","ocurrio un error, vuelva a intentar");
                    console.error(error);
              }
            setUser(initialStateUser)
            setP1('')
            setP2('')
        }
        else{
            createToast("error","Las contaseñas no coinciden");
        }
        setIsLoading(false)
      };
      useEffect(() => {
        // userGlobal.admin? null:router.push('/')
        console.log(userGlobal)
        if(userGlobal.admin===false){
            router.push('/')
        }
      }, []);

    return(
        <div className={styles.loginContainer}>
            <form onSubmit={handleSubmit} className={styles.form}>
                <div className={styles.loginTitle}>Nueva cuenta</div>
                <div>
                    <div className={styles.inputText}>Usuario:</div>
                    <input
                        className={styles.input}
                        type="text"
                        id="name"
                        name="name"
                        value={user.name}
                        onChange={handleChange}
                    />
                </div>
                <div>
                    <div className={styles.inputText}>Contraseña:</div>
                    <input
                        className={styles.input}
                        type="password"
                        id="password1"
                        name="password1"
                        value={p1}
                        onChange={handleChangeP1}
                    />
                </div>
                <div>
                    <div className={styles.inputText}>Confirmar contraseña:</div>
                    <input
                        className={styles.input}
                        type="password"
                        id="password2"
                        name="password2"
                        value={p2}
                        onChange={handleChangeP2}
                    />
                </div>
                <div>
                    <div className={styles.inputText}>Lugar:</div>
                    <input
                        className={styles.input}
                        type="text"
                        id="place"
                        name="place"
                        value={user.place}
                        onChange={handleChange}
                    />
                </div>
                <div>
                    <div className={styles.inputText}>¿Administrador?:</div>
                    <select
                        className={styles.select}
                        id="admin"
                        name="admin"
                        value={user.admin.toString()}
                        onChange={handleSelectChange}
                    >
                    <option value="false">No</option>
                    <option value="true">Si</option>
                    </select>
                </div>
                <FormButton
                    title={isLoading? <Loading/> :"Crear"}
                    loading={isLoading}
                    disabled={isLoading}
                />
            </form>
        </div>

    )    
}
export default Register