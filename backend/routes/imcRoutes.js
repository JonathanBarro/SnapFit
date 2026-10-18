const express = require('express');
const router = express.Router();
const IMCTracking = require('../models/IMCTracking');
const authenticateToken = require('../middleware/authenticateToken');
const User = require('../models/user');

// POST endpoint para añadir o actualizar el IMC
router.post('/update', authenticateToken, async (req, res) => {
    const userId = req.user.userId;
    const { peso, altura } = req.body;

    try {
        const user = await User.findById(userId);
        if (!user) {
            return res.status(404).json({ message: "User not found" });
        }

        // Calcular IMC
        const imc = peso / ((altura / 100) ** 2);

        await IMCTracking.findOneAndUpdate(
            { userId: userId },
            {
                $push: {
                    imc: imc,
                    dates: new Date()
                }
            },
            { new: true, upsert: true, setDefaultsOnInsert: true }
        );

        res.json({ message: "IMC updated successfully" });
    } catch (error) {
        console.error("Error updating IMC:", error);
        res.status(500).json({ message: "Error updating IMC", error });
    }
});

// GET endpoint para obtener el historial de IMC
router.get('/history', authenticateToken, async (req, res) => {
    const userId = req.user.userId;

    try {
        const imcTracking = await IMCTracking.findOne({ userId });

        if (!imcTracking) {
            return res.status(404).json({ message: "No IMC data found for this user" });
        }

        res.json(imcTracking.imc.map((imc, index) => ({
            imc,
            createdAt: imcTracking.dates[index]
        })));
    } catch (error) {
        console.error("Error retrieving IMC history:", error);
        res.status(500).json({ message: "Error retrieving IMC history", error });
    }
});

module.exports = router;
