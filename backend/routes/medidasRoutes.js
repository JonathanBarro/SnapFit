const express = require('express');
const router = express.Router();
const MedidasTracking = require('../models/medidasTracking');
const authenticateToken = require('../middleware/authenticateToken');
const User = require('../models/user');

// POST endpoint para añadir o actualizar las medidas corporales
router.post('/update', authenticateToken, async (req, res) => {
    const userId = req.user.userId;
    const { brazo, pecho, cintura, muslo } = req.body;

    try {
        const user = await User.findById(userId);
        if (!user) {
            return res.status(404).json({ message: "User not found" });
        }

        await MedidasTracking.findOneAndUpdate(
            { userId: userId },
            {
                $push: {
                    medidas: {
                        brazo: brazo || user.medidasCorporales.brazo,
                        pecho: pecho || user.medidasCorporales.pecho,
                        cintura: cintura || user.medidasCorporales.cintura,
                        muslo: muslo || user.medidasCorporales.muslo,
                        date: new Date()
                    }
                }
            },
            { new: true, upsert: true, setDefaultsOnInsert: true }
        );

        res.json({ message: "Medidas updated successfully" });
    } catch (error) {
        console.error("Error updating medidas:", error);
        res.status(500).json({ message: "Error updating medidas", error });
    }
});

// GET endpoint para obtener el historial de medidas corporales
router.get('/history', authenticateToken, async (req, res) => {
    const userId = req.user.userId;

    try {
        const medidasTracking = await MedidasTracking.findOne({ userId });

        if (!medidasTracking) {
            return res.status(404).json({ message: "No medidas data found for this user" });
        }

        res.json(medidasTracking.medidas.map((medida) => ({
            brazo: medida.brazo,
            pecho: medida.pecho,
            cintura: medida.cintura,
            muslo: medida.muslo,
            createdAt: medida.date
        })));
    } catch (error) {
        console.error("Error retrieving medidas history:", error);
        res.status(500).json({ message: "Error retrieving medidas history", error });
    }
});

module.exports = router;
