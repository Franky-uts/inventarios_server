import { pool } from '../db.js';
import { fecha } from '../db.js';

export const getOrdenes = async (req, res) => {
    const { filtro } = req.params
    const { locacion } = req.params
    const { rows } = await pool.query(`SELECT "id", "Estado", "Remitente", "UltimaModificación", "Usuarios"."Locacion", array_length("idProductos",1) as "CantArticulos"
        FROM public."Ordenes" INNER JOIN "Usuarios" on "Ordenes"."Remitente" = "Usuarios"."Nombre" 
        WHERE "Usuarios"."Locacion" = '${locacion}'
        ORDER BY "${filtro}";`);
    res.send(rows)
}

export const getAllOrdenes = async (req, res) => {
    const { filtro } = req.params
    const { rows } = await pool.query(`SELECT "id", "Estado", "Remitente", "UltimaModificación", "Usuarios"."Locacion", array_length("idProductos",1) as "CantArticulos"
        FROM public."Ordenes" INNER JOIN "Usuarios" on "Ordenes"."Remitente" = "Usuarios"."Nombre" 
        ORDER BY "${filtro}";`);
    res.send(rows)
}

export const getOrden = async (req, res) => {
    const { id } = req.params
    const { rows } = await pool.query(`SELECT "Ordenes"."id", "idProductos", 
        ARRAY_AGG("Articulos"."Nombre") AS "Articulos", ARRAY_AGG("Tipo") AS "Tipos", ARRAY_AGG("Area") AS "Areas", 
        "Cantidades", "CantidadesCubiertas", "ComentariosTienda", "ComentariosProveedor", "Confirmacion", 
        "Estado", "Remitente", "UltimaModificación", "Usuarios"."Locacion"
        FROM public."Ordenes" 
        INNER JOIN "Usuarios" ON "Ordenes"."Remitente" = "Usuarios"."Nombre" 
        INNER JOIN "Articulos" ON "Articulos"."id" = ANY(SELECT UNNEST("idProductos") FROM "Ordenes" WHERE id = '${id}') 
        WHERE "Ordenes"."id" = '${id}'
        GROUP BY "Ordenes"."id", "Usuarios"."Locacion";`);
    res.send(rows)
}

export const añadirOrden = async (req, res) => {
    const datos = req.body
    const fechaTexto = fecha()
    const length = datos.cantidades.length
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
    const consulta = await pool.query(`INSERT INTO public."Ordenes"(
	"idProductos", "Cantidades", "CantidadesCubiertas", "ComentariosTienda", "ComentariosProveedor", "Confirmacion", 
    "Estado", "Remitente", "UltimaModificación") VALUES 
    ('{${datos.idProductos}}', '{${datos.cantidades}}', '{${cantidadesCubiertas}}', 
    '{${datos.comentarios}}', '{${comentariosProveedor}}', '{${confirmacion}}', 
    'En proceso',  '${datos.remitente}', '${fechaTexto.dia} ${fechaTexto.hora}') RETURNING *;`);
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
            const fechaTexto = fecha()
            const { rows } = await pool.query(`UPDATE public."Ordenes" SET "${columna}" = '${datos.dato}', 
            "UltimaModificación" = '${fechaTexto.dia} ${fechaTexto.hora}' WHERE id = ${id} RETURNING *;`)
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
            const fechaTexto = fecha()
            const { rows } = await pool.query(`UPDATE public."Ordenes" SET "Estado" = '${datos.estado}', "Confirmacion" = '{${datos.confirmacion}}', 
            "UltimaModificación" = '${fechaTexto.dia} ${fechaTexto.hora}' WHERE id = ${id} RETURNING *;`)
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