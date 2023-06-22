import { useState } from "react"
import { useRouter } from 'next/router';
import { postNewUserApi } from "../../services/userApi"
import { createToast } from "../../components/Notifications/Notifications"
import { FormButton } from "../../components/Buttons";
import styles from './styles/register.module.css'
import Loading from "../../components/Loading/loading";

const initialStateUser = {
    name: '',
    password: '',
    admin: true,
    place: ''
}

const Register = ()=>{

    const router = useRouter()

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

    const handleSubmit = async (e: any) => {
        e.preventDefault();
        setIsLoading(true)
        if(p1===p2){
            user.password=p1
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
        }
        else{
            createToast("error","Las contaseñas no coinciden");
        }
        setIsLoading(false)
      };

    return(
        <div className={styles.loginContainer}>
            <form onSubmit={handleSubmit} className={styles.form}>
                <div className={styles.loginTitle}>Registrarse</div>
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
                    <div className={styles.inputText}>Contraseña nuevamente:</div>
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
                <FormButton
                    title={isLoading? <Loading/> :"Registrarse"}
                    loading={isLoading}
                    disabled={isLoading}
                />
            </form>
        </div>

    )    
}
export default Register