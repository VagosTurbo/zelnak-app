// backend/models/user.js
import db from '../config/database.js';

export const dbGetAllUsers = async () => {
    return db.query('SELECT * FROM users');
};

export const dbGetUserById = async (id) => {
    return db.query('SELECT * FROM users WHERE id = ?', [id]);
};

export const dbCreateUser = async (newUser) => {
    return db.query('INSERT INTO users SET ?', newUser);
};

export const dbUpdateUser = async (id, updatedUser) => {
    return db.query('UPDATE users SET ? WHERE id = ?', [updatedUser, id]);
};

export const dbDeleteUser = async (id) => {
    return db.query('DELETE FROM users WHERE id = ?', [id]);
};

export const dbVerifyUserCredentials = async (username, password) => {
    const [rows] = await db.query('SELECT * FROM users WHERE username = ? AND password = ?', [username, password]);
    return rows[0];
}