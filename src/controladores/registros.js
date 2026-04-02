import { pool } from '../db.js';

export const getRegistro = async (req, res) => {
    const { fecha } = req.params
    const { hora } = req.params
    const { usuario } = req.params
    const consulta = await pool.query(`Select * From "getRegistro"('${fecha}','${hora}','${usuario}');`);
    if (consulta.rowCount > 0) {
        res.send(consulta.rows)
    } else {
        res.status(409).send('El registro no existe.')
    }
}

export const getRegistros = async (req, res) => {
    const { locacion } = req.params
    const { filtro } = req.params
    const consulta = await pool.query(`Select * From "getRegistros"('${locacion}','','','') Order By "${filtro}";`);
    if (consulta.rowCount > 0) {
        res.send(consulta.rows)
    } else {
        res.status(409).send('No hay registros realizados.')
    }
}

export const getRegistrosBusqueda = async (req, res) => {
    const { locacion } = req.params
    const { busqueda } = req.params
    const { filtro } = req.params
    const consulta = await pool.query(`Select * From "getRegistros"('${locacion}','${busqueda}','','') Order By "${filtro}";`);
    if (consulta.rowCount > 0) {
        res.send(consulta.rows)
    } else {
        res.status(409).send('No hay registros realizados.')
    }
}

export const getRegistrosRango = async (req, res) => {
    const { locacion } = req.params
    const { fechaInicial } = req.params
    const { fechaFinal } = req.params
    const { filtro } = req.params
    const consulta = await pool.query(`Select * From "getRegistros"('${locacion}','','${fechaInicial}','${fechaFinal}') Order By "${filtro}";`);
    if (consulta.rowCount > 0) {
        res.send(consulta.rows)
    } else {
        res.status(409).send('No hay registros realizados.')
    }
}

export const getRegistrosRangoBusqueda = async (req, res) => {
    const { locacion } = req.params
    const { fechaInicial } = req.params
    const { fechaFinal } = req.params
    const { busqueda } = req.params
    const { filtro } = req.params
    const consulta = await pool.query(`Select * From "getRegistros"('${locacion}','${busqueda}','${fechaInicial}','${fechaFinal}') Order By "${filtro}";`);
    if (consulta.rowCount > 0) {
        res.send(consulta.rows)
    } else {
        res.status(409).send('No hay registros realizados.')
    }
}