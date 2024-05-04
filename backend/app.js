const express = require("express");
const cors = require("cors");
const mongoose = require("./config/mongooseSetup");
const passport = require("passport");
const userRoutes = require("./routes/userRoutes");
const exerciseRoutes = require("./routes/exerciseRoutes");
const { callOpenAI } = require("./routes/openai.js"); // Importa la función callOpenAI

const app = express();
const PORT = process.env.PORT || 3030;

app.use(express.json());
app.use(cors());
app.use(passport.initialize());
require('dotenv').config();

// Importar rutas
app.use("/users", userRoutes);
app.use("/exercises", exerciseRoutes);

// Ruta GET para llamar a la función callOpenAI
app.get("/openai", async (req, res) => {
    try {
        const response = await callOpenAI();
        res.json(response);
    } catch (error) {
        res.status(500).json({ error: "Error al llamar a la API de OpenAI" });
    }
});

// Ruta POST para llamar a la función callOpenAI
app.post("/openai", async (req, res) => {
  try {
      const response = await callOpenAI();
      res.json(response.data); // Asegúrate de enviar la parte correcta de la respuesta
  } catch (error) {
      console.error("API Call Error:", error.message);
      res.status(500).json({ error: error.message }); // Envía el mensaje de error más informativo
  }
});

app.get("/", (req, res) => {
    res.send("Hola Mundo!");
});

mongoose.connectDB().then(() => {
    app.listen(PORT, () => {
        console.log(`Server running on http://localhost:${PORT}`);
    });
});
