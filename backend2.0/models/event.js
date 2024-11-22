import { poolPromise, sql } from '../config/database.js';

export const dbGetAllEvents = async () => {
    const pool = await poolPromise;
    const result = await pool.request().query('SELECT * FROM events');
    return result.recordset; // Return the rows
};

export const dbGetEventById = async (id) => {
    const pool = await poolPromise;
    const result = await pool.request()
        .input('id', sql.Int, id)
        .query('SELECT * FROM events WHERE id = @id');
    return result.recordset.length > 0 ? result.recordset[0] : null; // Return the first row or null
};

export const dbCreateEvent = async (event) => {
    const { name, description, date, location, user_id } = event;

    const pool = await poolPromise;
    const transaction = pool.transaction();
    await transaction.begin();

    try {
        // Check if the user_id exists
        const userCheck = await transaction
            .request()
            .input("user_id", sql.Int, user_id)
            .query("SELECT COUNT(*) as count FROM users WHERE id = @user_id");

        if (userCheck.recordset[0].count === 0) {
            throw new Error(`User with id ${user_id} does not exist.`);
        }

        // Insert the event
        const result = await transaction
            .request()
            .input("name", sql.NVarChar, name)
            .input("description", sql.NVarChar, description)
            .input("date", sql.Date, date)
            .input("location", sql.NVarChar, location)
            .input("user_id", sql.Int, user_id)
            .query(
                "INSERT INTO events (name, description, date, location, user_id) VALUES (@name, @description, @date, @location, @user_id)"
            );

        await transaction.commit();
        return result.rowsAffected[0] > 0;
    } catch (error) {
        await transaction.rollback();
        console.error("Error creating event:", error);
        throw error;
    }
};

export const dbUpdateEvent = async (id, updatedEvent) => {
    const pool = await poolPromise;
    const result = await pool.request()
        .input('id', sql.Int, id)
        .input('name', sql.NVarChar, updatedEvent.name)
        .input('description', sql.NVarChar, updatedEvent.description)
        .input('date', sql.DateTime, updatedEvent.date)
        .input('location', sql.NVarChar, updatedEvent.location)
        .query('UPDATE events SET name = @name, description = @description, date = @date, location = @location WHERE id = @id');
    return result.rowsAffected[0] > 0; // Return true if rows were affected
};

export const dbDeleteEvent = async (id) => {
    const pool = await poolPromise;
    const result = await pool.request()
        .input('id', sql.Int, id)
        .query('DELETE FROM events WHERE id = @id');
    return result.rowsAffected[0] > 0; // Return true if rows were affected
};