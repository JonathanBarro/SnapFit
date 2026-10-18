const express = require('express');
const router = express.Router();
const Nutricion = require('../models/nutricion'); // Asegúrate de que el modelo se llama así
const authenticateToken = require('../middleware/authenticateToken'); 
const { json } = require('body-parser');

// Ruta para insertar un nuevo plato de nutrición
router.post('/', async (req, res) => {
    const { nombre, tipoComida, kcals, macros, restricciones, ingredientes } = req.body;
    
    try {
        const nuevoPlato = new Nutricion({
            nombre,
            tipoComida,
            kcals,
            macros,
            restricciones,
            ingredientes
        });
        await nuevoPlato.save();
        res.status(201).json(nuevoPlato);
    } catch (error) {
        res.status(400).json({ message: "Error al crear el plato de nutrición", error });
    }
});

// Ruta para obtener platos de nutrición por tipo de comida
router.get('/:tipoComida', authenticateToken, async (req, res) => {
    const tipoComida = req.params.tipoComida;
    try {
        const platos = await Nutricion.find({ tipoComida });
        if (!platos.length) {
            return res.status(404).json({ message: "No se encontraron platos para el tipo de comida especificado." });
        }
        res.json(platos);
    } catch (error) {
        console.error("Error al recuperar los platos de nutrición:", error);
        res.status(500).json({ message: "Error al recuperar los platos de nutrición", error });
    }
});

// Ruta para obtener todos los platos de nutrición (opcional)
router.get('/all', authenticateToken, async (req, res) => {
    try {
        const platos = await Nutricion.find({});
        res.json(platos);
    } catch (error) {
        console.error("Error al recuperar todos los platos de nutrición:", error);
        res.status(500).json({ message: "Error al recuperar todos los platos de nutrición", error });
    }
});

router.get('/:platoId', authenticateToken, async (req, res) => {
    console.log("Accediendo al endpoint de detalles del plato con ID:", req.params.platoId);
    try {
        const platoId = req.params.platoId;
        const plato = await Nutricion.findById(platoId);
        if (!plato) {
            return res.status(404).json({ message: "Plato no encontrado" });
        }
        res.json(plato);
    } catch (error) {
        console.error("Error al recuperar los detalles del plato:", error);
        res.status(500).json({ message: "Error al recuperar los detalles del plato", error });
    }
});

module.exports = router;
