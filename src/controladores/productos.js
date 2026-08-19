import { pool } from '../db.js';
import { fecha } from '../db.js';
//falta añadir el apartado de los filtros en ambos "getProductos"
export const getProductos = async (req, res) => {
    const { filtro } = req.params
    const { almacen } = req.params
    const { orden } = req.params
    const prod = filtro == 'id' ?
        await pool.query(`select * from "getProductos"('${almacen}','') Order By "${filtro}" ${orden};`) :
        await pool.query(`select * from "getProductos"('${almacen}','') Order By "${filtro}" ${orden}, id asc;`);
    res.header('Access-Control-Allow-Origin', '*')
    if (prod.rowCount > 0) {
        res.status(200).send(prod.rows)
    } else {
        res.status(409).send('Error: No hay productos que coincidan con la busqueda')
    }
}

export const getProductosBusqueda = async (req, res) => {
    const { busqueda } = req.params
    const { filtro } = req.params
    const { almacen } = req.params
    const { orden } = req.params
    const prod = filtro == 'id' ?
        await pool.query(`select * from "getProductos"('${almacen}','${busqueda}') Order By "${filtro}" ${orden};`) :
        await pool.query(`select * from "getProductos"('${almacen}','${busqueda}') Order By "${filtro}" ${orden}, id asc;`);
    res.header('Access-Control-Allow-Origin', '*')
    if (prod.rowCount > 0) {
        res.status(200).send(prod.rows)
    } else {
        res.status(409).send('Error: No hay productos que coincidan con la busqueda')
    }
}

export const getProducto = async (req, res) => {
    const { id } = req.params
    const { inicial } = req.params
    const { final } = req.params
    const { orden } = req.params
    const prod = await pool.query(`Select * From "getProducto"(${id},'${inicial}','${final}',${orden});`);
    res.header('Access-Control-Allow-Origin', '*')
    if (prod.rowCount > 0) {
        res.status(200).send(prod.rows[0])
    } else {
        res.status(409).send('Error: El producto no existe')
    }
}