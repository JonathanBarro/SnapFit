const express = require('express');
const router = express.Router();
const User = require('../models/user');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const authenticateToken = require('../middleware/authenticateToken');

router.post('/login', async (req, res) => {
    try {
        const { email, password } = req.body;

        // Verificar si el usuario existe
        const user = await User.findOne({ email });
        if (!user) {
            return res.status(404).json({ message: "El usuario no existe" });
        }

        // Verificar la contraseña
        const isPasswordValid = await bcrypt.compare(password, user.password);
        if (!isPasswordValid) {
            return res.status(401).json({ message: "Credenciales inválidas" });
        }

        console.log("User:", user);
        // Generar un token JWT
        const token = jwt.sign(
            { userId: user._id },
            process.env.JWT_SECRET,
            { expiresIn: '1h' }
        );
        console.log("Token:", token);

        // Devolver el token y datos del usuario como respuesta
        res.status(200).json({
            token,
            user: {
                id: user._id,
                username: user.username,
                email: user.email,
                // Añade más campos según sea necesario
            }
        });
    } catch (error) {
        console.error("Login Error:", error);
        res.status(500).json({ message: "Error al iniciar sesión", error: error.message || error });
    }
});


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

// Ruta para obtener los detalles del usuario autenticado
router.get('/profile', authenticateToken, async (req, res) => {
    try {
        const user = await User.findById(req.user.userId).select('-createdAt -updatedAt -__v -_id -password'); 
        console.log(user);
        if (!user) {
            return res.status(404).json({ message: "Usuario no encontrado" });
        }
        res.json(user);
    } catch (error) {
        console.error("Error al obtener el perfil del usuario:", error);
        res.status(500).json({ message: "Error del servidor al obtener el perfil del usuario", error });
    }
});


router.post('/update', authenticateToken, async (req, res) => {
    try {
        // Filtrar campos no vacíos
        const updateData = {};
        for (const key in req.body) {
            if (req.body[key] !== '') {
                updateData[key] = req.body[key];
            }
        }

        const user = await User.findByIdAndUpdate(req.user.userId, updateData, { new: true });
        if (!user) {
            return res.status(404).json({ message: "User not found" });
        }
        res.json({ message: "User updated", user });
    } catch (error) {
        console.error("Update Error:", error);
        res.status(500).json({ message: "Error updating user" });
    }
});

router.post('/changePassword', authenticateToken, async (req, res) => {
    try {
        const { oldPassword, newPassword } = req.body;
        const user = await User.findById(req.user.userId);

        if (!user) {
            return res.status(404).json({ message: "Usuario no encontrado" });
        }

        const isPasswordValid = await bcrypt.compare(oldPassword, user.password);
        if (!isPasswordValid) {
            return res.status(401).json({ message: "Contraseña actual incorrecta" });
        }

        user.password = await bcrypt.hash(newPassword, 12);
        await user.save();
        res.status(200).json({ message: "Contraseña actualizada correctamente" });
    } catch (error) {
        res.status(500).json({ message: "Error al actualizar la contraseña", error });
    }
});

module.exports = router; 
