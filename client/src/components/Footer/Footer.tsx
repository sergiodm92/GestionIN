import { useRouter } from 'next/router'
import styles from './styles/footer.module.css'

const Footer = ()=>{

    const router = useRouter()

    return (
        <div className={styles.container}>
            <div>Copyright 2023 | Todos los derechos reservados | DR full code</div>
            <div>✉ drfullcode@gmail.com</div>
            <div onClick={()=>router.push('https://www.instagram.com/drfullcode/')} className={styles.links}>@drfullcode</div>
            <div className={styles.wpp}>
                <div>📱</div>
                <div onClick={()=>router.push('https://wa.me/+5493874736563')} className={styles.links}>3874736563</div>
                <div onClick={()=>router.push('https://wa.me/+5493875185752')} className={styles.links}>3875185752</div>
            </div>
        </div>
    )    
}
export default Footer