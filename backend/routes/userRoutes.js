const express = require('express');
const router = express.Router();
const User = require('../models/user');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const authenticateToken = require('../middleware/authenticateToken');
const WeightTracking = require('../models/weightTracking');
const asignarRutinaAUsuario = require('../utils/rutinaAsignada');


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
        const { username, email, password, edad, peso, altura, frec_actividad_sem, t_disponible, objetivo, r_comida, planNutricionalId, planEjercicioId } = req.body;

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
            objetivo,
            r_comida,
            planNutricionalId,
            planEjercicioId
        });
        await newUser.save();

        const newWeightTracking = new WeightTracking({
            userId: newUser._id,
            weights: [peso],
            dates: [new Date()]
        });
        await newWeightTracking.save();
        console.log("Peso regis");

        await asignarRutinaAUsuario(newUser._id, objetivo, t_disponible);
        console.log("Rutina asignada");
        
        res.status(201).json(newUser);
    } catch (error) {
        res.status(500).json({ message: "Error al crear el usuario", error });
        console.error("Error en el proceso de signup:", error);
    }
});

// Ruta para obtener los detalles del usuario autenticado
router.get('/profile', authenticateToken, async (req, res) => {
    try {
        const user = await User.findById(req.user.userId).select('-createdAt -updatedAt -__v -_id -password'); 
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
    const userId = req.user.userId;
    const { peso, t_disponible, objetivo, planEjercicioId } = req.body;

    try {
        const user = await User.findById(userId);
        if (!user) {
            return res.status(404).json({ message: "User not found" });
        }

        // Determinar si se necesita una nueva rutina
        const needsNewRoutine = t_disponible !== user.t_disponible || objetivo !== user.objetivo;

        // Actualizar datos del usuario
        const updateData = {};
        Object.keys(req.body).forEach(key => {
            if (req.body[key] !== '' && key !== 'userId') {
                updateData[key] = req.body[key];
            }
        });
        const updatedUser = await User.findByIdAndUpdate(userId, updateData, { new: true });

        // Actualizar peso si se proporciona
        if (peso) {
            await WeightTracking.findOneAndUpdate(
                { userId: userId },
                {
                    $push: {
                        weights: peso,
                        dates: new Date()
                    }
                },
                { new: true }
            );
        }

        // Asignar nueva rutina si es necesario
        if (needsNewRoutine) {
            // Asignar la nueva rutina
            await asignarRutinaAUsuario(userId, updatedUser.objetivo, updatedUser.t_disponible);
            // No es necesario actualizar el usuario aquí, ya que `asignarRutinaAUsuario` se encarga de esto
        }

        res.json({ message: "User updated", user: updatedUser });
    } catch (error) {
        console.error("Error updating user:", error);
        res.status(500).json({ message: "Error updating user", error });
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

router.get('/usuario/:userId/rutina', async (req, res) => {
    try {
        const user = await User.findById(req.params.userId).populate('planEjercicioId');
        if (!user) {
            return res.status(404).send('Usuario no encontrado');
        }
        res.json(user.planEjercicioId);
    } catch (error) {
        res.status(500).send('Error en el servidor');
    }
});


module.exports = router; 
