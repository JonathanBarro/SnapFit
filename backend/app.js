const express = require("express");
const cors = require("cors");
const mongoose = require("./config/mongooseSetup");
const passport = require("passport");
const userRoutes = require("./routes/userRoutes");
const exerciseRoutes = require("./routes/exerciseRoutes");
const openAIRoutes = require("./routes/openai.js");
const helmet = require('helmet');
const limiter = require('./middleware/rateLimit.js');
const weightRoutes  = require('./routes/weightRoutes.js')
const authenticateToken = require('./middleware/authenticateToken.js')
const authRoutes = require('./routes/authRoutes.js')
const nutricionRoute = require('./routes/nutricionRoutes.js')
const dietaRoutes = require('./routes/dietaRoutes.js')
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
app.use("/auth", authRoutes);
app.use("/users", userRoutes);
app.use("/weights",authenticateToken, weightRoutes);
app.use("/exercises", authenticateToken, exerciseRoutes);
app.use("/nutricion", authenticateToken, nutricionRoute);
app.use("/diet", authenticateToken, dietaRoutes);
app.use("/openai", openAIRoutes);

app.get("/", (req, res) => {
    res.send("Hola Mundo!");
});

mongoose.connectDB().then(() => {
    app.listen(PORT, () => {
        console.log(`Server running on http://localhost:${PORT}`);
    });
});

app.get("/debug", (req, res) => {
    res.send("Debug route is working!");
});
