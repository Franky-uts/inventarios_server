import { pool } from '../db.js';

export const getOrdenes = async (req, res) => {
    const { filtro } = req.params
    const { locacion } = req.params
    const { rows } = await pool.query(`SELECT "id", "Artículos", "Cantidades", "CantidadesCubiertas", "Estado", "Remitente", "UltimaModificación", "Destino"
        FROM public."Ordenes" WHERE "Destino" = '${locacion}'
        ORDER BY "${filtro}";`);
    res.send(rows)
}

export const getAllOrdenes = async (req, res) => {
    const { filtro } = req.params
    const { rows } = await pool.query(`SELECT "id", "Artículos", "Cantidades", "CantidadesCubiertas", "Estado", "Remitente", "UltimaModificación", "Destino"
        FROM public."Ordenes"
        ORDER BY "${filtro}";`);
    res.send(rows)
}

export const añadirOrden = async (req, res) => {
    const datos = req.body
    const fecha = new Date(Date.now());
    const fechaTexto = fecha.toLocaleDateString() + " " + fecha.getHours() + ":" + fecha.getMinutes() + ":" + fecha.getSeconds()
    var lista = new Array(datos.cantidades.split(",").length);
    for (var i = 0; i < datos.cantidades.split(",").length; i++) {
        lista[i] = 0;
    }
    const cantidadesCubiertas = `{${lista.toString()}}`;
    const consulta = await pool.query(`INSERT INTO public."Ordenes"(
	"Artículos", "Cantidades", "CantidadesCubiertas", "Estado", "Remitente", "UltimaModificación", "Destino")
	VALUES ('${datos.articulos}', '${datos.cantidades}', '${cantidadesCubiertas}', '${datos.estado}', '${datos.remitente}', '${fechaTexto}', '${datos.destino}') RETURNING *;`);
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
            const fechaTexto = fecha.toLocaleDateString() + " " + fecha.getHours() + ":" + fecha.getMinutes() + ":" + fecha.getSeconds()
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