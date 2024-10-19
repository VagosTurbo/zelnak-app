import db from '../config/database.js';

export const dbGetAllOrders = async () => {
    return db.query('SELECT * FROM orders');
}

export const dbGetOrderById = async (id) => {
    return db.query('SELECT * FROM orders WHERE id = ?', [id]);
}

export const dbCreateOrder = async (newOrder) => {
    return db.query('INSERT INTO orders SET ?', newOrder);
}

export const dbUpdateOrder = async (id, updatedOrder) => {
    return db.query('UPDATE orders SET ? WHERE id = ?', [updatedOrder, id]);
}

export const dbDeleteOrder = async (id) => {
    return db.query('DELETE FROM orders WHERE id = ?', [id]);
}

export const dbGetOrdersByUserId = async (userId) => {
    return db.query('SELECT * FROM orders WHERE userId = ?', [userId]);
}

