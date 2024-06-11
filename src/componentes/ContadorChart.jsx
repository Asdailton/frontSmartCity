import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { Bar } from 'react-chartjs-2';
import 'chart.js/auto'; // Certifique-se de carregar o chart.js
import styles from './LuminosidadeChart.module.css'; // Importe o arquivo de estilos

export function ContadorChart() {
  const [chartData, setChartData] = useState({ datasets: [] });
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [sensorLocation, setSensorLocation] = useState(null);

  useEffect(() => {
    async function fetchData() {
      try {
        const token = localStorage.getItem('access_token');
        const sensorId = 70; 
        const sensorResponse = await axios.get(`https://adamfilho.pythonanywhere.com/api/sensores/${sensorId}/`, {
          headers: {
            'Authorization': `Bearer ${token}`
          }
        });

        const sensorData = sensorResponse.data;
        setSensorLocation(sensorData.localizacao); 
        
        const intervals = [
          { gte: "2024-04-01T00:00:00", lt: "2024-04-02T00:00:00" },
          { gte: "2024-04-02T00:00:00", lt: "2024-04-03T00:00:00" },
          { gte: "2024-04-03T00:00:00", lt: "2024-04-04T00:00:00" },
          { gte: "2024-04-04T00:00:00", lt: "2024-04-05T00:00:00" },
          { gte: "2024-04-05T00:00:00", lt: "2024-04-06T00:00:00" },
          { gte: "2024-04-06T00:00:00", lt: "2024-04-07T00:00:00" },
          { gte: "2024-04-07T00:00:00", lt: "2024-04-08T00:00:00" }
        ];

       
        const responses = await Promise.all(intervals.map(interval =>
          axios.post(
            'https://adamfilho.pythonanywhere.com/api/contador_filter/',
            {
              "sensor_id": sensorId,
              "timestamp_gte": interval.gte,
              "timestamp_lt": interval.lt
            },
            {
              headers: {
                'Authorization': `Bearer ${token}`
              }
            }
          )
        ));

       
        const counts = responses.map(response => response.data.count); 

        setChartData({
          labels: intervals.map(interval => `${interval.gte} - ${interval.lt}`), 
          datasets: [
            {
              label: 'Total de Pessoas',
              data: counts,
              backgroundColor: 'rgba(153, 102, 255, 0.6)', // roxo
              borderColor: 'rgba(153, 102, 255, 1)',
              borderWidth: 1,
              type: 'bar'
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
      <h2>Gráfico de Contagem de Pessoas</h2>
      <p>Este gráfico mostra o total de pessoas em cada intervalo de tempo.</p>
      <p>Localização do Sensor: {sensorLocation}</p>
      <div className={styles.chartContainer}>
        <Bar
          data={chartData}
          options={{ responsive: true, maintainAspectRatio: false }}
        />
      </div>
    </div>
  );
}
