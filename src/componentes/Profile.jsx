import {useForm} from 'react-hook-form'
import {z} from 'zod'
import { zodResolver } from '@hookform/resolvers/zod'
import styles from './Profile.module.css'
import { useNavigate } from 'react-router-dom'




const schemaPerfil = z.object({
    nome: z.string()
        .min(1, 'Digite um nome')
        .max(25, 'A quantidade de caracteres é 25'),
    usuario: z.string()
        .min(5, 'Mínimo de caracteres é 5')
        .max(10, 'Máximo de caracteres é 10'),
    senha: z.string()
        .min(8, 'Informe 8 caracteres')
        .max(8, 'Maximo caracteres é 8')    
})

export  function Perfil(){
    const navigate = useNavigate()
    const{
        register,
        handleSubmit,
        formState:{errors}
    } = useForm({
        resolver:zodResolver(schemaPerfil)
    })

    function obterDadosFormulario(data){
        console.log(`Nome: ${data.nome}`)
        console.log(`Usuario: ${data.usuario}`)
        console.log(`Senha: ${data.senha}`)
        navigate('/inicial')
    }

    return(
       <div className={styles.conteiner}>
        <p className={styles.titulo}>Perfil</p>
            <form className={styles.formulario} onSubmit={handleSubmit(obterDadosFormulario)}>
                <input className={styles.campo}
                 {...register('nome')} placeholder='Insira o seu nome'
                />
                  {errors.nome && (
                    <p className={styles.mensagem}> {errors.nome.message}</p>
                )}
                <input className={styles.campo}
                 {...register('usuario')} placeholder='Insira o seu usuário'
                />
                  {errors.usuario && (
                    <p className={styles.mensagem}> {errors.usuario.message}</p>
                )}
                <input className={styles.campo}
                {...register('senha')} placeholder='Insira a sua senha'
                />
                {errors.senha && (
                    <p className={styles.mensagem}> {errors.senha.message}</p>
                )}

                <button className={styles.botao}>Confirmar</button>

            </form>
       </div> 

    )
}