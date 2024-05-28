import React, { useState, useEffect } from "react";
import PropTypes from 'prop-types';
import axios from "axios";
import Swal from 'sweetalert2';

const daysMapping = {
  1: ["Lunes"],
  2: ["Lunes", "Miércoles"],
  3: ["Lunes", "Miércoles", "Viernes"],
  4: ["Lunes", "Martes", "Jueves", "Viernes"],
  5: ["Lunes", "Martes", "Miércoles", "Viernes", "Sábado"],
  6: ["Lunes", "Martes", "Miércoles", "Viernes", "Sábado", "Domingo"],
  7: ["Lunes", "Martes", "Miércoles", "Jueves", "Viernes", "Sábado", "Domingo"],
};

const TablaEjercicios = ({ routine }) => {
  const days = daysMapping[routine.days.length] || [];

  // Calcular el número máximo de ejercicios en cualquier día
  const maxExercises = Math.max(...routine.days.map(day => day.exercises.length));

  return (
    <table>
      <thead>
        <tr>
          {days.map(day => <th key={day}>{day}</th>)}
        </tr>
      </thead>
      <tbody>
        {Array.from({ length: maxExercises }).map((_, rowIndex) => (
          <tr key={rowIndex}>
            {routine.days.map((day, dayIndex) => {
              const exercise = day.exercises[rowIndex];
              return (
                <td key={dayIndex}>
                  {exercise ? 
                    `${exercise.exercise} - ${exercise.sets ? `Series: ${exercise.sets}, Repeticiones: ${exercise.reps}` : `Duración: ${exercise.duration}`}` 
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

TablaEjercicios.propTypes = {
  routine: PropTypes.shape({
    days: PropTypes.arrayOf(
      PropTypes.shape({
        day: PropTypes.string.isRequired,
        exercises: PropTypes.arrayOf(
          PropTypes.shape({
            exercise: PropTypes.string.isRequired,
            sets: PropTypes.oneOfType([PropTypes.number, PropTypes.string]),
            reps: PropTypes.oneOfType([PropTypes.number, PropTypes.string]),
            duration: PropTypes.string,
          })
        ).isRequired
      })
    ).isRequired
  }).isRequired
};

export default TablaEjercicios;
