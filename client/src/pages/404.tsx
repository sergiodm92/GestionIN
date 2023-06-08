import { useRouter } from 'next/router';
import { SmallBtn } from '../components/Buttons';
import styles from '../styles/404.module.css'

const NotFound = () => {

  const router = useRouter()

  return (
    <div className={styles.container}>
      <div className={styles.number}>404</div>
      <div className={styles.title}>Oops! Esta página no existe.</div>
      <div className={styles.description}>
        Lo sentimos, no hemos podido encontrar la página que está buscando.
      </div>
      <SmallBtn
        title='Volver al inicio'
        onClick={()=>router.push('/')}
      />
    </div>
  );
};

export default NotFound;
