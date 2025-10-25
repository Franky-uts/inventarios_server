import { pool } from '../db.js'

export const getUsuarios = async (req, res) => {
    const { rows } = await pool.query(`Select "Nombre", "Puesto", "Locacion" from public."Usuarios";`)
    res.send(rows)
}

export const getUsuario = async (req, res) => {
    const { usuario } = req.params
    const { contr } = req.params
    const { rows } = await pool.query(`Select "Nombre" from public."Usuarios" WHERE "Nombre" = '${usuario}';`)
    if (rows.length > 0) {
        const { rows } = await pool.query(`Select "Nombre", "Puesto", "Locacion" from public."Usuarios" WHERE "Nombre" = '${usuario}' AND "Contraseña" = '${contr}';`)
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
    const consulta = await pool.query(`Select "Nombre" from public."Usuarios" WHERE "Nombre" = '${datos.usuario}';`)
    if (consulta.rowCount < 1) {
        const { rows } = await pool.query(`INSERT INTO public."Usuarios"("Nombre", "Contraseña", "Puesto", "Locacion") 
            VALUES ('${datos.usuario}','${datos.contraseña}','${datos.puesto}', '${datos.locacion}') RETURNING *;`)
        res.send(rows)
    } else {
        res.status(409).send('Error: El usuario ya existe')
    }
}

export const borrarUsuario = async (req, res) => {
    const { usuario } = req.params
    const consulta = await pool.query(`Select "Nombre" from public."Usuarios" WHERE "Nombre" = '${datos.usuario}';`)
    if (consulta.rowCount > 0) {
        const datos = req.body
        const usuariosAlmacen = await pool.query(`UPDATE public."Almacen" SET "UltimoUsuario" = 'Usuario', 
            WHERE "UltimoUsuario" = ${datos.usuario} RETURNING *;`)
        const { rows } = await pool.query(`DELETE FROM public."Usuarios" WHERE "Nombre" = ${usuario} RETURNING *;`)
        res.send([rows, `Campos modificados: ${usuariosAlmacen.rowCount}`])
    } else {
        res.status(409).send('Error: El usuario no existe')
    }
}

export const editarUsuario = async (req, res) => {
    const { usuario } = req.params
    const { columna } = req.params
    if (columna != "Nombre") {
        const consulta = await pool.query(`Select "Nombre" from public."Usuarios" WHERE "Nombre" = '${usuario}';`)
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