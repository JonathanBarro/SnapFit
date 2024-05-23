const express = require('express');
const router = express.Router(); // Asegúrate de que la ruta es correcta
const authenticateToken = require('../middleware/authenticateToken'); 
const Dieta = require('../models/dieta')
const Nutricion = require('../models/nutricion')
const User = require('../models/user')

// Ruta para asignar dieta semanal a un usuario
router.post('/', async (req, res) => {
    try {
        const usuarioId = req.body.usuarioId;
        res.status(201).json(resultado);
    } catch (error) {
        res.status(500).json({ message: "Error al asignar la dieta", error: error.message });
    }
});

router.get('/daily-diet-details', authenticateToken, async (req, res) => {
    try {
        const userId = req.user.userId;
        const latestDiet = await Dieta.findOne({ usuario: userId }).sort({ createdAt: -1 });

        if (!latestDiet) {
            return res.status(404).json({ message: "No se encontró dieta para este usuario" });
        }

        const days = ['lunes', 'martes', 'miercoles', 'jueves', 'viernes', 'sabado', 'domingo'];
        const mealTypes = ['desayuno', 'comida', 'cena'];

        let weeklyDietDetails = await Promise.all(days.map(async day => {
            let dayDetails = { dia: day, comidas: [] };
            await Promise.all(mealTypes.map(async mealType => {
                const meal = latestDiet[day][mealType];
                if (meal) {
                    const platoDetails = await Nutricion.findById(meal);
                    if (platoDetails) {
                        const multiplicador = latestDiet[day][mealType + 'Multiplicador'];
                        const ingredientesAjustados = platoDetails.ingredientes.map(ing => {
                            const cantidadBase = parseFloat(ing.cantidad);
                            const unidad = ing.cantidad.replace(/[0-9.]/g, '').trim();
                            const cantidadFinal = cantidadBase * multiplicador;
                            return `${ing.nombre}: ${cantidadFinal}${unidad}`;
                        });
                        dayDetails.comidas.push({
                            tipoComida: mealType,
                            nombrePlato: platoDetails.nombre,
                            ingredientes: ingredientesAjustados
                        });
                    }
                }
            }));
            return dayDetails;
        }));

        res.json({ dieta: weeklyDietDetails });
    } catch (error) {
        console.error("Error al recuperar la dieta más reciente:", error);
        res.status(500).json({ message: "Error al recuperar la dieta", error });
    }
});




module.exports = router;
