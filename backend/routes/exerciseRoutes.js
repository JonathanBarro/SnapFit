const express = require('express');
const router = express.Router();
const Exercise = require('../models/exercise');  // Asegúrate de tener la ruta correcta al modelo

// Ruta para crear un nuevo ejercicio asociado a un usuario
router.post('/', async (req, res) => {
    const { descripcion, rutina, usuarioId } = req.body;
    
    try {
        const newExercise = new Exercise({
            descripcion,
            rutina,
            usuarioId
        });
        await newExercise.save();
        res.status(201).json(newExercise);
    } catch (error) {
        res.status(400).json({ message: "Error al crear el ejercicio", error });
    }
});

// Puedes añadir más rutas aquí para obtener, actualizar o eliminar ejercicios

module.exports = router;
