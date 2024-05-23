import React, { useState, useEffect } from "react";
import axios from "axios";

const TablaDieta = () => {
  const [dieta, setDieta] = useState(null);

  useEffect(() => {
    const fetchDieta = async () => {
      const token = localStorage.getItem('token');
      try {
        const response = await axios.get('http://localhost:3030/diet/daily-diet-details', {
          headers: {
            'Authorization': `Bearer ${token}`,
            'Content-Type': 'application/json'
          },
        });
        setDieta(response.data.dieta);
      } catch (error) {
        console.error('Error fetching diet details:', error);
      }
    };

    fetchDieta();
  }, []);

  if (!dieta) {
    return <div>Loading...</div>;
  }

  return (
    <table>
      <thead>
        <tr>
          <th>Día/Comida</th>
          <th>Desayuno</th>
          <th>Comida</th>
          <th>Cena</th>
        </tr>
      </thead>
      <tbody>
        {dieta.map(dayInfo => (
          <tr key={dayInfo.dia}>
            <td>{dayInfo.dia.charAt(0).toUpperCase() + dayInfo.dia.slice(1)}</td>
            {["desayuno", "comida", "cena"].map(mealType => {
              const meal = dayInfo.comidas.find(m => m.tipoComida === mealType);
              return (
                <td key={mealType}>
                  {meal ? `${meal.nombrePlato} - Ingredientes: ${meal.ingredientes.join(", ")}` : "No meal"}
                </td>
              );
            })}
          </tr>
        ))}
      </tbody>
    </table>
  );
};

export default TablaDieta;
