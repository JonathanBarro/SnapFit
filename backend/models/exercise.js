const mongoose = require('mongoose');

const actividadSchema = new mongoose.Schema({
    nombre: String,
    series: Number,
    repeticiones: Number,
    duracion: Number, // Duración en minutos, si aplica
    detalles: [String], // Para detalles adicionales como tipos de ejercicios en HIIT
    ejercicios: [String] // Lista de ejercicios para circuitos y similares
});

const diaSchema = new mongoose.Schema({
    dia: Number, // Número del día en la rutina (ej. Día 1, Día 2, etc.)
    actividades: [actividadSchema] // Actividades planificadas para ese día
});

const rutinaSchema = new mongoose.Schema({
    dias: Number, // Total de días en la rutina
    objetivo: String, // Descripción del objetivo (pérdida de peso, ganar masa, etc.)
    diasRutina: [diaSchema] // Arreglo de 'diaSchema' para cada día en la rutina
});

const Rutina = mongoose.model('Rutina', rutinaSchema);

module.exports = Rutina;
