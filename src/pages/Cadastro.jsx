import React from 'react';
import { useForm } from 'react-hook-form';
import { z } from 'zod';
import { zodResolver } from '@hookform/resolvers/zod';
import styles from './Cadastro.module.css';
import { Outlet, useNavigate } from 'react-router-dom';
import axios from 'axios';

const schemaPerfil = z.object({
    usuario: z.string().min(1, 'Usuário é obrigatório'),
    email: z.string().email('E-mail inválido'),
    senha: z.string().min(6, 'A senha deve ter pelo menos 6 caracteres')
});

export default function Cadastro({navigation}) {
    const { register, handleSubmit } = useForm({
        resolver: zodResolver(schemaPerfil)
    });

    async function obterDadosFormulario(data) {
        try {
            const token = localStorage.getItem('access_token');

            const response = await axios.post('https://adamfilho.pythonanywhere.com/api/create_user/', {
                username: data.usuario,
                email: data.email,
                password: data.senha
            }, {
                headers: {
                    'Authorization': `Bearer ${token}`
                }
            });

            alert('Usuário cadastrado com sucesso!');
        } catch (error) {
            console.log("Erro no cadastro", error);
            if (error.response && error.response.status === 403) {
                alert('Você não tem permissão para criar um novo usuário.');
            } else {
                alert('Erro ao cadastrar usuário');
            }
        }
    }

    return (
        <div className={styles.conteiner}>
            <form className={styles.formulario} onSubmit={handleSubmit(obterDadosFormulario)}>
                <h2 className={styles.titulo}>Cadastro</h2>
                <h4>Cadastre um usuário</h4>
                <div className={styles.inputContainer}>
                    <svg className={styles.icon} viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                        <path d="M12 12c2.21 0 4-1.79 4-4s-1.79-4-4-4-4 1.79-4 4 1.79 4 4 4zm0 2c-2.67 0-8 1.34-8 4v2h16v-2c0-2.66-5.33-4-8-4z" fill="#84E4C7"/>
                    </svg>
                    <input
                        className={styles.campo}
                        {...register('usuario')}
                        placeholder="Insira o usuário"
                    />
                </div>

                <div className={styles.inputContainer}>
                    <svg className={styles.icon} viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg"> 
                        <path d="M20 4H4c-1.1 0-1.99.9-1.99 2L2 18c0 1.1.9 2 2 2h16c1.1 0 2-.9 2-2V6c0-1.1-.9-2-2-2zm0 4l-8 5-8-5V6l8 5 8-5v2z" fill="#84E4C7"/> 
                    </svg>
                    <input
                        className={styles.campo}
                        {...register('email')}
                        placeholder="Insira o  e-mail"
                    />
                </div>

                <div className={styles.inputContainer}>
                    <svg className={styles.icon} viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                        <path d="M12 2C9.79 2 8 3.79 8 6v2H6c-1.1 0-2 .9-2 2v10c0 1.1.9 2 2 2h12c1.1 0 2-.9 2-2V10c0-1.1-.9-2-2-2h-2V6c0-2.21-1.79-4-4-4zm0 2c1.1 0 2 .9 2 2v2H10V6c0-1.1.9-2 2-2zm6 8v8H6v-8h12z" fill="#84E4C7"/>
                    </svg>
                    <input
                        className={styles.campo}
                        {...register('senha')}
                        type="password"
                        placeholder="Insira a senha"
                    />
                </div>
                <button className={styles.botao}>Cadastrar</button>
                <div className={styles.textConteiner}></div>
            </form>
            <Outlet/>
        </div>
    );
}
