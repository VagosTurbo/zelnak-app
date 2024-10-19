// backend/models/user.js
import db from '../config/database.js';

export const dbGetAllProducts = async () => {
    return db.query('SELECT * FROM products');
};

export const dbGetProductById = async (id) => {
    return db.query('SELECT * FROM products WHERE id = ?', [id]);
};

export const dbCreateProduct = async (newProduct) => {
    return db.query('INSERT INTO products SET ?', newProduct);
};

export const dbUpdateProduct = async (id, updatedProduct) => {
    return db.query('UPDATE products SET ? WHERE id = ?', [updatedProduct, id]);
};

export const dbDeleteProduct = async (id) => {
    return db.query('DELETE FROM products WHERE id = ?', [id]);
};