import { pool } from '../db.js';

export const getArticulo = async (req, res) => {
    const { id } = req.params
    const consulta = await pool.query(`Select * From "getArticulo"(${id});`);
    if (consulta.rowCount > 0) {
        res.send(consulta.rows)
    } else {
        res.status(409).send('Error: El artículo no existe.')
    }
}

export const getArticulos = async (req, res) => {
    const { filtro } = req.params
    const consulta = await pool.query(`Select * From "getArticulos"('') Order By "${filtro}";`);
    if (consulta.rowCount > 0) {
        res.send(consulta.rows)
    } else {
        res.status(409).send('Error: Error en la base de datos')
    }
}

export const getArticuloBusqueda = async (req, res) => {
    const { filtro } = req.params
    const { busqueda } = req.params
    const consulta = await pool.query(`Select * From "getArticulos"('${busqueda}') Order By "${filtro}";`);
    if (consulta.rowCount > 0) {
        res.send(consulta.rows)
    } else {
        res.status(409).send('No hay coincidencias.')
    }
}

export const getDatosArticulo = async (req, res) => {
    const { id } = req.params
    const consulta = await pool.query(`Select * From "getDatosArticulo"(${id})`)
    if (consulta.rowCount > 0) {
        res.send(consulta.rows)
    } else {
        res.status(409).send('El producto no se encuentra en ninguna tienda.')
    }
}

export const añadirArticulo = async (req, res) => {
    const datos = req.body
    const consulta = await pool.query(`Select  * From "addArticulo"('${datos.nombre}', '${datos.tipo}', '${datos.area}', '${datos.cantidad}', '${datos.barras}', '${datos.precio}', '${datos.materia}');`);
    var code = 409
    var mensaje = 'Error: No se pudo conectar con la base de datos.'
    if (consulta.rowCount > 0) {
        const respuesta = consulta.rows[0];
        code = respuesta.Código
        mensaje = respuesta.Mensaje
    }
    res.status(code).send(mensaje)
}

export const eliminarArticulo = async (req, res) => {
    const { id } = req.params
    const consulta = await pool.query(`Select * From "delArticulo"(${id});`)
    var code = 409
    var mensaje = 'Error: No se pudo conectar con la base de datos.'
    if (consulta.rowCount > 0) {
        const respuesta = consulta.rows[0];
        code = respuesta.Código
        mensaje = respuesta.Mensaje
    }
    res.status(code).send(mensaje)
}

export const editarArticulos = async (req, res) => {
    const { id } = req.params
    const datos = req.body;
    const consulta = await pool.query(`Select * From "updArticulo"(${id}, '${datos.columna}', ${datos.dato});`)
    var code = 409
    var mensaje = 'Error: No se pudo conectar con la base de datos.'
    if (consulta.rowCount > 0) {
        const respuesta = consulta.rows[0];
        code = respuesta.Código
        mensaje = respuesta.Mensaje
    }
    res.status(code).send(mensaje)
}