const express = require('express');
const router = express.Router(); // Asegúrate de que la ruta es correcta
const authenticateToken = require('../middleware/authenticateToken'); 
const Dieta = require('../models/dieta')
const Nutricion = require('../models/nutricion')
const User = require('../models/user')

router.post('/', async (req, res) => {
    try {
      const usuarioId = req.body.usuarioId;
      // Asume que se ha hecho alguna lógica para asignar una dieta
      res.status(201).json({ message: "Dieta asignada con éxito" });
    } catch (error) {
      res.status(500).json({ message: "Error al asignar la dieta", error: error.message });
    }
  });
  
router.get('/daily-diet-details', authenticateToken, async (req, res) => {
  try {
    const userId = req.user.userId;
    const latestDiet = await Dieta.findOne({ userId }).sort({ createdAt: -1 });

    if (!latestDiet) {
      return res.status(404).json({ message: "No se encontró dieta para este usuario" });
    }

    const days = ['lunes', 'martes', 'miércoles', 'jueves', 'viernes', 'sábado', 'domingo'];
    const mealTypes = ['desayuno', 'almuerzo', 'cena'];

    let weeklyDietDetails = days.map(day => {
      let dayDetails = { dia: day, comidas: [] };
      mealTypes.forEach(mealType => {
        const meal = latestDiet.data.dieta.days.find(d => d.day === day)?.meals.find(m => m.meal === mealType);
        if (meal) {
          dayDetails.comidas.push({
            tipoComida: mealType,
            items: meal.items
          });
        } else {
          dayDetails.comidas.push({
            tipoComida: mealType,
            items: ["No meal"]
          });
        }
      });
      return dayDetails;
    });

    res.json({ dieta: weeklyDietDetails });
  } catch (error) {
    console.error("Error al recuperar la dieta más reciente:", error);
    res.status(500).json({ message: "Error al recuperar la dieta", error });
  }
});

  




module.exports = router;
