import { pool } from '../db.js';

export const getAreas = async (req, res) => {
    const { rows } = await pool.query(`Select * From "getAreas"() Order By "Area";`);
    res.header('Access-Control-Allow-Origin', '*')
    res.send(rows)
}