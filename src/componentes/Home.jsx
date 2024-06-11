
import { Card } from './Cart'
import styles from './Home.module.css'
import { List } from './Lista'
import bannerPrincipal from '../assets/bannerSmartCity.svg'
import iconeBrasil from '../assets/iconeBrasil.svg'
import { Outlet } from 'react-router-dom'

export function Home(){
    return(
        <main className={styles.container}>

          
             <div className={styles.containerTop}>
                <h1 className={styles.title}>Bem 
                <span style={{ color: '#84E4C7' }}> vindo!</span></h1>
                <div className={styles.containerBrasil}>
                    <img className={styles.iconeBrasil} src={iconeBrasil} alt="ícone do brasil" />
                </div>
            </div>
            
            
            
            <img className={styles.banner} src={bannerPrincipal} alt="Banner Principal" />

            <h1 className={styles.titleDois}>Sobre 
            <span style={{ color: '#84E4C7' }}> Nós</span></h1>
            
            <div className={styles.modalConteiner}>
               <div className={styles.modal}>
                   <h3>Localização Avançada</h3>
                   <p>Veja a temperatura dos principais locais da escola
                        através da sua localizção com uso de GPS
                    </p>
               </div>
               <div className={styles.modal}>
                  <h3>Dados em tempo real</h3>
                  <p>
                    Captura dos dados em tempo real
                    e 100% de acuracidade.
                  </p>
                
                </div>
                <div className={styles.modal}>
                    <h3>Vizualização em gráficos</h3>
                    <p>
                        Na aba de Dashboard você encontrará uma análise
                        profunda de dados gerados pelos sensores em toda 
                        a escola.
                    </p>
                </div>
            </div>
        </main>
    )
}