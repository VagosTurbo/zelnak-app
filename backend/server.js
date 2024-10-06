require('dotenv').config();
const express = require('express');
const mongoose = require('mongoose');
const bodyParser = require('body-parser');
const User = require('./models/User');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');

// Načti environmentální proměnné
const PORT = process.env.PORT || 5000;
const MONGO_URI = process.env.MONGO_URI;

// Inicializuj aplikaci Express
const app = express();

// Middleware
app.use(bodyParser.json());

// Připojení k MongoDB
mongoose.connect(process.env.MONGO_URI)
    .then(() => console.log("Connected to MongoDB"))
    .catch((err) => console.log(err));

// Základní route
app.get('/', (req, res) => {
    res.send("<h1>API is running...</h1><b1>Register or login to test the protected route</b1>");
});

// Import a připojení route
const userRoutes = require('./routes/userRoutes');
app.use('/api/users', userRoutes);

// Spuštění serveru
app.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`);
});

// Registrace uživatele
app.post('/api/register', async (req, res) => {
    const { username, email, password } = req.body;

    // Kontrola, zda uživatel již existuje
    const existingUser = await User.findOne({ $or: [{ username }, { email }] });
    if (existingUser) {
        return res.status(400).json({ message: 'Username or email already exists' });
    }

    // Vytvoření nového uživatele
    const newUser = new User({ username, email, password });
    await newUser.save();

    res.status(201).json({ message: 'User registered successfully' });
});

// Přihlášení uživatele
app.post('/api/login', async (req, res) => {
    const { username, email, password } = req.body;

    // Najdi uživatele podle uživatelského jména nebo emailu
    const user = await User.findOne({ $or: [{ username }, { email }] });
    if (!user) {
        return res.status(401).json({ message: 'Invalid username or password' });
    }

    // Ověření hesla
    const isMatch = await bcrypt.compare(password, user.password);
    if (!isMatch) {
        return res.status(401).json({ message: 'Invalid username or password' });
    }

    // Vytvoření JWT tokenu
    const token = jwt.sign({ userId: user._id, role: user.role }, process.env.JWT_SECRET, { expiresIn: '1h' });

    res.status(200).json({ token });
});

const authMiddleware = require('./middleware/authMiddleware.js');

// Například chráněná routa
app.get('/api/protected', authMiddleware, (req, res) => {
    res.status(200).json({ message: 'This is a protected route', user: req.user });
});
