const jwt = require('jsonwebtoken');

const authenticateToken = (req, res, next) => {
    const authHeader = req.headers['authorization'];
    console.log("Authorization Header Received:", authHeader);  // Log del encabezado recibido

    const token = authHeader && authHeader.split(' ')[1];
    console.log("Token Extracted:", token);  // Log del token extraído

    if (!token) {
        return res.status(401).send("Token not provided");
    }

    jwt.verify(token, process.env.JWT_SECRET, (err, user) => {
        if (err) {
            console.log("Token Verification Error:", err.message);  // Log del error de verificación
            return res.status(403).send("Invalid token");
        }
        console.log("Token Verified, User ID:", user.userId);  // Log de la información del usuario decodificada
        req.user = user;
        next();
    });
};




module.exports = authenticateToken;
