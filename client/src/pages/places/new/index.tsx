import {useEffect, useState} from 'react'
import { FormButton } from "../../../components/Buttons"
import { getAllPlaces } from '../functions'
import { useAppDispatch, useAppSelector } from '../../../store/hooks'
import { getplace } from '../../../store/Slices/place'
import { createToast } from '../../../components/Notifications/Notifications'
import { postPlaceApi } from '../../../services/placesApi'
import styles from '../styles/places.module.css'

const initialPlaceState={
    name: "",
    initials: ""
}

const newPlace = ()=>{

    const [place, setPlace]= useState(initialPlaceState)

    const dispatch = useAppDispatch()
    const places=useAppSelector(getplace)

    useEffect(()=>{
        getAllPlaces(dispatch)
    },[])

    const handleChange=(e: any)=>{
        e.preventDefault();
        setPlace({
            ...place,
            [e.target.name]: e.target.value
        })
    }

    const handleSubmit = async (e: any)=>{
        e.preventDefault();
        if(!place.name){
            createToast("warning","Debe ingresar un nombre");
        }
        else if(!place.initials){
            createToast("warning","Debe ingresar las iniciales");
        }
        else if(places.find(p=>p.name===place.name)){
            createToast("warning","El nombre ingresado ya existe. Por favor ingrese otro nombre");
        }
        else if(places.find(p=>p.initials===place.initials)){
            createToast("warning","Las iniciales ingresadas ya existe. Por favor ingrese otras iniciales");            
        }
        else{
            try{
                const response = await postPlaceApi(place);
                if (response?.data.status === "ok") {
                    createToast("success","Depósito creado con éxito");
                } else {
                    createToast("error","Verifique que los datos ingresados sean correctos");
                }
            }
            catch (err){
                createToast("warning","ocurrio un error, vuelva a intentar");
                console.log(err)
            }
        }
    }

    return (
        <div className={styles.container}>
            <form onSubmit={handleSubmit}>
                <div className={styles.title}>Nuevo Depósito:</div>
                <div>
                    <div>Nombre del Lugar:</div>
                    <input
                        type="text"
                        id="name"
                        name="name"
                        value={place.name}
                        onChange={handleChange}
                        placeholder="San Pedro"
                    />
                </div>
                <div>
                    <div>Iniciales:</div>
                    <input
                        type="text"
                        id="initials"
                        name="initials"
                        value={place.initials}
                        onChange={handleChange}
                        placeholder="SP"
                    />
                </div>
                <FormButton
                title='Guardar'
                />
            </form>
        </div>
    )
}
export default newPlace