import React from 'react';
import styles from './Cabecalho.module.css';
import { Outlet } from 'react-router-dom';
import { useEffect, useState } from 'react';

export function Cabecalho({navigation}) {
    const username = localStorage.getItem('username');
    const email = localStorage.getItem('email');
   
    const handleLogout = () => {
      
        localStorage.removeItem('username');
        localStorage.removeItem('email');
        localStorage.removeItem('access_token');
        localStorage.removeItem('refresh_token');
      
       
    };
    const [currentDate, setCurrentDate] = useState('');


    useEffect(() => {
        const date = new Date();
        const options = { year: 'numeric', month: 'long', day: 'numeric' };
        const formattedDate = date.toLocaleDateString('pt-BR', options);
        setCurrentDate(formattedDate);
    }, []);

    return (
        <>
        <header className={styles.conteiner}>
            <div className={styles.logotipo}>
                <img src="src/assets/LOGOSENAI.png" alt="Logotipo Senai" />
            </div>
            <div className={styles.perfilConteiner}>
                <div className={styles.textPerfil}>
                    <h4>{username}</h4>
                    <p>{currentDate}</p>
                </div>
                <div className={styles.logout}>
                    <a href='/' onClick={handleLogout}>Logout</a>
                </div>
            </div>
        </header>
       
        </>
    );
}
