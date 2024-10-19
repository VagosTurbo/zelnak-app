import db from '../config/database.js';

export const dbGetAllEvents = async () => {
    return db.query('SELECT * FROM events');
}

export const dbGetEventById = async (id) => {
    return db.query('SELECT * FROM events WHERE id = ?', [id]);
}

export const dbCreateEvent = async (newEvent) => {
    return db.query('INSERT INTO events SET ?', newEvent);
}

export const dbUpdateEvent = async (id, updatedEvent) => {
    return db.query('UPDATE events SET ? WHERE id = ?', [updatedEvent, id]);
}

export const dbDeleteEvent = async (id) => {
    return db.query('DELETE FROM events WHERE id = ?', [id]);
}

