import { poolPromise } from '../config/database.js';

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

export const dbCreateEvent = async (newEvent) => {
    const pool = await poolPromise;
    const result = await pool.request()
        .input('name', sql.NVarChar, newEvent.name)
        .input('description', sql.NVarChar, newEvent.description)
        .input('date', sql.DateTime, newEvent.date)
        .input('location', sql.NVarChar, newEvent.location)
        .input('user_id', sql.Int, newEvent.user_id)
        .query('INSERT INTO events (name, description, date, location, user_id) OUTPUT inserted.id VALUES (@name, @description, @date, @location, @user_id)');
    return { id: result.recordset[0].id, ...newEvent }; // Return inserted id with the event data
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
// import db from "../config/database.js"

// export const dbGetAllEvents = async () => {
//     const [rows] = await db.query("SELECT id, name, date, location FROM events")
//     return rows
// }

// export const dbGetEventById = async (id) => {
//     const [rows] = await db.query("SELECT id, name, date, location FROM events WHERE id = ?", [id])
//     return rows.length > 0 ? rows[0] : null
// }

// export const dbCreateEvent = async (newEvent) => {
//     const [result] = await db.query("INSERT INTO events SET ?", newEvent)
//     return { id: result.insertId, ...newEvent }
// }

// export const dbUpdateEvent = async (id, updatedEvent) => {
//     const [result] = await db.query("UPDATE events SET ? WHERE id = ?", [updatedEvent, id])
//     return result.affectedRows > 0
// }

// export const dbDeleteEvent = async (id) => {
//     const [result] = await db.query("DELETE FROM events WHERE id = ?", [id])
//     return result.affectedRows > 0
// }
