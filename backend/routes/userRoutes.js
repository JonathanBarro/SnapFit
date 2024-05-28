const express = require('express');
const router = express.Router();
const User = require('../models/user');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const authenticateToken = require('../middleware/authenticateToken');
const WeightTracking = require('../models/weightTracking');
const asignarRutinaAUsuario = require('../utils/rutinaAsignada');
const { calculadora } = require('../utils/calculadora');
const axios = require('axios');
const Dieta = require('../models/dieta');
const Ejercicio = require("../models/exercise");

async function callOpenAI(userInput) {
    try {
      const response = await axios.post(
        'https://api.openai.com/v1/chat/completions',
        {
          model: 'gpt-4',
          messages: [{ role: 'user', content: userInput }],
        },
        {
          headers: {
            'Authorization': `Bearer ${process.env.OPENAI_API_KEY}`,
            'Content-Type': 'application/json'
          }
        }
      );
  
      const content = response.data.choices[0].message.content.trim();
      console.log("Raw Response Content:", content);
      // Intentar parsear la respuesta como JSON
      let result;
      try {
        result = JSON.parse(content);
      } catch (e) {
        console.error(`Error parsing response as JSON: ${content}`, e);
        throw new Error(`La respuesta no está en formato JSON: ${content}`);
      }
  
      return result;
    } catch (error) {
      console.error('Error calling OpenAI:', error.message);
      throw new Error(`OpenAI API call failed: ${error.message}`);
    }
  }

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


async function generateDiet(userData) {
    const prompt = `
    Crear una dieta semanal indicando cantidad de cada ingrediente para un usuario con las siguientes características:
    - Nombre de usuario: ${userData.username}
    - Edad: ${userData.edad}
    - Peso: ${userData.peso} kg
    - Altura: ${userData.altura} cm
    - Frecuencia de actividad semanal: ${userData.frec_actividad_sem} veces por semana
    - Tiempo disponible para ejercicio: ${userData.t_disponible} horas a la semana
    - Objetivo: ${userData.objetivo}
    - Restricciones alimentarias: ${userData.r_comida.join(', ')}
    - Género: ${userData.genero}
    - Calorías diarias: ${userData.kcals}
    - Proteínas diarias: ${userData.proteinas} g
    - Carbohidratos diarios: ${userData.carbs} g
    - Grasas diarias: ${userData.grasas} g
  
    Devuelve solo la respuesta en el siguiente formato JSON sin ninguna explicación ni palabra adicional:
    {
      "dieta": {
        "days": [
          {
            "day": "lunes",
            "meals": [
              {
                "meal": "desayuno",
                "items": ["item1", "item2"]
              },
              {
                "meal": "almuerzo",
                "items": ["item1", "item2"]
              },
              {
                "meal": "cena",
                "items": ["item1", "item2"]
              }
            ]
          },
          ...
        ]
      }
    }
    `;
  
    const response = await callOpenAI(prompt);
    return response;
  }
  
  async function generateExercise(userData) {
    const prompt = `
    Crear un plan de ejercicios semanal para un usuario con las siguientes características:
    - Nombre de usuario: ${userData.username}
    - Edad: ${userData.edad}
    - Peso: ${userData.peso} kg
    - Altura: ${userData.altura} cm
    - Frecuencia de actividad semanal: ${userData.frec_actividad_sem} veces por semana
    - Tiempo disponible para ejercicio: ${userData.t_disponible} días a la semana (hacer rutinad de para estos días)
    - Objetivo: ${userData.objetivo}
    - Restricciones alimentarias: ${userData.r_comida.join(', ')}
    - Género: ${userData.genero}
    - Calorías diarias: ${userData.kcals}
    - Proteínas diarias: ${userData.proteinas} g
    - Carbohidratos diarios: ${userData.carbs} g
    - Grasas diarias: ${userData.grasas} g
  
    Devuelve solo la respuesta en el siguiente formato JSON sin ninguna explicación ni palabra adicional:
    {
      "ejercicios": {
        "days": [
          {
            "day": "lunes",
            "exercises": [
              {
                "exercise": "ejercicio1",
                "sets": 3,
                "reps": 12
              },
              {
                "exercise": "ejercicio2",
                "sets": 3,
                "reps": 12
              }
            ]
          },
          ...
        ]
      }
    }
    `;
  

    const response = await callOpenAI(prompt);
    return response;
  }
  
  router.post('/signup', async (req, res) => {
    const { username, email, password, edad, peso, altura, frec_actividad_sem, t_disponible, objetivo, r_comida, genero } = req.body;
  
    try {
      // Calcular calorías y macronutrientes
      const { kcals, proteinas, grasas, carbohidratos } = calculadora(altura, peso, edad, objetivo, genero, frec_actividad_sem);
  
      // Encriptar la contraseña
      const hashedPassword = await bcrypt.hash(password, 10);
  
      // Crear el nuevo usuario
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
        genero,
        kcals,
        proteinas,
        carbs: carbohidratos,
        grasas
      });
  
      const savedUser = await newUser.save();
  
      // Generar dieta y tabla de ejercicios
      const [dieta, ejercicios] = await Promise.all([
        generateDiet({
          username,
          edad,
          peso,
          altura,
          frec_actividad_sem,
          t_disponible,
          objetivo,
          r_comida,
          genero,
          kcals,
          proteinas,
          carbs: carbohidratos,
          grasas
        }),
        generateExercise({
          username,
          edad,
          peso,
          altura,
          frec_actividad_sem,
          t_disponible,
          objetivo,
          r_comida,
          genero,
          kcals,
          proteinas,
          carbs: carbohidratos,
          grasas
        })
      ]);
  
      // Guardar la dieta y la tabla de ejercicios
      const newDieta = new Dieta({ userId: savedUser._id, data: dieta });
      const newEjercicio = new Ejercicio({ userId: savedUser._id, data: ejercicios });
  
      await newDieta.save();
      await newEjercicio.save();
  
      // Responder al cliente
      res.status(201).json({ message: 'Usuario registrado y datos generados con éxito', user: savedUser });
  
    } catch (error) {
      console.error('Error en el registro:', error);
      res.status(500).json({ error: 'Error en el registro del usuario' });
    }
  });

// Ruta para obtener los detalles del usuario autenticado
router.get('/profile', authenticateToken, async (req, res) => {
    try {
        const user = await User.findById(req.user.userId).select('-createdAt -updatedAt -__v -_id -password -planEjercicioId -kcals -proteinas -carbs -grasas'); 
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
    const { peso, t_disponible, objetivo, planEjercicioId, altura, edad, genero, frec_actividad_sem } = req.body;


    try {
        const user = await User.findById(userId);
        if (!user) {
            return res.status(404).json({ message: "User not found" });
        }

        // Determinar si se necesita una nueva rutina
        const needsNewRoutine = t_disponible !== user.t_disponible || objetivo !== user.objetivo;

        const resultadosNutricionales = calculadora(altura, peso, edad, objetivo, genero, frec_actividad_sem);

        // Actualizar datos del usuario
        const updateData = {
            // otros datos
            kcals: resultadosNutricionales.kcals,
            proteinas: resultadosNutricionales.proteinas,
            carbs: resultadosNutricionales.carbohidratos,
            grasas: resultadosNutricionales.grasas,
        };
    
        // Actualizar usuario con nuevos valores
    
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
