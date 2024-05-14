// src/components/Ejercicios.jsx
import React, { useState, useEffect } from 'react';
import axios from 'axios';
import ExerciseTable from '../../components/Tablas/tablaEjercicos';  // Asegúrate de que la ruta al componente es correcta
import './ejercicios.scss';

const Ejercicios = () => {
  const [routine, setRoutine] = useState(null);

  useEffect(() => {
    const fetchRoutine = async () => {
      try {
        const response = await axios.get('http://localhost:3030/exercises/routine', {
          headers: {
            Authorization: `Bearer ${localStorage.getItem('token')}`
          }
        });
        setRoutine(response.data);
      } catch (error) {
        Swal.fire({
          icon: 'error',
          title: 'Error al actualizar la contraseña',
          text: error.response ? error.response.data.message : 'Error para obtener la rutina',
      });
      }
    };

    fetchRoutine();
  }, []);

  if (!routine) {
    return <div>Cargando rutinas...</div>;
  }

  return (
    <div className="ejercicio-container">
      <h1 className="header-style" style={{color: "#b699e4"}}>Rutina Semanal de Ejercicios</h1>
      <ExerciseTable />
    </div>
  );
}

export default Ejercicios;
