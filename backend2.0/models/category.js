import { poolPromise, sql } from '../config/database.js';

export const dbGetCategoryById = async (id) => {
    const pool = await poolPromise;
    const result = await pool.request()
        .input('id', sql.Int, id) // Binding the id parameter
        .query('SELECT * FROM categories WHERE id = @id');
    return result.recordset.length > 0 ? result.recordset[0] : null;
};