const express = require('express');
const router = express.Router();
const WeightTracking = require('../models/weightTracking');
const authenticateToken = require('../middleware/authenticateToken');

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
            return res.status(404).json({ message: "Weight data not found" });
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


module.exports = router;
