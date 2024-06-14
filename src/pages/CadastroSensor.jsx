import React, { useState, useEffect } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import styles from './CadastroSensor.module.css';
import { useForm } from "react-hook-form";
import { z } from 'zod';
import { zodResolver } from "@hookform/resolvers/zod";

const schemaSensor = z.object({
    tipo: z.string().nonempty("Não pode estar vazio"),
    mac_adress: z.string().max(20, "Deve ter no máximo 20 caracteres"),
    latitude: z.string().refine(val => !isNaN(parseFloat(val)), { message: "Latitude inválida" }),
    longitude: z.string().refine(val => !isNaN(parseFloat(val)), { message: "Longitude inválida" }),
    localizacao: z.string().min(1, "Deve ter ao menos um dígito").max(100, 'Máximo de 100 caracteres'),
    responsavel: z.string().min(1, "Deve ter ao menos um dígito").max(100, 'Máximo de 100 caracteres'),
    unidade_medida: z.string().min(1, 'Deve ter ao menos um dígito').max(20, 'Máximo de 20 caracteres'),
    status_operacional: z.boolean(),
    observacao: z.string().nullable(),
});

export function CadastroSensor({ onClose }) {
    const navigate = useNavigate();
    const { register, handleSubmit, formState: { errors } } = useForm({
        resolver: zodResolver(schemaSensor)
    });

    const [showModal, setShowModal] = useState(false);
    const [showModalTimeout, setShowModalTimeout] = useState(null);

    async function obterDadosFormulario(data) {
        try {
            const response = await axios.post('https://adamfilho.pythonanywhere.com/api/sensores/', data, {
                headers: {
                    'Authorization': `Bearer ${localStorage.getItem('access_token')}`
                }
            });
            setShowModal(true);
            setTimeout(() => {
                setShowModal(false);
            }, 3000); // 3 segundos
        } catch (error) {
            console.error("Erro ao cadastrar o sensor", error);
        }
    }

    useEffect(() => {
        if (showModal) {
            setShowModalTimeout(setTimeout(() => {
                setShowModal(false);
            }, 3000)); // 3 segundos
        } else if (showModalTimeout) {
            clearTimeout(showModalTimeout);
        }
    }, [showModal]);

    return (
        <div className={styles.container}>
            <form className={styles.formulario} onSubmit={handleSubmit(obterDadosFormulario)}>
                <h1>Cadastro de Sensores</h1>
                <select {...register('tipo')} className={styles.campo}>
                    <option value="">Selecione um tipo</option>
                    <option value="Temperatura">Temperatura</option>
                    <option value="Contador">Contador</option>
                    <option value="Luminosidade">Luminosidade</option>
                    <option value="Umidade">Umidade</option>
                </select>
                {errors.tipo && <p className={styles.message}>{errors.tipo.message}</p>}

                <input
                    {...register('mac_adress')}
                    className={styles.campo}
                    placeholder="mac adress"
                />
                {errors.mac_adress && <p className={styles.message}>{errors.mac_adress.message}</p>}
                <input
                    {...register('latitude')}
                    className={styles.campo}
                    placeholder="latitude"
                />
                {errors.latitude && <p className={styles.message}>{errors.latitude.message}</p>}
                <input
                    {...register('longitude')}
                    className={styles.campo}
                    placeholder="longitude"
                />
                {errors.longitude && <p className={styles.message}>{errors.longitude.message}</p>}
                <input
                    {...register('localizacao')}
                    className={styles.campo}
                    placeholder="localizacao"
                />
                {errors.localizacao && <p className={styles.message}>{errors.localizacao.message}</p>}
                <input
                    {...register('responsavel')}
                    className={styles.campo}
                    placeholder="responsavel"
                />
                {errors.responsavel && <p className={styles.message}>{errors.responsavel.message}</p>}
                <input
                    {...register('unidade_medida')}
                    className={styles.campo}
                    placeholder="unidade de medida"
                />
                {errors.unidade_medida && <p className={styles.message}>{errors.unidade_medida.message}</p>}

                <label className={styles.check}>
                    Status Operacional:
                    <input {...register('status_operacional')} type="checkbox" />
                </label>

                <textarea {...register('observacao')}
                    className={styles.campo}
                    placeholder="Observacao"
                />
                {errors.observacao && <p className={styles.message}>{errors.observacao.message}</p>}
                <div className={styles.btnConteiner}>
                    <button type="submit" className={styles.botao}>Cadastrar</button>
                    <button type="button" onClick={onClose} className={styles.botao}>Fechar</button>
                </div>
               
            </form>

            {showModal && (
                <div className={styles.successModalContainer}>
                    <p>Cadastro do sensor realizado com sucesso!!!</p>
                </div>
            )}
        </div>
    );
}
