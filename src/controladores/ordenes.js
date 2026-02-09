import { pool } from '../db.js';
import { fecha } from '../db.js';

export const getOrdenes = async (req, res) => {
    const { filtro } = req.params
    const { locacion } = req.params
    const consulta = await pool.query(`Select * From "getOrdenes"('${locacion}') Order By "${filtro}";`);
    if (consulta.rowCount > 0) {
        res.send(consulta.rows)
    } else {
        res.status(409).send('No hay ordenes realizadas.')
    }
}

export const getAllOrdenes = async (req, res) => {
    const { filtro } = req.params
    const consulta = await pool.query(`Select * From "getOrdenes"('') Order By "${filtro}";`);
    if (consulta.rowCount > 0) {
        res.send(consulta.rows)
    } else {
        res.status(409).send('No hay ordenes realizadas.')
    }
}

export const getOrden = async (req, res) => {
    const { id } = req.params
    const consulta = await pool.query(`Select * From "getOrden"(${id});`);
    if (consulta.rowCount > 0) {
        res.send(consulta.rows)
    } else {
        res.status(409).send('La orden no existe.')
    }
}

export const añadirOrden = async (req, res) => {
    const datos = req.body
    const fechaTexto = fecha()
    for (var i = 0; i < datos.comentarios.length; i++) {
        if (datos.comentarios[i].length < 1) { datos.comentarios[i] = `'Sin comentarios'` }
    }
    const consulta = await pool.query(`Select * From "addOrden"(Array[${datos.idProductos}], Array[${datos.cantidades}], 
    Array[${datos.comentarios}], '${datos.remitente}', '${fechaTexto.dia} ${fechaTexto.hora}');`);
    var code = 409
    var mensaje = 'Error: No se pudo conectar con la base de datos.'
    if (consulta.rowCount > 0) {
        const respuesta = consulta.rows[0];
        code = respuesta.Código
        mensaje = respuesta.Mensaje
    }
    res.status(code).send(mensaje)
}

export const editarOrden = async (req, res) => {
    const { id } = req.params
    const { columna } = req.params
    const fechaTexto = fecha()
    const consulta = await pool.query(`Select * From "updOrden"(${id}, '${columna}', '${datos.dato}', '${fechaTexto.dia} ${fechaTexto.hora}');`)
    var code = 409
    var mensaje = 'Error: No se pudo conectar con la base de datos.'
    if (consulta.rowCount > 0) {
        const respuesta = consulta.rows[0];
        code = respuesta.Código
        mensaje = respuesta.Mensaje
    }
    res.status(code).send(mensaje)
}

export const editarOrdenconfir = async (req, res) => {
    const { id } = req.params
    const datos = req.body;
    const fechaTexto = fecha()
    const consulta = await pool.query(`Select * From "updOrdenConf"(${id}, '${datos.estado}', Array[${datos.confirmacion}], '${fechaTexto.dia} ${fechaTexto.hora}');`)
    var code = 409
    var mensaje = 'Error: No se pudo conectar con la base de datos.'
    if (consulta.rowCount > 0) {
        const respuesta = consulta.rows[0];
        code = respuesta.Código
        mensaje = respuesta.Mensaje
    }
    res.status(code).send(mensaje)
}

export const eliminarOrden = async (req, res) => {
    const { id } = req.params
    const consulta = await pool.query(`Select * From "delOrden"(${id});`)
    var code = 409
    var mensaje = 'Error: No se pudo conectar con la base de datos.'
    if (consulta.rowCount > 0) {
        const respuesta = consulta.rows[0];
        code = respuesta.Código
        mensaje = respuesta.Mensaje
    }
    res.status(code).send(mensaje)
}