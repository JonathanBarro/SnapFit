import React, { useState, useEffect } from 'react';
import { Line } from 'react-chartjs-2';
import axios from 'axios';
import Swal from 'sweetalert2';
import './salud.scss'
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

const Salud = () => {
  const [chartData, setChartData] = useState({
    labels: [],
    datasets: [],
  });

  useEffect(() => {
    const fetchData = async () => {
      try {
        const token = localStorage.getItem('token');
        const response = await axios.get('http://localhost:3030/weights/getWeights', {
          headers: {
            Authorization: `Bearer ${token}`
          }
        });
        let labels = response.data.map(d => new Date(d.createdAt).toLocaleDateString());
        let data = response.data.map(d => d.weight);

        // Si no hay datos de peso, obten el peso actual del esquema User
        if (data.length === 0) {
          const currentWeightResponse = await axios.get('http://localhost:3030/weights/getCurrentWeight', {
            headers: {
              Authorization: `Bearer ${token}`
            }
          });
          const currentWeight = currentWeightResponse.data.weight;
          const currentDate = new Date().toLocaleDateString();
          labels = [currentDate];
          data = [currentWeight];
        }

        setChartData({
          labels,
          datasets: [
            {
              label: 'Progresión del peso',
              data,
              fill: false,
              backgroundColor: '#7b4feb',
              borderColor: '#7b4feb',
            },
          ],
        });
      } catch (error) {
        Swal.fire({
          icon: 'error',
          title: 'Error al obtener los datos del peso',
          text: error.response ? error.response.data.message : 'Error en la obtención de datos del peso',
        });
      }
    };

    fetchData();
  }, []);

  return (
    <div className="flex justify-center items-center min-h-screen">
      <div className="w-full max-w-4xl">
        <div className="chart-container">
          <h2 className="text-center text-2xl font-semibold mb-4">Progresión</h2>
          <div className="chart-wrapper">
            <Line data={chartData} options={{ maintainAspectRatio: false }} />
          </div>
        </div>
      </div>
    </div>
  );
};

export default Salud;
