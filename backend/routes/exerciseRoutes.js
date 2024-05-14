const express = require('express');
const router = express.Router();
const Rutina = require('../models/exercise');  // Cambio de 'Exercise' a 'Rutina'
const jwt = require('jsonwebtoken');
const authenticateToken = require('../middleware/authenticateToken'); 
const User = require('../models/user')

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
        console.log("UserID from token:", userId);

        // Busca el documento de usuario por su ID
        const user = await User.findById(userId);
        console.log("User document:", user);  // Ver qué contiene el documento de usuario

        if (!user) {
            return res.status(404).json({ message: "User not found." });
        }
        
        // Verifica si el usuario tiene un plan de ejercicios asignado
        if (!user.planEjercicioId) {
            return res.status(404).json({ message: "No routine found for this user." });
        }

        // Encuentra la rutina específica usando el planEjercicioId almacenado en el documento del usuario
        const routine = await Rutina.findById(user.planEjercicioId);
        console.log("Retrieved exercise plan:", routine);  // Imprime la rutina obtenida

        if (!routine) {
            return res.status(404).json({ message: "Routine not found." });
        }

        // Envía la rutina encontrada como respuesta
        res.json(routine);
    } catch (error) {
        console.error("Error retrieving the routine for user:", error);
        res.status(500).json({ message: "Error retrieving the routine", error });
    }
});






// Eliminar una rutina específica
router.delete('/:rutinaId', async (req, res) => {
    try {
        await Rutina.findByIdAndDelete(req.params.rutinaId);
        res.status(204).send();
    } catch (error) {
        res.status(500).json({ message: "Error al eliminar la rutina", error });
    }
});

module.exports = router;
