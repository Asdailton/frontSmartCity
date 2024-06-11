import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { Bar } from 'react-chartjs-2';
import 'chart.js/auto'; 
import styles from './LuminosidadeChart.module.css'; 

export function LuminosidadeChart() {
  const [chartData, setChartData] = useState({ datasets: [] });
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [sensorLocation, setSensorLocation] = useState('')

  useEffect(() => {
    async function fetchData() {
      try {
        const token = localStorage.getItem('access_token');
        const sensorId = 19; 
        const sensorResponse = await axios.get(`https://adamfilho.pythonanywhere.com/api/sensores/${sensorId}/`, {
          headers: {
            'Authorization': `Bearer ${token}`
          }
        });

        const sensorData = sensorResponse.data;
        setSensorLocation(sensorData.localizacao); 
        const response = await axios.post(
          'https://adamfilho.pythonanywhere.com/api/luminosidade_filter/',
          {
            "sensor_id": 19,
            "valor_gte": 10,
            "valor_lt": 1000,
            "timestamp_gte": "2024-04-21T00:00:00",
            "timestamp_lt": "2024-04-22T00:00:00"
          },
          {
            headers: {
              'Authorization': `Bearer ${token}`
            }
          }
        );

        const data = response.data.results; 
        const timestamps = data.map(entry => new Date(entry.timestamp).toLocaleTimeString());
        const valores = data.map(entry => entry.valor);

        setChartData({
          labels: timestamps,
          datasets: [
            {
              label: 'Luminosidade',
              data: valores,
              backgroundColor: valores.map(value => {
                if (value < 200) return 'rgba(255, 99, 132, 0.6)'; // vermelho
                if (value < 600) return 'rgba(54, 162, 235, 0.6)'; // azul
                return 'rgba(75, 192, 192, 0.6)'; // verde
              }),
              borderColor: 'rgba(75, 192, 192, 1)',
              borderWidth: 1,
              hoverBackgroundColor: 'rgba(75, 192, 192, 0.8)',
              hoverBorderColor: 'rgba(75, 192, 192, 1)',
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
      <h2 className={styles.title}>Gráfico de Luminosidade</h2>
      <h2 className={styles.title}>Localização: {sensorLocation}</h2>
      <p className={styles.subtitle}>Este gráfico mostra a luminosidade em um determinado período.</p>
      <div className={styles.chartContainer}>
        <Bar
          data={chartData}
          options={{ responsive: true, maintainAspectRatio: false }}
        />
      </div>
    </div>
  );
}
