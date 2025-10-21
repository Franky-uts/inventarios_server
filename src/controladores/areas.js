import {pool} from '../db.js'

export const getAreas = async (req,res)=>{
    const {rows} = await pool.query(`SELECT "Nombre"
        FROM public."Areas"
        ORDER BY "Nombre";`);
    res.send(rows)
}