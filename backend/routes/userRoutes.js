// routes/userRoutes.js
const express = require('express');
const authMiddleware = require('../middleware/authMiddleware'); 
const { registerUser, loginUser } = require('../controllers/userController');

const router = express.Router();

// Registrace a přihlášení uživatele
router.post('/register', registerUser);
router.post('/login', loginUser);

// Přidání chráněné routy (např. pro přístup k profilu)
router.get('/profile', authMiddleware, (req, res) => {
    res.send(req.user); // Zde můžeš vrátit informace o uživateli
});

module.exports = router;
