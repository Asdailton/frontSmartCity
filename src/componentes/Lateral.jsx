import styles from './Lateral.module.css';
import { Link } from 'react-router-dom';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faHome, faChartLine, faMapMarkedAlt, faThermometerHalf, faUser } from '@fortawesome/free-solid-svg-icons'; // Importe faUser para o ícone de perfil
import { Outlet } from 'react-router-dom';

export function Lateral() {
    return (
        <aside className={styles.conteiner}>
            <div className={styles.iconesConteiner}>
                <Link to='/inicial'>
                    <FontAwesomeIcon className={styles.icone} icon={faHome} size="2x" alt="Ícone Home" />
                </Link>
                <Link to='/inicial/sensores'>
                    <FontAwesomeIcon className={styles.icone} icon={faThermometerHalf} size="2x" alt="Ícone Sensores" />
                </Link>
                <Link to='/inicial/dashboard'>
                    <FontAwesomeIcon className={styles.icone} icon={faChartLine} size="2x" alt="Ícone Dashboard" />
                </Link>
                <Link to='/inicial/mapa'>
                    <FontAwesomeIcon className={styles.icone} icon={faMapMarkedAlt} size="2x" alt="Ícone Mapa" />
                </Link>
                <Link to='/inicial/cadastro'>
                    <FontAwesomeIcon className={styles.icone} icon={faUser} size="2x" alt="Ícone Perfil" /> {/* Altere para faUser para o ícone de perfil */}
                </Link>
            </div>
        </aside>
    );
}
