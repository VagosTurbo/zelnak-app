import { poolPromise, sql } from '../config/database.js';
import bcrypt from "bcrypt";

export const dbGetAllUsers = async () => {
    const pool = await poolPromise;
    const result = await pool.request().query("SELECT * FROM users");
    return result.recordset;
};

export const dbGetUserById = async (id) => {
    const pool = await poolPromise;
    const result = await pool
        .request()
        .input("id", sql.Int, id)
        .query("SELECT * FROM users WHERE id = @id");
    return result.recordset.length > 0 ? result.recordset[0] : null;
};

export const dbCreateUser = async (newUser) => {
    const pool = await poolPromise;
    const result = await pool
        .request()
        .input("username", sql.NVarChar, newUser.username)
        .input("password", sql.NVarChar, newUser.password)
        .input("email", sql.NVarChar, newUser.email)
        .query(
            "INSERT INTO users (username, password, email) OUTPUT Inserted.id VALUES (@username, @password, @email)"
        );
    return { id: result.recordset[0].id, ...newUser };
};

export const dbUpdateUser = async (id, updatedUser) => {
    const pool = await poolPromise;
    const result = await pool
        .request()
        .input("id", sql.Int, id)
        .input("username", sql.NVarChar, updatedUser.username)
        .input("password", sql.NVarChar, updatedUser.password)
        .input("email", sql.NVarChar, updatedUser.email)
        .query(
            "UPDATE users SET username = @username, password = @password, email = @email WHERE id = @id"
        );
    return result.rowsAffected[0] > 0;
};

export const dbDeleteUser = async (id) => {
    const pool = await poolPromise;
    const result = await pool
        .request()
        .input("id", sql.Int, id)
        .query("DELETE FROM users WHERE id = @id");
    return result.rowsAffected[0] > 0;
};

export const dbVerifyUserCredentials = async (username, password) => {
    const pool = await poolPromise;
    const result = await pool
        .request()
        .input("username", sql.NVarChar, username)
        .query("SELECT * FROM users WHERE username = @username");

    const user = result.recordset.length > 0 ? result.recordset[0] : null;

    if (!user) {
        return null;
    }

    const isPasswordValid = await bcrypt.compare(password, user.password);
    return isPasswordValid ? user : null;
};
