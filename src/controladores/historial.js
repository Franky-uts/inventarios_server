import { pool } from '../db.js';

export const getHistorialInfo = async (req, res) => {
    const { locacion } = req.params
    const { id } = req.params
    const { fecha } = req.params
    const consulta = await pool.query(`Select * From "getHistorialInfo"(${id},'${locacion}','${fecha}');`);
    if (consulta.rowCount > 0) {
        res.send(consulta.rows)
    } else {
        res.status(409).send('El registro no existe.')
    }
}

export const getHistorial = async (req, res) => {
    const { filtro } = req.params
    const { locacion } = req.params
    const consulta = await pool.query(`Select * From "getHistorial"('${locacion}', '', '', '') Order By "${filtro}";`);
    if (consulta.rowCount > 0) {
        res.send(consulta.rows)
    } else {
        res.status(409).send('No hay cambios registrados.')
    }
}

export const getHistorialBusqueda = async (req, res) => {
    const { filtro } = req.params
    const { locacion } = req.params
    const { busqueda } = req.params
    const consulta = await pool.query(`Select * From "getHistorial"('${locacion}', '${busqueda}', '', '') Order By "${filtro}";`);
    if (consulta.rowCount > 0) {
        res.send(consulta.rows)
    } else {
        res.status(409).send('No hay cambios registrados.')
    }
}

export const getHistorialRango = async (req, res) => {
    const { filtro } = req.params
    const { locacion } = req.params
    const { fechaInicial } = req.params
    const { fechaFinal } = req.params
    const consulta = await pool.query(`Select * From "getHistorial"('${locacion}', '', '${fechaInicial}', '${fechaFinal}') Order By "${filtro}";`);
    if (consulta.rowCount > 0) {
        res.send(consulta.rows)
    } else {
        res.status(409).send('No hay cambios registrados.')
    }
}

export const getHistorialRangoBusqueda = async (req, res) => {
    const { filtro } = req.params
    const { locacion } = req.params
    const { busqueda } = req.params
    const { fechaInicial } = req.params
    const { fechaFinal } = req.params
    const consulta = await pool.query(`Select * From "getHistorial"('${locacion}', '${busqueda}', '${fechaInicial}', '${fechaFinal}') Order By "${filtro}";`);
    if (consulta.rowCount > 0) {
        res.send(consulta.rows)
    } else {
        res.status(409).send('No hay cambios registrados.')
    }
}
