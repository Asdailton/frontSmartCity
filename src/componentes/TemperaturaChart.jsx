import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { Line } from 'react-chartjs-2';
import 'chart.js/auto'; // Certifique-se de carregar o chart.js
import { Outlet } from 'react-router-dom';
import styles from './TemperaturaChart.module.css'; // Importe o arquivo de estilos

export function TemperaturaChart() {
  const [chartData, setChartData] = useState({ datasets: [] });
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [sensorLocation, setSensorLocation] = useState('')

  useEffect(() => {
    async function fetchData() {
      try {
        const token = localStorage.getItem('access_token');
        const sensorId = 9; 
        const sensorResponse = await axios.get(`https://adamfilho.pythonanywhere.com/api/sensores/${sensorId}/`, {
          headers: {
            'Authorization': `Bearer ${token}`
          }
        });

        const sensorData = sensorResponse.data;
        setSensorLocation(sensorData.localizacao); 
        const response = await axios.post(
          'https://adamfilho.pythonanywhere.com/api/temperatura_filter/',
          {
            sensor_id: 9,
            valor_gte: 10,
            valor_lt: 19,
            timestamp_gte: "2024-04-01T00:00:00",
            timestamp_lt: "2024-04-02T00:00:00"
          },
          {
            headers: {
              'Authorization': `Bearer ${token}`
            }
          }
        );
  
        const data = response.data.results; // Obter apenas os resultados
        const timestamps = data.map(entry => new Date(entry.timestamp).toLocaleTimeString());
        const valores = data.map(entry => entry.valor);
        
        setChartData({
          labels: timestamps,
          datasets: [
            {
              label: 'Temperatura',
              data: valores,
              fill: false,
              borderColor: 'rgb(75, 192, 192)',
              tension: 0.1
            }
          ]
        });
        setLoading(false);
      } catch (err) {
        setError(err);
        setLoading(false);
      }
    }
  
    fetchData();
  }, []);
  

  if (loading) {
    return <div>Loading...</div>;
  }

  if (error) {
    return <div>Error: {error.message}</div>;
  }

  return (
    <div className={styles.card}>
      <h2>Gráfico de Temperatura</h2>
      <h2>Localização: {sensorLocation}</h2>
      <p>Este gráfico mostra a temperatura em um determinado período.</p>
      <div className={styles.chartContainer}>
      <Line
          data={chartData}
          options={{ responsive: true, maintainAspectRatio: false }}
        />
      </div>
    </div>
  );
}


