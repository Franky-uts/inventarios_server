import {pool} from '../db.js'

export const getTipos = async (req,res)=>{
    const {rows} = await pool.query(`SELECT "Nombre"
        FROM public."Tipos"
        ORDER BY "Nombre";`);
    res.send(rows)
}