import { pool } from '../db.js';

export const getTipos = async (req, res) => {
    const { rows } = await pool.query(`Select * From "getTipos"() Order By "Tipo";`);
    res.header('Access-Control-Allow-Origin', '*')
    res.send(rows)
}

export const getTiposProducto = async (req, res) => {
    const { rows } = await pool.query(`Select * From "getTiposProducto"() Order By "Tipo";`);
    res.header('Access-Control-Allow-Origin', '*')
    res.send(rows)
}