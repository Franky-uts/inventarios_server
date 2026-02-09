 import { pool } from '../db.js'

export const getUsuario = async (req, res) => {
    const { usuario } = req.params
    const { contr } = req.params
    const { rows } = await pool.query(`Select "Nombre" From public."Usuarios" WHERE "Nombre" = '${usuario}';`)
    if (rows.length > 0) {
        const { rows } = await pool.query(`Select * From "getUsuario"('${usuario}', '${contr}');`)
        if (rows.length > 0) {
            res.send(rows)
        } else {
            res.status(409).send('Error: Contraseña incorrecta')
        }
    } else {
        res.status(409).send('Error: El usuario no existe')
    }
}

export const añadirUsuario = async (req, res) => {
    const datos = req.body
    const consulta = await pool.query(`Select * From "addUsuario"('${datos.usuario}', '${datos.contraseña}', '${datos.puesto}', '${datos.locacion}');`);
    var code = 409
    var mensaje = 'Error: No se pudo conectar con la base de datos.'
    if (consulta.rowCount > 0) {
        const respuesta = consulta.rows[0];
        code = respuesta.Código
        mensaje = respuesta.Mensaje
    }
    res.status(code).send(mensaje)
}

export const borrarUsuario = async (req, res) => {
    const { usuario } = req.params
    const consulta = await pool.query(`Select * From "delUsuario"('${usuario}');`)
    var code = 409
    var mensaje = 'Error: No se pudo conectar con la base de datos.'
    if (consulta.rowCount > 0) {
        const respuesta = consulta.rows[0];
        code = respuesta.Código
        mensaje = respuesta.Mensaje
    }
    res.status(code).send(mensaje)
}

export const editarUsuario = async (req, res) => {
    const { usuario } = req.params
    const { columna } = req.params
    if (columna != "Nombre") {
        const consulta = await pool.query(`Select "Nombre" From public."Usuarios" WHERE "Nombre" = '${usuario}';`)
        if (consulta.rowCount > 0) {
            const datos = req.body
            const { rows } = await pool.query(`UPDATE public."Usuarios" SET "${columna}" = '${datos.dato}'
            WHERE "Nombre" = '${usuario}' RETURNING *;`)
            res.send(rows)
        } else {
            res.status(409).send('Error: El usuario no existe')
        }
    } else {
        res.status(409).send('Error: El nombre de usuario no se puede modificar')
    }
}