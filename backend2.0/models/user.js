import query from "../config/database.js"

export const dbGetAllUsers = (callback) => {
    query("SELECT * FROM users", callback)
}

export const dbGetUserById = (id, callback) => {
    query("SELECT * FROM users WHERE id = ?", [id], callback)
}

export const dbCreateUser = (newUser, callback) => {
    query("INSERT INTO users SET ?", newUser, callback)
}

export const dbUpdateUser = (id, updatedUser, callback) => {
    query("UPDATE users SET ? WHERE id = ?", [updatedUser, id], callback)
}

export const dbDeleteUser = (id, callback) => {
    query("DELETE FROM users WHERE id = ?", [id], callback)
}
