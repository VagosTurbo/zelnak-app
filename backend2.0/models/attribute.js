// backend2.0/models/attribute.js
import { poolPromise, sql } from '../config/database.js';

export const dbCreateAttribute = async (newAttribute) => {
    const pool = await poolPromise;
    const result = await pool.request()
        .input('name', sql.NVarChar, newAttribute.name)
        .input('is_required', sql.Bit, newAttribute.is_required)
        .input('category_id', sql.Int, newAttribute.category_id)
        .query('INSERT INTO attributes (name, is_required, category_id) VALUES (@name, @is_required, @category_id)');
    return { id: result.recordset[0].id, ...newAttribute };
};

export const dbGetAttributesByCategoryId = async (categoryId) => {
    const pool = await poolPromise;
    const result = await pool.request()
        .input('category_id', sql.Int, categoryId)
        .query('SELECT * FROM attributes WHERE category_id = @category_id');
    return result.recordset;
};