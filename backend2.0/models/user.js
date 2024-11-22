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
        .input("role", sql.Int, newUser.role)
        .query(
            "INSERT INTO users (username, password, email) OUTPUT Inserted.id VALUES (@username, @password, @email)"
        );
    return { id: result.recordset[0].id, ...newUser };
};

export const dbUpdateUser = async (id, updatedUser) => {
    if (!id || Object.keys(updatedUser).length === 0) {
        throw new Error("Invalid input: ID and at least one field to update are required.");
    }

    const pool = await poolPromise;
    const request = pool.request();

    // TODO heslo aby neslo upravovat

    // Dynamically build the SET clause and add inputs to the request
    const setClauses = [];
    for (const [key, value] of Object.entries(updatedUser)) {
        const paramName = `@${key}`;
        setClauses.push(`${key} = ${paramName}`);
        request.input(key, sql.NVarChar, value); // Adjust sql type based on your schema
    }

    // Add the ID input
    request.input("id", sql.Int, id);

    const query = `UPDATE users SET ${setClauses.join(", ")} WHERE id = @id`;

    // Execute the query
    const result = await request.query(query);

    return result.rowsAffected[0] > 0;
};


export const dbDeleteUser = async (id) => {
    const pool = await poolPromise;

    // Begin a transaction
    const transaction = pool.transaction();
    await transaction.begin();

    try {
        // Delete related events
        await transaction
            .request()
            .input("id", sql.Int, id)
            .query("DELETE FROM events WHERE user_id = @id");

        // Delete the user
        const result = await transaction
            .request()
            .input("id", sql.Int, id)
            .query("DELETE FROM users WHERE id = @id");

        await transaction.commit();

        return result.rowsAffected[0] > 0;
    } catch (error) {
        await transaction.rollback();
        console.error("Error deleting user:", error);
        throw error;
    }
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
