// En un archivo de rutas, por ejemplo, authRoutes.js

const express = require('express');
const jwt = require('jsonwebtoken');
const router = express.Router();

// Suponiendo que tienes una clave secreta para firmar tus tokens
const SECRET_KEY = process.env.JWT_SECRET;

router.post('/verifyToken', (req, res) => {
  const token = req.headers.authorization.split(' ')[1]; // Asumiendo que el token viene en el header Authorization como "Bearer <token>"

  if (!token) {
    return res.status(401).json({ message: 'No token provided' });
  }

  jwt.verify(token, SECRET_KEY, (err, decoded) => {
    if (err) {
      return res.status(401).json({ message: 'Invalid token', error: err });
    }

    res.json({ message: 'Token is valid', userId: decoded.userId });
  });
});

module.exports = router;
