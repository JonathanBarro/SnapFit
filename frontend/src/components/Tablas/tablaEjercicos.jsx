import React, { useState, useEffect } from "react";
import axios from "axios";

const daysMapping = {
  2: ["Lunes", "Miércoles"],
  3: ["Lunes", "Miércoles", "Viernes"],
  4: ["Lunes", "Martes", "Jueves", "Viernes"],
  5: ["Lunes", "Martes", "Miércoles", "Viernes", "Sábado"],
  6: ["Lunes", "Martes", "Miércoles", "Viernes", "Sábado", "Domingo"],
  7: ["Lunes", "Martes", "Miércoles", "Jueves", "Viernes", "Sábado", "Domingo"],
};

const TablaEjercicios = () => {
  const [routine, setRoutine] = useState(null);

  useEffect(() => {
    const fetchRoutine = async () => {
      const token = localStorage.getItem('token');
      try {
        const response = await axios.get(`http://localhost:3030/exercises/routine`, {
          headers: {
            'Authorization': `Bearer ${token}`,
            'Content-Type': 'application/json'
          },
        });
        setRoutine(response.data);
      } catch (error) {
        console.error('Error fetching routine:', error);
      }
    };

    fetchRoutine();
  }, []);

  if (!routine) {
    return <div>Loading...</div>;
  }
  
  if (!routine.diasRutina) {
    return <div>No routine data available.</div>;
  }

  const days = daysMapping[routine.dias] || [];

  // Calculate the rows needed by finding the day with the maximum number of activities
  const maxActivities = Math.max(...routine.diasRutina.map(day => day.actividades.length));

  return (
    <table>
      <thead>
        <tr>
          {days.map(day => <th key={day}>{day}</th>)}
        </tr>
      </thead>
      <tbody>
        {Array.from({ length: maxActivities }).map((_, rowIndex) => (
          <tr key={rowIndex}>
            {routine.diasRutina.map((day, dayIndex) => {
              const activity = day.actividades[rowIndex];
              return (
                <td key={dayIndex}>
                  {activity ? 
                    `${activity.nombre} - ${activity.series ? `Series: ${activity.series}, Repeticiones: ${activity.repeticiones}` : `Duración: ${activity.duracion} minutos`}` 
                    : ' '
                  }
                </td>
              );
            })}
          </tr>
        ))}
      </tbody>
    </table>
  );
};

export default TablaEjercicios;
