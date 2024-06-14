import React, { useState } from 'react';
import { useForm } from 'react-hook-form';
import { z } from 'zod';
import { zodResolver } from '@hookform/resolvers/zod';
import styles from './LoginPage.module.css';
import { Outlet, useNavigate, Link } from 'react-router-dom';
import axios from 'axios';
import logomarca from "../assets/logomarca.svg"

const schemaPerfil = z.object({
    usuario: z.string()
        .min(5, 'Mínimo de caracteres é 5')
        .max(15, 'Máximo de caracteres é 10'),
    senha: z.string()
        .min(6, 'Informe 6 caracteres')
        .max(8, 'Maximo caracteres é 8')    
});

export default function Login() {
    const navigate = useNavigate();
    const [error, setError] = useState(null);
    const {
        register,
        handleSubmit,
        formState:{ errors }
    } = useForm({
        resolver:zodResolver(schemaPerfil)
    });

    async function obterDadosFormulario(data) {
        try{
            const response = await axios.post('https://adamfilho.pythonanywhere.com/api/token/',{
                username: data.usuario,
                password: data.senha
            });
            const {access, refresh} = response.data;
            
            localStorage.setItem('username', data.usuario);
            localStorage.setItem('password', data.senha);
            console.log(data.senha)

            localStorage.setItem('access_token', access)
            localStorage.setItem('refresh_token', refresh)
           
            navigate('/inicial');
        }
        catch(error){
            setError('Login inválido');
        }
    }

    return (
       <div className={styles.conteiner}>
           <div className={styles.logoConteiner}>
             <img className={styles.logo} src={logomarca} alt="" />
           </div>
          
           
             <form className={styles.formulario} onSubmit={handleSubmit(obterDadosFormulario)}>
             <h1 className={styles.titulo}>Login</h1>
             <div className={styles.inputContainer}>
                <svg className={styles.icon} viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                 <path d="M12 12c2.21 0 4-1.79 4-4s-1.79-4-4-4-4 1.79-4 4 1.79 4 4 4zm0 2c-2.67 0-8 1.34-8 4v2h16v-2c0-2.66-5.33-4-8-4z"
                 fill="#84E4C7"
                 />
                </svg>
                <input
                  className={styles.campo}
                  {...register('usuario')}
                  placeholder="Insira o seu usuário"
                />
            </div>
            {errors.usuario && (
                    <p className={styles.message}> {errors.usuario.message}</p>
                )}

            <div className={styles.inputContainer}>
            <svg className={styles.icon} viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                <path d="M12 2C9.79 2 8 3.79 8 6v2H6c-1.1 0-2 .9-2 2v10c0 1.1.9 2 2 2h12c1.1 0 2-.9 2-2V10c0-1.1-.9-2-2-2h-2V6c0-2.21-1.79-4-4-4zm0 2c1.1 0 2 .9 2 2v2H10V6c0-1.1.9-2 2-2zm6 8v8H6v-8h12z"
                 fill="#84E4C7"
                />
            </svg>
                <input
                  className={styles.campo}
                  {...register('senha')}
                  type="password"
                  placeholder="Insira a sua senha"
                />
            </div>
            {errors.senha && (
                    <p className={styles.message}> {errors.senha.message}</p>
                )}
            {error && (
                <p className={styles.error}>{error}</p>
            )}
            <button className={styles.botao}>Confirmar</button>
            <div className={styles.textConteiner}>
                
               
            </div>
        </form>
     
      <Outlet/>
    </div>
  );
}
