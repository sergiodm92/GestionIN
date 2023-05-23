import { LargeButton } from "../../components/Buttons"
import { useRouter } from "next/router"
import styles from "../../styles/home.module.css"

const Places = ()=>{

    const router = useRouter()

    return(
        <div className={styles.container}>
            <LargeButton
                title={"San Pedro"}
                onClick={()=>router.push('/stock/San Pedro')}
            />
            <LargeButton
                title={"San Salvador de Jujuy"}
                onClick={()=>router.push('/stock/San Salvador de Jujuy')}
            />
            <LargeButton
                title={"Fraile Pintado"}
                onClick={()=>router.push('/stock/Fraile Pintado')}
            />
            <LargeButton
                title={"Libertador Gral. San Martin"}
                onClick={()=>router.push('/stock/Libertador Gral. San Martin')}
            />
            <LargeButton
                title={"Salta"}
                onClick={()=>router.push('/stock/Salta')}
            />
            <LargeButton
                title={"Colonia"}
                onClick={()=>router.push('/stock/Colonia')}
            />
            <LargeButton
                title={"Tartagal"}
                onClick={()=>router.push('/stock/Tartagal')}
            />
            <LargeButton
                title={"Embarcación"}
                onClick={()=>router.push('/stock/Embarcacion')}
            />
        </div>
    )    
}
export default Places