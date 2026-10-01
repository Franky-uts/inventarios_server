import { pool } from '../db.js';
import { fecha } from '../db.js';

export const getRegistro = async (req, res) => {
    const { fecha } = req.params
    const { hora } = req.params
    const { usuario } = req.params
    const consulta = await pool.query(`Select * From "getRegistro"('${fecha}','${hora}','${usuario}');`);
    res.header('Access-Control-Allow-Origin', '*')
    if (consulta.rowCount > 0) {
        res.send(consulta.rows)
    } else {
        res.status(409).send('El registro no existe.')
    }
}

export const getRegistros = async (req, res) => {
    const { locacion } = req.params
    const { filtro } = req.params
    const consulta = await pool.query(filtro == 'Fecha'
        ? `Select * From "getRegistros"('${locacion}','','','') Order By "${filtro}" desc;`
        : `Select * From "getRegistros"('${locacion}','','','') Order By "${filtro}", "Fecha" desc;`)
    res.header('Access-Control-Allow-Origin', '*')
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
    const consulta = await pool.query(filtro == 'Fecha'
        ? `Select * From "getRegistros"('${locacion}','${busqueda}','','') Order By "${filtro}" desc;`
        : `Select * From "getRegistros"('${locacion}','${busqueda}','','') Order By "${filtro}", "Fecha" desc;`);
    res.header('Access-Control-Allow-Origin', '*')
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
    const consulta = await pool.query(filtro == 'Fecha'
        ? `Select * From "getRegistros"('${locacion}','','${fechaInicial}','${fechaFinal}') Order By "${filtro}" desc;`
        : `Select * From "getRegistros"('${locacion}','','${fechaInicial}','${fechaFinal}') Order By "${filtro}", "Fecha" desc;`);
    res.header('Access-Control-Allow-Origin', '*')
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
    const consulta = await pool.query(filtro == 'Fecha'
        ? `Select * From "getRegistros"('${locacion}','${busqueda}','${fechaInicial}','${fechaFinal}') Order By "${filtro}" desc;`
        : `Select * From "getRegistros"('${locacion}','${busqueda}','${fechaInicial}','${fechaFinal}') Order By "${filtro}", "Fecha" desc;`);
    res.header('Access-Control-Allow-Origin', '*')
    if (consulta.rowCount > 0) {
        res.send(consulta.rows)
    } else {
        res.status(409).send('No hay registros realizados.')
    }
}

export const añadirRegistroCompleto = async (req, res) => {
    const datos = req.body
    const fechaTexto = fecha()
    const consulta = await pool.query(`Select * from "addRegistroCompleto"('${datos.usuario}', array[${datos.productos}], array[${datos.cerrados}], array[${datos.paquetes}], array[${datos.abiertos}], '${fechaTexto.dia}', '${fechaTexto.hora}');`);
    var code = 409
    var mensaje = 'Error: No se pudo conectar con la base de datos.'
    res.header('Access-Control-Allow-Origin', '*')
    if (consulta.rowCount > 0) {
        const respuesta = consulta.rows[0];
        code = respuesta.Código
        mensaje = respuesta.Mensaje
    }
    res.status(code).send(mensaje)
}