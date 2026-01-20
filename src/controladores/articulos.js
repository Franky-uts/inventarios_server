import { pool } from '../db.js';

export const getArticulos = async (req, res) => {
    const { filtro } = req.params
    const consulta = await pool.query(`SELECT 
        "id", "Nombre", "Tipo", "Area", "CantidadPorUnidad", "CodigoBarras", "Precio", "MateriaPrima"
        FROM public."Articulos" ORDER BY "${filtro}";`);
    if (consulta.rowCount > 0) {
        res.send(consulta.rows)
    } else {
        res.status(409).send('Error: Error en la base de datos')
    }
}

export const getArticuloBusqueda = async (req, res) => {
    const { filtro } = req.params
    const { busqueda } = req.params
    const consulta = await pool.query(`SELECT 
        "id", "Nombre", "Tipo", "Area", "CantidadPorUnidad", "CodigoBarras", "Precio", "MateriaPrima"
        FROM public."Articulos"
        WHERE "Nombre"||"Tipo"||"Area" ILIKE '%${busqueda}%' ORDER BY "${filtro}";`);
    if (consulta.rowCount > 0) {
        res.send(consulta.rows)
    } else {
        res.status(409).send('No hay coincidencias.')
    }
}

export const getArticulo = async (req, res) => {
    const { id } = req.params
    const consulta = await pool.query(`SELECT 
        id, "Nombre", "Tipo", "Area", "CantidadPorUnidad", "CodigoBarras", "Precio", "MateriaPrima"
        FROM public."Articulos" WHERE id = ${id};`);
    if (consulta.rowCount > 0) {
        res.send(consulta.rows)
    } else {
        res.status(409).send('Error: El artículo no existe.')
    }
}

export const getDatosArticulo = async (req, res) => {
    const { id } = req.params
    const consulta = await pool.query(`SELECT 
        "inventarioNom", "Unidades", "LimiteProd", "Entradas", "Salidas", 
        "PerdidaCantidad", "PerdidaRazon", "UltimoUsuario", "UltimaModificación" 
        FROM public."Almacen" where "idProducto" = ${id} order by "idProducto";`)
    if (consulta.rowCount > 0) {
        res.send(consulta.rows)
    } else {
        res.status(409).send('El producto no se encuentra en ninguna tienda.')
    }
}

export const añadirArticulo = async (req, res) => {
    const datos = req.body
    const consulta = await pool.query(`INSERT INTO public."Articulos" 
    ("Nombre", "Tipo", "Area", "CantidadPorUnidad", "CodigoBarras", "Precio", "MateriaPrima") VALUES 
    ('${datos.nombre}', '${datos.tipo}', '${datos.area}', '${datos.cantidad}', '${datos.barras}', '${datos.precio}', '${datos.precio}') 
    RETURNING *;`);
    if (consulta.rowCount > 0) {
        res.send(consulta.rows)
    } else {
        res.status(409).send('Error: Error en la base de datos')
    }
}

export const eliminarArticulo = async (req, res) => {
    const { id } = req.params
    const consulta = await pool.query(`Select "id" from public."Articulos" WHERE "id" = '${id}';`)
    if (consulta.rowCount > 0) {
        const { rows } = await pool.query(`DELETE FROM public."Articulos" WHERE id = ${id} RETURNING *;`)
        res.send(rows)
    } else {
        res.status(409).send('Error: El artículo no existe')
    }
}

export const editarArticulos = async (req, res) => {
    const { id } = req.params
    const consulta = await pool.query(`Select "id" from public."Articulos" WHERE "id" = '${id}';`)
    if (consulta.rowCount > 0) {
        const { columna } = req.params
        const datos = req.body;
        const { rows } = await pool.query(`UPDATE public."Articulos" SET "${columna}" = '${datos.dato}' 
            WHERE id = ${id} RETURNING *;`)
        res.send(rows)
    } else {
        res.status(409).send('Error: El artículo no existe')
    }
}