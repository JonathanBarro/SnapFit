import React, { useState, useEffect } from 'react';
import { Line } from 'react-chartjs-2';
import axios from 'axios';
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

const Salud
 = () => {
  const [chartData, setChartData] = useState({
    labels: [],
    datasets: [],
  });

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axios.get('http://localhost:3030/weights/getWeights', {
          headers: {
            Authorization: `Bearer ${localStorage.getItem('token')}`
          }
        });
        const labels = response.data.map(d => new Date(d.createdAt).toLocaleDateString());
        const data = response.data.map(d => d.weight);

        setChartData({
          labels,
          datasets: [
            {
              label: 'Progresión del peso',
              data,
              fill: false,
              backgroundColor: '#b699e4',
              borderColor: '#b699e4',
            },
          ],
        });
      } catch (error) {
        Swal.fire({
          icon: 'error',
          title: 'Error al actualizar la contraseña',
          text: error.response ? error.response.data.message : 'Error en la obtención de datos del peso',
      });
      }
    };

    fetchData();
  }, []);

  return (
<div className="flex justify-center items-center min-h-screen">
      <div className="w-full max-w-4xl">
        <h2 className="text-center text-2xl font-semibold text-purple-400 mb-4">Progresión</h2>
        <div className="h-96">
          <Line data={chartData} options={{ maintainAspectRatio: false }} />
        </div>
      </div>
    </div>
  );
};

export default Salud;
