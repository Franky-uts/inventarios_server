import { pool } from '../db.js';

export const getOrdenes = async (req, res) => {
    const { filtro } = req.params
    const { locacion } = req.params
    const { rows } = await pool.query(`SELECT "id", "Artículos", "Tipos", "Areas", "Cantidades", "CantidadesCubiertas", 
        "ComentariosTienda", "ComentariosProveedor", "Confirmacion","Estado", "Remitente", "UltimaModificación", "Destino"
        FROM public."Ordenes" WHERE "Destino" = '${locacion}'
        ORDER BY "${filtro}";`);
    res.send(rows)
}

export const getAllOrdenes = async (req, res) => {
    const { filtro } = req.params
    const { rows } = await pool.query(`SELECT "id", "Artículos", "Tipos", "Areas", "Cantidades", "CantidadesCubiertas", 
        "ComentariosTienda", "ComentariosProveedor", "Confirmacion","Estado", "Remitente", "UltimaModificación", "Destino"
        FROM public."Ordenes"
        ORDER BY "${filtro}";`);
    res.send(rows)
}

export const añadirOrden = async (req, res) => {
    const datos = req.body
    const fecha = new Date(Date.now());
    const fechaTexto = `${fecha.getDate()}-${fecha.getMonth() + 1}-${fecha.getFullYear()} ${fecha.getHours()}:${fecha.getMinutes()}:${fecha.getSeconds()}`
    const length = datos.cantidades.split(",").length
    var cantidadesCubiertas = new Array(length)
    var comentariosProveedor = new Array(length)
    var confirmacion = new Array(length)
    for (var i = 0; i < length; i++) {
        cantidadesCubiertas[i] = 0
        comentariosProveedor[i] = 'Sin comentarios'
        confirmacion[i] = 'f'
    }
    for (var i = 0; i < datos.comentarios.length; i++) {
        if (datos.comentarios[i].length < 1) { datos.comentarios[i] = "Sin comentarios" }
    }
    console.log(`{INSERT INTO public."Ordenes"(
	"Artículos", "Tipos", "Areas", "Cantidades", "CantidadesCubiertas", "ComentariosTienda", 
    "ComentariosProveedor", "Confirmacion", "Estado", "Remitente", "UltimaModificación", "Destino") VALUES 
    ('${datos.articulos}', '${datos.tipos}', '${datos.areas}', '${datos.cantidades}', '{${cantidadesCubiertas}}', '{${datos.comentarios.toString()}}', 
    '{${comentariosProveedor}}', '{${confirmacion}}', '${datos.estado}', '${datos.remitente}', '${fechaTexto}', '${datos.destino}') RETURNING *;}`)
    const consulta = await pool.query(`INSERT INTO public."Ordenes"(
	"Artículos", "Tipos", "Areas", "Cantidades", "CantidadesCubiertas", "ComentariosTienda", 
    "ComentariosProveedor", "Confirmacion", "Estado", "Remitente", "UltimaModificación", "Destino") VALUES 
    ('${datos.articulos}', '${datos.tipos}', '${datos.areas}', '${datos.cantidades}', '{${cantidadesCubiertas}}', '{${datos.comentarios.toString()}}', 
    '{${comentariosProveedor}}', '{${confirmacion}}', '${datos.estado}', '${datos.remitente}', '${fechaTexto}', '${datos.destino}') RETURNING *;`);
    if (consulta.rowCount > 0) {
        res.send(consulta.rows)
    } else {
        res.status(409).send('Error: Error en la base de datos')
    }
}

export const editarOrden = async (req, res) => {
    const { id } = req.params
    const consulta = await pool.query(`Select "id" from public."Ordenes" WHERE "id" = '${id}';`)
    if (consulta.rowCount > 0) {
        const { columna } = req.params
        if (columna != 'id') {
            const datos = req.body;
            const fecha = new Date(Date.now());
            const fechaTexto = `${fecha.getDate()}-${fecha.getMonth() + 1}-${fecha.getFullYear()} ${fecha.getHours()}:${fecha.getMinutes()}:${fecha.getSeconds()}`
            const { rows } = await pool.query(`UPDATE public."Ordenes" SET "${columna}" = '${datos.dato}', 
            "UltimaModificación" = '${fechaTexto}' WHERE id = ${id} RETURNING *;`)
            res.send(rows)
        } else {
            res.status(409).send('Error: El id no se puede modificar.')
        }
    } else {
        res.status(409).send('Error: El artículo no existe')
    }
}

export const editarOrdenconfir = async (req, res) => {
    const { id } = req.params
    const consulta = await pool.query(`Select "id" from public."Ordenes" WHERE "id" = '${id}';`)
    if (consulta.rowCount > 0) {
        const { columna } = req.params
        if (columna != 'id') {
            const datos = req.body;
            const fecha = new Date(Date.now());
            const fechaTexto = `${fecha.getDate()}-${fecha.getMonth() + 1}-${fecha.getFullYear()} ${fecha.getHours()}:${fecha.getMinutes()}:${fecha.getSeconds()}`
            const { rows } = await pool.query(`UPDATE public."Ordenes" SET "Estado" = '${datos.estado}', "Confirmacion" = '${datos.confirmacion}', 
            "UltimaModificación" = '${fechaTexto}' WHERE id = ${id} RETURNING *;`)
            res.send(rows)
        } else {
            res.status(409).send('Error: El id no se puede modificar.')
        }
    } else {
        res.status(409).send('Error: El artículo no existe')
    }
}

export const eliminarOrden = async (req, res) => {
    const { id } = req.params
    const consulta = await pool.query(`Select "id" from public."Ordenes" WHERE "id" = '${id}';`)
    if (consulta.rowCount > 0) {
        const { rows } = await pool.query(`DELETE FROM public."Ordenes" WHERE id = ${id} RETURNING *;`)
        res.send(rows)
    } else {
        res.status(409).send('Error: El artículo no existe')
    }
}