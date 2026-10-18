const express = require('express');
const router = express.Router();
const Rutina = require('../models/exercise');  // Cambio de 'Exercise' a 'Rutina'
const jwt = require('jsonwebtoken');
const authenticateToken = require('../middleware/authenticateToken'); 
const User = require('../models/user')
const Ejercicio = require("../models/exercise")

// Ruta para crear una nueva rutina asociada a un usuario
router.post('/', async (req, res) => {
    const { dias, objetivo, diasRutina, usuarioId } = req.body;
  
    try {
      const newRutina = new Rutina({
        dias,
        objetivo,
        diasRutina
      });
      await newRutina.save();
      res.status(201).json(newRutina);
    } catch (error) {
      res.status(400).json({ message: "Error al crear la rutina", error });
    }
  });
  
  
router.get('/routine', authenticateToken, async (req, res) => {
    try {
        // Extrae el userId del objeto req.user, asumiendo que authenticateToken añade userId al objeto user.
        const userId = req.user.userId;

        // Busca la rutina específica usando el userId almacenado en el documento del usuario
        const routine = await Ejercicio.findOne({ userId });

        if (!routine) {
            return res.status(404).json({ message: "No routine found for this user." });
        }

        // Envía la rutina encontrada como respuesta
        res.json(routine);
    } catch (error) {
        console.error("Error retrieving the routine for user:", error);
        res.status(500).json({ message: "Error retrieving the routine", error });
    }
});


module.exports = router;
