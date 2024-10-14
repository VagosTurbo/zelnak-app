require('dotenv').config();
const express = require('express');
const bodyParser = require('body-parser');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const mysql = require('mysql2/promise');
const roles = require('./roles');

const PORT = process.env.PORT || 5000;

//connect to database
const db = mysql.createPool({
    host: process.env.DB_HOST,
    user: process.env.DB_USER,
    password: process.env.DB_PASSWORD,
    database: process.env.DB_NAME
});
db.getConnection()
    .then(() => console.log("Connected to MySQL"))
    .catch((err) => console.log(err));

// Inicializuj aplikaci Express
const app = express();

// Middleware
app.use(bodyParser.json());

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

//register user
app.post('/api/register', async (req, res) => {
    const { username, email, password, role } = req.body;

    //find if user exists
    const user = await db.query('SELECT * FROM users WHERE username = ? OR email = ?', [username, email]);
    if (user[0].length > 0) {
        return res.status(400).json({ message: 'User already exists' });
    }

    if(role < 0 || role > 4){
        return res.status(400).json({ message: 'Invalid role' });
    }

    //add user to database
    await db.query('INSERT INTO users (username, email, password, role) VALUES (?, ?, ?, ?)', [username, email, password, role]);
    res.status(201).json({ message: 'User registered successfully' });
});

//login user
app.post('/api/login', async (req, res) => {
    try {
        const { username, password } = req.body;

        const [user] = await db.query('SELECT * FROM users WHERE username = ?', [username]);
        if (user.length === 0) {
            return res.status(401).json({ message: 'Invalid username or password' });
        }

        const isMatch = user[0].password === password;
        if (!isMatch) {
            return res.status(401).json({ message: 'Invalid username or password' });
        }

        console.log("login succesful");
        const token = jwt.sign({ userId: user[0].id, role: user[0].role }, process.env.JWT_SECRET, { expiresIn: '1h' });
        res.status(200).json({ message: 'Login successful', token });
    } catch (err) {
        console.error('Error during login:', err);
        res.status(500).json({ message: 'Internal server error' });
    }
});

const authMiddleware = require('./middleware/authMiddleware.js');

// Například chráněná routa
app.get('/api/protected', authMiddleware, (req, res) => {
    res.status(200).json({ message: 'This is a protected route', user: req.user });
});

// displays all users
app.get('/api/users', async (req, res) => {
    const user = await db.query('SELECT * FROM users');
    res.status(200).json(user[0]);
});


// displays user profile
app.get('/api/users/:id', async (req, res) => {
    const { id } = req.params;
    const user = await db.query('SELECT * FROM users WHERE id = ?', [id]);
    if (user[0].length === 0) {
        return res.status(404).json({ message: 'User not found' });
    }
    res.status(200).json(user[0][0]);
});

//displays products
app.get('/api/products', async (req, res) => {
    const products = await db.query('SELECT * FROM products');
    res.status(200).json(products[0]);
});

//displays product by id
app.get('/api/products/:id', async (req, res) => {
    const { id } = req.params;
    const product = await db.query('SELECT * FROM products WHERE id = ?', [id]);
    if (product[0].length === 0) {
        return res.status(404).json({ message: 'Product not found' });
    }
    res.status(200).json(product[0][0]);
});

//display categories
app.get('/api/categories', async (req, res) => {
    const categories = await db.query('SELECT * FROM categories');
    res.status(200).json(categories[0]);
});


