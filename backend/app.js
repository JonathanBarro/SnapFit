const express = require("express");
const cors = require("cors");
const mongoose = require("./config/mongooseSetup");
const passport = require("passport");
const userRoutes = require("./routes/userRoutes");
const exerciseRoutes = require("./routes/exerciseRoutes");
const { callOpenAI } = require("./routes/openai.js");
const helmet = require('helmet');
const limiter = require('./middleware/rateLimit.js');
const weightRoutes  = require('./routes/weightRoutes.js')
require('dotenv').config();


const app = express();
const PORT = process.env.PORT || 3030;

app.use(limiter);
app.use(express.json());
app.use(cors({
    origin: 'http://localhost:5173',  // Confirm this matches your frontend's URL
    credentials: true,
    methods: ['GET', 'POST', 'PUT', 'DELETE'],
    allowedHeaders: ['Content-Type', 'Authorization']
}));
app.use(passport.initialize());
app.use(helmet());

// Importar rutas
app.use("/users", userRoutes);
app.use("/weights", weightRoutes);
app.use("/exercises", exerciseRoutes);

app.get("/openai", async (req, res) => {
    try {
        const response = await callOpenAI();
        res.json(response);
    } catch (error) {
        res.status(500).json({ error: "Error al llamar a la API de OpenAI" });
    }
});

app.post("/openai", async (req, res) => {
  try {
      const response = await callOpenAI();
      res.json(response.data);
  } catch (error) {
      console.error("API Call Error:", error.message);
      res.status(500).json({ error: error.message });
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
