import React, { useState, useEffect } from 'react';
import { Line } from 'react-chartjs-2';
import axios from 'axios';
import Swal from 'sweetalert2';
import './CombinedGraph.scss';
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Legend,
} from 'chart.js';

ChartJS.register(
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Legend
);

const CombinedGraph = () => {
  const [chartData, setChartData] = useState({
    labels: [],
    datasets: [],
  });

  useEffect(() => {
    const fetchData = async () => {
      try {
        const token = localStorage.getItem('token');
        
        // Fetch weights
        const weightResponse = await axios.get('http://localhost:3030/weights/getWeights', {
          headers: { Authorization: `Bearer ${token}` }
        });

        // Fetch IMC
        const imcResponse = await axios.get('http://localhost:3030/imc/history', {
          headers: { Authorization: `Bearer ${token}` }
        });

        // Fetch Medidas Corporales
        const medidasResponse = await axios.get('http://localhost:3030/medidas/history', {
          headers: { Authorization: `Bearer ${token}` }
        });

        // Process data for the chart
        const labels = weightResponse.data.map(d => new Date(d.createdAt).toLocaleDateString());
        const weightData = weightResponse.data.map(d => d.weight);
        const imcData = imcResponse.data.map(d => d.imc);
        const medidasData = medidasResponse.data;

        const brazoData = medidasData.map(d => d.brazo);
        const pechoData = medidasData.map(d => d.pecho);
        const cinturaData = medidasData.map(d => d.cintura);
        const musloData = medidasData.map(d => d.muslo);

        setChartData({
          labels,
          datasets: [
            {
              label: 'Peso',
              data: weightData,
              fill: false,
              backgroundColor: '#7b4feb',
              borderColor: '#7b4feb',
            },
            {
              label: 'IMC',
              data: imcData,
              fill: false,
              backgroundColor: '#34eb99',
              borderColor: '#34eb83',
            },
            {
              label: 'Brazo (cm)',
              data: brazoData,
              fill: false,
              backgroundColor: '#eb4034',
              borderColor: '#eb4034',
            },
            {
              label: 'Pecho (cm)',
              data: pechoData,
              fill: false,
              backgroundColor: '#ebd834',
              borderColor: '#ebd834',
            },
            {
              label: 'Cintura (cm)',
              data: cinturaData,
              fill: false,
              backgroundColor: '#34ebc9',
              borderColor: '#34ebc9',
            },
            {
              label: 'Muslo (cm)',
              data: musloData,
              fill: false,
              backgroundColor: '#34a8eb',
              borderColor: '#34a8eb',
            },
          ],
        });
      } catch (error) {
        Swal.fire({
          icon: 'error',
          title: 'Error al obtener los datos',
          text: error.response ? error.response.data.message : 'Error en la obtención de datos',
        });
      }
    };

    fetchData();
  }, []);

  return (
    <div className="flex justify-center items-center min-h-screen">
      <div className="w-full max-w-4xl">
        <div className="chart-container">
          <h2 className="text-center text-2xl font-semibold mb-4">Progresión de Peso, IMC y Medidas Corporales</h2>
          <div className="chart-wrapper">
            <Line data={chartData} options={{ maintainAspectRatio: false }} />
          </div>
        </div>
      </div>
    </div>
  );
};

export default CombinedGraph;
