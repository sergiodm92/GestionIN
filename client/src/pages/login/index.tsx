import { useState } from "react";
import { useRouter } from 'next/router';
import { createToast } from "../../components/Notifications/Notifications";
import { LoginUserApi } from "../../services/userApi";
import { FormButton } from "../../../src/components/Buttons";
import styles from './styles/login.module.css';

const initialStateUser = {
    name: '',
    password: ''
}

const Login = ()=>{

    const router = useRouter()


    const [user, setUser] = useState(initialStateUser)

    const handleChange = (e: any) => {
        e.preventDefault();
        setUser({
            ...user,
            [e.target.name]: e.target.value
        })
    }

    const handleSubmit = async (e: any) => {
        e.preventDefault();
        try {
            const json = await LoginUserApi(user);
            const response = json.data
            if(response.status === "ok"){
                createToast("success","Bienvenido");
                localStorage.setItem("authToken", response.data.token)
                localStorage.setItem("userName", response.data.user.name)
                localStorage.setItem("userAdmin", response.data.user.admin)
                localStorage.setItem("userPlace", response.data.user.place)
                router.push('/');
            }
            else{
                createToast("error","Usuario o contraseña incorrectos, vuelva a intentar");
            }
          } catch (error) {
            createToast("warning","ocurrio un error, vuelva a intentar");
            console.error(error);
          }
      };

    return(
        <div className={styles.loginContainer}>
            <form onSubmit={handleSubmit} className={styles.form}>
                <div className={styles.loginTitle}>Iniciar Sesión</div>
                <div>
                    <div className={styles.inputText}>Ingresar usuario:</div>
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
                    <div className={styles.inputText}>Ingresar contraseña:</div>
                    <input
                        className={styles.input}
                        type="password"
                        id="password"
                        name="password"
                        value={user.password}
                        onChange={handleChange}
                    />
                </div>
                <FormButton
                    title={"Ingresar"}
                    loading={true}
                />
            </form>
        </div>

    )    
}
export default Login