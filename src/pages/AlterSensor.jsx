import React, { useState, useEffect } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import { useForm } from "react-hook-form";
import { z } from 'zod';
import { zodResolver } from "@hookform/resolvers/zod";
import styles from './AlterSensor.module.css';

const schemaAlteraSensor = z.object({
    tipo: z.string().nonempty("Não pode estar vazio"),
    mac_address: z.string().nullable(),
    latitude: z.string().refine(val => !isNaN(parseFloat(val)), { message: "Latitude inválida" }),
    longitude: z.string().refine(val => !isNaN(parseFloat(val)), { message: "Longitude inválida" }),
    localizacao: z.string().min(1, "Deve ter ao menos um dígito").max(100, 'Máximo de 100 caracteres'),
    responsavel: z.string().min(1, "Deve ter ao menos um dígito").max(100, 'Máximo de 100 caracteres'),
    unidade_medida: z.string().min(1, 'Deve ter ao menos um dígito').max(20, 'Máximo de 20 caracteres'),
    status_operacional: z.boolean(),
    observacao: z.string().nullable(),
});

export function AlteraSensor({ id, onClose }) {
    const [sensorAtual, setSensorAtual] = useState(null);
    const navigate = useNavigate();
    const { register, handleSubmit, setValue, formState: { errors } } = useForm({
        resolver: zodResolver(schemaAlteraSensor)
    });

    useEffect(() => {
        const obterDadosSensor = async () => {
            try {
                const token = localStorage.getItem('access_token');
                const response = await axios.get(`https://adamfilho.pythonanywhere.com/api/sensores/?id=${id}`, {
                    headers: {
                        'Authorization': `Bearer ${token}`
                    }
                });
                const sensorData = response.data[0]; // Acessando o primeiro item da lista
                setSensorAtual(sensorData);
                setFormValues(sensorData);
            } catch (error) {
                console.log('Erro ao obter o sensor', error);
            }
        };
        obterDadosSensor();
    }, [id]);

    const setFormValues = (data) => {
        setValue('tipo', data.tipo);
        setValue('mac_address', data.mac_address);
        setValue('latitude', data.latitude);
        setValue('longitude', data.longitude);
        setValue('localizacao', data.localizacao);
        setValue('responsavel', data.responsavel);
        setValue('unidade_medida', data.unidade_medida);
        setValue('status_operacional', data.status_operacional === 'Operacional');
        setValue('observacao', data.observacao);
    };

    const onSubmit = async (data) => {
        try {
            const token = localStorage.getItem('access_token');
            await axios.put(`https://adamfilho.pythonanywhere.com/api/sensores/${id}/`, data, {
                headers: {
                    'Authorization': `Bearer ${token}`
                }
            });
            alert("Sensor alterado com sucesso!");
            onClose();
            navigate('/inicial/sensores');
        } catch (error) {
            console.error('Erro ao alterar o sensor ', error);
        }
    };

    return (
        <div className={styles.modalOverlay}>
            <form onSubmit={handleSubmit(onSubmit)} className={styles.modalContainer}>
                <label>Tipo de Sensor</label>
                <select {...register('tipo')} className={styles.inputField}>
                    <option value="">Selecione um Tipo</option>
                    <option value="Temperatura">Temperatura</option>
                    <option value="Contador">Contador</option>
                    <option value="Luminosidade">Luminosidade</option>
                    <option value="Umidade">Umidade</option>
                </select>
                {errors.tipo && <p className={styles.errorMessage}>{errors.tipo.message}</p>}

                <input
                    {...register('mac_address')}
                    className={styles.inputField}
                    placeholder="mac_address"
                />
                {errors.mac_address && <p className={styles.errorMessage}>{errors.mac_address.message}</p>}

                <input
                    {...register('latitude')}
                    className={styles.inputField}
                    placeholder="latitude"
                />
                {errors.latitude && <p className={styles.errorMessage}>{errors.latitude.message}</p>}

                <input
                    {...register('longitude')}
                    className={styles.inputField}
                    placeholder="longitude"
                />
                {errors.longitude && <p className={styles.errorMessage}>{errors.longitude.message}</p>}

                <input
                    {...register('localizacao')}
                    className={styles.inputField}
                    placeholder="localizacao"
                />
                {errors.localizacao && <p className={styles.errorMessage}>{errors.localizacao.message}</p>}

                <input
                    {...register('responsavel')}
                    className={styles.inputField}
                    placeholder="responsavel"
                />
                {errors.responsavel && <p className={styles.errorMessage}>{errors.responsavel.message}</p>}

                <input
                    {...register('unidade_medida')}
                    className={styles.inputField}
                    placeholder="unidade_medida"
                />
                {errors.unidade_medida && <p className={styles.errorMessage}>{errors.unidade_medida.message}</p>}

                <label className={styles.checkboxContainer}>
                    Status Operacional:
                    <input 
                        {...register('status_operacional')} 
                        type="checkbox" 
                        defaultChecked={sensorAtual?.status_operacional === 'Operacional'} 
                        className={styles.checkboxInput}
                    />
                </label>

                <textarea
                    {...register('observacao')}
                    className={styles.textarea}
                    placeholder="Observação"
                ></textarea>
                {errors.observacao && <p className={styles.errorMessage}>{errors.observacao.message}</p>}

                <button className={styles.button}>Alterar</button>
                <button type="button" onClick={onClose} className={styles.button}>Fechar</button>
            </form>
        </div>
    );
}
