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
              label: 'Weight over Time',
              data,
              fill: false,
              backgroundColor: 'rgb(75, 192, 192)',
              borderColor: 'rgba(75, 192, 192, 0.2)',
            },
          ],
        });
      } catch (error) {
        console.error('Error fetching weight data:', error);
      }
    };

    fetchData();
  }, []);

  return (
<div className="flex justify-center items-center min-h-screen">
      <div className="w-full max-w-4xl">
        <h2 className="text-center text-2xl font-semibold text-gray-800 mb-4">Weight Tracking</h2>
        <div className="h-96">
          <Line data={chartData} options={{ maintainAspectRatio: false }} />
        </div>
      </div>
    </div>
  );
};

export default Salud;
