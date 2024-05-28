import React from 'react';
import TablaDieta from '../../components/Tablas/tablaDieta'; // Verifica la correcta importación
import './nutricion.scss'; // Asegúrate de que el estilo sea adecuado para este componente

const Nutricion = () => {
  return (
    <div className="nutricion-container">
      <h1 className="header-style" style={{ color: "#b699e4" }}>Tu Dieta Semanal</h1>
      <TablaDieta />
    </div>
  );
}

export default Nutricion;
