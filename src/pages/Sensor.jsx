import React, { useState, useEffect } from "react";
import axios from "axios";
import { Outlet } from "react-router-dom";
import styles from './Sensor.module.css';
import { CadastroSensor } from "./CadastroSensor";
import { AlteraSensor } from "./AlterSensor";

export function Sensor() {
    const [sensores, setSensores] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);
    const [quantidade, setQuantidade] = useState(null);
    const [exibirCadastroSensor, setExibirCadastroSensor] = useState(false);
    const [idSensorParaAlterar, setIdSensorParaAlterar] = useState(null);
    const [showDeleteModal, setShowDeleteModal] = useState(false);
    const [sensorToDelete, setSensorToDelete] = useState(null);

    // criando constantes para armazenar dados da filtragem
    const [tipo, setTipo] = useState('');
    const [responsavel, setResponsavel] = useState('');
    const [localizacao, setLocalizacao] = useState('');
    const [status, setStatus] = useState(false);

    useEffect(() => {
        async function fetchSensores() {
            try {
                const token = localStorage.getItem('access_token');
                const response = await axios.get('https://adamfilho.pythonanywhere.com/api/sensores/', {
                    headers: {
                        'Authorization': `Bearer ${token}`
                    }
                });
                setSensores(response.data);
                setQuantidade(response.data.length);
                setLoading(false);
            } catch (error) {
                setError(error);
                setLoading(false);
            }
        }
        fetchSensores();
    }, []);

    const exibirComponenteCadastroSensor = () => {
        setExibirCadastroSensor(true);
    };

    const fecharCadastro = () => {
        setExibirCadastroSensor(false);
    };

    const abrirAlteracaoSensor = (id) => {
        setIdSensorParaAlterar(id);
    };

    const fecharAlteracao = () => {
        setIdSensorParaAlterar(null);
    };

    const confirmarDelecao = (id) => {
        setSensorToDelete(id);
        setShowDeleteModal(true);
    };

    const cancelarDelecao = () => {
        setSensorToDelete(null);
        setShowDeleteModal(false);
    };

    const deletarSensor = async () => {
        try {
            const token = localStorage.getItem('access_token');
            await axios.delete(`https://adamfilho.pythonanywhere.com/api/sensores/${sensorToDelete}/`, {
                headers: {
                    'Authorization': `Bearer ${token}`
                }
            });
            // Remover o sensor da lista localmente após a exclusão
            setSensores(sensores.filter(sensor => sensor.id !== sensorToDelete));
            setQuantidade(sensores.length - 1);
            cancelarDelecao();
        } catch (error) {
            setError(error);
            cancelarDelecao();
        }
    };

    if (loading) {
        return <div><p>Carregando...</p></div>;
    }
    if (error) {
        return <div><p>Erro ao carregar os dados: {error.message}</p></div>;
    }

    async function handleFilter(){
        try{
            const token =localStorage.getItem('access_token');
            const response = await axios.get(`https://adamfilho.pythonanywhere.com/api/sensores/?responsavel=${responsavel}&tipo=${tipo}&localizacao=${localizacao}`,{
                headers: {
                    'Authorization': `Bearer ${token}`
                }
            });
            setSensores(response.data);
            setQuantidade(response.data.length);
            setLoading(false);

        }catch(error){
            setError(true);
            setLoading(false);
        }
    }

    return (
        <div className={styles.container}>
            <h1>Tabela de <span>Sensores</span></h1>
            <h4>Quantidade de sensores disponíveis: <span className={styles.quantidade}>{quantidade}</span></h4>
            <button className={styles.cadastroButton} onClick={exibirComponenteCadastroSensor}>Cadastrar Sensor</button>
            {exibirCadastroSensor && <CadastroSensor onClose={fecharCadastro} />}
            <div className={styles.filterConteiner}>
                <h2>Filtragem de sensores</h2>
                <div className={styles.filter}>
                    <select value={tipo} onChange={(e) => setTipo(e.target.value)}>
                        <option value="">Selecione um tipo</option>
                        <option value="Temperatura">Temperatura</option>
                        <option value="Contador">Contador</option>
                        <option value="Luminosidade">Luminosidade</option>
                        <option value="Umidade">Umidade</option>
                    </select>
                    <input type="text" placeholder="Responsável" 
                    onChange={(e) => setResponsavel(e.target.value)}/>
                    <input type="text" placeholder="Localização"
                    onChange={(e)=> setLocalizacao(e.target.value)} /> 
                    <button className={styles.btnFilter} onClick={handleFilter}>Pesquisar</button>
                </div>
            </div>
            <div className={styles.cards}>
                {sensores.map(sensor => (
                    <div className={styles.card} key={sensor.id}>
                        <p><strong>Id:</strong> {sensor.id}</p>
                        <p><strong>Tipo:</strong> {sensor.tipo}</p>
                        <p><strong>Mac Adress:</strong> {sensor.mac_adress}</p>
                        <p><strong>Localização:</strong> {sensor.localizacao}</p>
                        <p><strong>Responsável:</strong> {sensor.responsavel}</p>
                        <p><strong>Longitude:</strong> {sensor.longitude}</p>
                        <p><strong>Latitude:</strong> {sensor.latitude}</p>
                        <p><strong>Unidade de Medida:</strong> {sensor.unidade_medida}</p>
                        <p><strong>Status operacional:</strong> {sensor.status_operacional ? 'Operacional' : 'Não operacional'}</p>
                        <p><strong>Observação:</strong> {sensor.observacao}</p>

                        <a onClick={() => abrirAlteracaoSensor(sensor.id)}>Alterar</a>
                        <a onClick={() => confirmarDelecao(sensor.id)}>Deletar</a>
                    </div>
                ))}
            </div>
            {idSensorParaAlterar && <AlteraSensor id={idSensorParaAlterar} onClose={fecharAlteracao} />}
            {showDeleteModal && (
                <div className={styles.modal}>
                    <div className={styles.modalContent}>
                        <h2>Confirmação</h2>
                        <p>Tem certeza que deseja deletar o sensor?</p>
                        <button onClick={deletarSensor}>Sim</button>
                        <button onClick={cancelarDelecao}>Não</button>
                    </div>
                </div>
            )}
            <Outlet />
        </div>
    );
}
