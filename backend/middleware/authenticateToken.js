const jwt = require('jsonwebtoken');

const authenticateToken = (req, res, next) => {
  const authHeader = req.headers['authorization'];
  const token = authHeader && authHeader.split(' ')[1];

  console.log('Authorization Header:', authHeader);
  if (!token) {
      console.log('Token not provided');
      return res.sendStatus(401); // Unauthorized
  }

  jwt.verify(token, process.env.JWT_SECRET, (err, decoded) => {
      if (err) {
          console.log('Failed to authenticate token', err);
          return res.status(403).json({ error: "Forbidden", details: err.message }); // Forbidden - invalid token
      }
      req.user = decoded; // Assuming `decoded` contains user data like { userId: userId }
      next();
  });
};


module.exports = authenticateToken;
