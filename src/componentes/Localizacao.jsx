import axios from "axios";
import { useState, useEffect } from "react";
import Mapa from "./Mapa"
import { Outlet } from "react-router-dom";
import styles from './Localizacao.module.css'

export function Localizacao() {
    const [pontos, setPontos] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);

    useEffect(() => {
        async function fetchSensores() {
            try {
                const token = localStorage.getItem('access_token');
                const response = await axios.get('https://adamfilho.pythonanywhere.com/api/sensores/', {
                    headers: {
                        'Authorization': `Bearer ${token}`
                    }
                });
                console.log(response.data)
                const sensores = response.data;
                const pontos = sensores.map(sensor => ({
                    latitude: sensor.latitude,
                    longitude: sensor.longitude,
                    tipo: sensor.tipo,
                    localizacao: sensor.localizacao,
                }));
                setPontos(pontos);
                setLoading(false);
            } catch (err) {
                setError(err);
                setLoading(false);
            }
        }

        fetchSensores();
    }, []);

    if (loading) {
        return <div>Carregando...</div>;
    }

    if (error) {
        return <div>Erro ao carregar os dados: {error.message}</div>;
    }

    return (
        <div className={styles.conteiner}>
              <h1 className={styles.title}>Localização dos  
                <span style={{ color: '#84E4C7' }}> Sensores</span></h1>
            <div className={styles.mapConteiner}>
               <Mapa pontos={pontos} />
            </div>
           
            <Outlet/>
        </div>
    );
}
