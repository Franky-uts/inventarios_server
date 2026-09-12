import { pool } from '../db.js';

export const getAreas = async (req, res) => {
    const { rows } = await pool.query(`Select * From "getAreas"() Order By "Area";`);
    res.header('Access-Control-Allow-Origin', '*')
    res.send(rows)
}

export const getCategoria = async (req, res) => {
    const { rows } = await pool.query(`Select * From "getCategorias"() Order By "Categoría";`);
    res.header('Access-Control-Allow-Origin', '*')
    res.send(rows)
}