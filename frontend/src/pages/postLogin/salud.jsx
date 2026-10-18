import React, { useState, useEffect } from 'react';
import { Line } from 'react-chartjs-2';
import axios from 'axios';
import Swal from 'sweetalert2';
import './salud.scss'
import CombinedGraph from './CombinedGraph';
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
  return (
    <div className="flex flex-col justify-center items-center min-h-screen">
      <div className="w-full max-w-4xl">
        <CombinedGraph />
      </div>
    </div>
  );
};

export default Salud;
