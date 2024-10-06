// middleware/authMiddleware.js
const jwt = require('jsonwebtoken');

const authMiddleware = (req, res, next) => {
    const token = req.headers.authorization?.split(' ')[1]; // Získání tokenu z hlavičky

    if (!token) {
        return res.status(401).json({ message: 'Access denied. No token provided.' });
    }

    try {
        const decoded = jwt.verify(token, process.env.JWT_SECRET); // Ověření tokenu
        req.user = decoded; // Uložení uživatelských dat do req objektu
        next(); // Pokračování na další middleware nebo route
    } catch (err) {
        return res.status(400).json({ message: 'Invalid token.' });
    }
};

module.exports = authMiddleware;
