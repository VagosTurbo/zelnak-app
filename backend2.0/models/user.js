import db from "../config/database.js"

export const dbGetAllUsers = async () => {
    const [rows] = await db.query("SELECT * FROM users")
    return rows
}

export const dbGetUserById = async (id) => {
    const [rows] = await db.query("SELECT * FROM users WHERE id = ?", [id])
    return rows.length > 0 ? rows[0] : null
}

export const dbCreateUser = async (newUser) => {
    const [result] = await db.query("INSERT INTO users SET ?", newUser)
    return { id: result.insertId, ...newUser }
}

export const dbUpdateUser = async (id, updatedUser) => {
    const [result] = await db.query("UPDATE users SET ? WHERE id = ?", [updatedUser, id])
    return result.affectedRows > 0
}

export const dbDeleteUser = async (id) => {
    const [result] = await db.query("DELETE FROM users WHERE id = ?", [id])
    return result.affectedRows > 0
}

export const dbVerifyUserCredentials = async (username, password) => {
    const [rows] = await db.query('SELECT * FROM users WHERE username = ? AND password = ?', [username, password]);
    return rows[0];
}