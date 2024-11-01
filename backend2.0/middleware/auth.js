// backend/middleware/auth.js
import jwt from 'jsonwebtoken';

const secretKey = process.env.JWT_SECRET;

export const authenticateToken = (req, res, next) => {
    const token = req.headers['authorization']?.split(' ')[1];

    if (!token) {
        return res.status(401).json({ message: 'Access denied' });
    }

    jwt.verify(token, secretKey, (err, user) => {
        if (err) {
            return res.status(403).json({ message: 'Invalid token' });
        }

        req.user = user; // Attach user information to the request object
        next(); // Pass control to the next middleware function
    });
};