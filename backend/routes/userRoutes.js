const express = require('express');
const router = express.Router();
const User = require('../models/user');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');

// Ruta para crear un usuario
router.post('/signup', async (req, res) => {
    try {
        const { username, email, password, edad, peso, altura, frec_actividad_sem, t_disponible, r_comida, planNutricionalId, planEjercicioId } = req.body;

        // Verificar si el usuario ya existe
        const existingUser = await User.findOne({ email });
        if (existingUser) {
            return res.status(400).json({ message: "El usuario ya existe" });
        }

        // Hashear la contraseña antes de guardar el usuario
        const hashedPassword = await bcrypt.hash(password, 12);

        // Crear un nuevo usuario con todos los campos
        const newUser = new User({
            username,
            email,
            password: hashedPassword,
            edad,
            peso,
            altura,
            frec_actividad_sem,
            t_disponible,
            r_comida,
            planNutricionalId,
            planEjercicioId
        });
        await newUser.save();
        
        res.status(201).json(newUser);
    } catch (error) {
        res.status(500).json({ message: "Error al crear el usuario", error });
    }
});


// Ruta para el inicio de sesión
router.post('/login', async (req, res) => {
    try {
        const { email, password } = req.body;

        // Verificar si el usuario existe
        const user = await User.findOne({ email });
        if (!user) {
            return res.status(400).json({ message: "El usuario no existe" });
        }

        // Verificar la contraseña
        const isPasswordValid = await bcrypt.compare(password, user.password);
        if (!isPasswordValid) {
            return res.status(400).json({ message: "Credenciales inválidas" });
        }

        // Generar un token JWT
        const token = jwt.sign(
            { userId: user._id },
            'tu_secreto',
            { expiresIn: '1h' }  // O el tiempo que consideres necesario
        );

        // Devolver el token como respuesta
        res.status(200).json({ token });
    } catch (error) {
        res.status(500).json({ message: "Error al iniciar sesión", error });
    }
});


module.exports = router;
