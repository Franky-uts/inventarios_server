import { pool } from '../db.js';

export const getAreas = async (req, res) => {
    const { rows } = await pool.query(`Select * From "getAreas"() Order By "Area";`);
    res.send(rows)
}