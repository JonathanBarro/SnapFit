import React from 'react';
import DietaTable from '../../components/Tablas/tablaDieta'; // Verifica la correcta importación
import './ejercicios.scss'; // Asegúrate de que el estilo sea adecuado para este componente

const Nutricion = () => {
  return (
    <div className="ejercicio-container">
      <h1 className="header-style" style={{ color: "#b699e4" }}>Tu Dieta Semanal</h1>
      <DietaTable /> 
    </div>
  );
}

export default Nutricion;
