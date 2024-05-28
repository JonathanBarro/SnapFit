const express = require('express');
const router = express.Router();
const WeightTracking = require('../models/weightTracking');
const authenticateToken = require('../middleware/authenticateToken');
const User = require ("../models/user")

// POST endpoint para añadir o actualizar el peso
router.post('/updateWeight', authenticateToken, async (req, res) => {
    const peso  = req.body.peso;
    const userId = req.user.userId;  // Asumiendo que obtienes el userId del token JWT
    
    try {
        let weightEntry = await WeightTracking.findOneAndUpdate(
            { userId },
            { 
                $push: {
                    weights: peso,
                    dates: new Date()  // Añade la fecha actual al array de fechas
                }
            },
            { new: true, upsert: true, setDefaultsOnInsert: true }
        );
        res.status(200).json({ success: true, data: weightEntry });
    } catch (error) {
        console.error("Error updating peso: ", error.message);
        res.status(500).json({ success: false, message: error.message });
    }
});

router.get('/getWeights', authenticateToken, async (req, res) => {
    try {
        const userId = req.user.userId;  // Asumiendo que el userId está en el token JWT
        const weightTracking = await WeightTracking.findOne({ userId });

        if (!weightTracking) {
            // Si no se encuentran datos de WeightTracking, obtener el peso actual del esquema User
            const user = await User.findById(userId).select('peso');
            if (user && user.peso) {
                return res.json([{ weight: user.peso, createdAt: new Date() }]); // Devuelve el peso actual con la fecha actual
            } else {
                return res.status(404).json({ message: "No se encontró peso para este usuario" });
            }
        }

        res.json(weightTracking.weights.map((weight, index) => ({
            weight,
            createdAt: weightTracking.dates[index]
        })));
    } catch (error) {
        console.error("Error retrieving weights:", error);
        res.status(500).json({ message: "Error retrieving weight data", error });
    }
});

router.get('/getCurrentWeight', authenticateToken, async (req, res) => {
    try {
        const userId = req.user.userId;
        const user = await User.findById(userId).select('peso');
        if (user && user.peso) {
            res.json({ weight: user.peso });
        } else {
            res.status(404).json({ message: "No se encontró peso para este usuario" });
        }
    } catch (error) {
        res.status(500).json({ message: "Error al obtener el peso actual", error });
    }
});


module.exports = router;
