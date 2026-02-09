import { pool } from '../db.js';

export const getTipos = async (req, res) => {
    const { rows } = await pool.query(`Select * From "getTipos"() Order By "Tipo";`);
    res.send(rows)
}