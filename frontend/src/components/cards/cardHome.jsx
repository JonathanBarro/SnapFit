// CardFotos.js
import React from 'react';
import './cardHome.scss'; // Asegúrate de crear y vincular este archivo CSS para estilos

const CardFotos = ({ image, title, description }) => {
  return (
    <div className="card">
      <img src={image} alt={title} className="card-img" />
      <div className="card-body">
        <h5 className="card-title">{title}</h5>
        <p className="card-text">{description}</p>
      </div>
    </div>
  );
};

export default CardFotos;
