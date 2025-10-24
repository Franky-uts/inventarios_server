import { pool } from '../db.js';

export const getAlmacen = async (req, res) => {
    const { filtro } = req.params
    const { locacion } = req.params
    const consulta = await pool.query(`SELECT "id", "Nombre", "Tipo",
        "Unidades", "CantidadPorUnidad", "Area", "Entrada", 
		"Salida", "Perdida", "UltimaModificación", "UltimoUsuario"
        FROM public."${locacion}"
        ORDER BY "${filtro}";`);
    if (consulta.rowCount > 0) {
        res.send(consulta.rows)
    } else {
        res.status(409).send('Error: Error en la base de datos')
    }
}

export const getAlmacenBusqueda = async (req, res) => {
    const { filtro } = req.params
    const { locacion } = req.params
    const { busqueda } = req.params
    const consulta = await pool.query(`SELECT "id", "Nombre", "Tipo",
        "Unidades", "CantidadPorUnidad", "Area", "Entrada", 
		"Salida", "Perdida", "UltimaModificación", "UltimoUsuario"
        FROM public."${locacion}"
        WHERE "Nombre"||"Tipo"||"Area" ILIKE '%${busqueda}%' ORDER BY "${filtro}";`);
    if (consulta.rowCount > 0) {
        res.send(consulta.rows)
    } else {
        res.status(409).send('Error: Error en la base de datos')
    }
}

export const añadirAlmacen = async (req, res) => {
    const { locacion } = req.params
    const datos = req.body
    const fecha = new Date(Date.now());
    const fechaTexto = fecha.toLocaleDateString() + " " + fecha.getHours() + ":" + fecha.getMinutes() + ":" + fecha.getSeconds()
    const consulta = await pool.query(`INSERT INTO public."${locacion}"(
	"Nombre", "Unidades", "CantidadPorUnidad", "Entrada", "Salida", 
    "Perdida", "UltimaModificación", "Tipo", "Area", "UltimoUsuario") 
    VALUES ('${datos.nombre}', 0, ${datos.cantidad}, 0, 0, 0, '${fechaTexto}', '${datos.tipo}', 
    '${datos.area}', '${datos.usuario}') RETURNING *;`);
    if (consulta.rowCount > 0) {
        res.send(consulta.rows)
    } else {
        res.status(409).send('Error: Error en la base de datos')
    }
}

export const eliminarAlmacen = async (req, res) => {
    const { id } = req.params
    const { locacion } = req.params
    const consulta = await pool.query(`Select "id" from public."${locacion}" WHERE "id" = '${id}';`)
    if (consulta.rowCount > 0) {
        const { rows } = await pool.query(`DELETE FROM public."${locacion}" WHERE id = ${id} RETURNING *;`)
        res.send(rows)
    } else {
        res.status(409).send('Error: El artículo no existe')
    }
}

export const editarAlmacen = async (req, res) => {
    const { id } = req.params
    const { locacion } = req.params
    const consulta = await pool.query(`Select "id" from public."${locacion}" WHERE "id" = '${id}';`)
    if (consulta.rowCount > 0) {
        const { columna } = req.params
        const datos = req.body;
        const fecha = new Date(Date.now());
        const fechaTexto = fecha.toLocaleDateString() + " " + fecha.getHours() + ":" + fecha.getMinutes() + ":" + fecha.getSeconds()
        const { rows } = await pool.query(`UPDATE public."${locacion}" SET "${columna}" = ${datos.dato}, 
            "UltimaModificación" = '${fechaTexto}', "UltimoUsuario" = '${datos.usuario}' WHERE id = ${id} RETURNING *;`)
        res.send(rows)
    } else {
        res.status(409).send('Error: El artículo no existe')
    }
}

export const reiniciarMovimientos = async (req, res) => {
    const { locacion } = req.params
    const consulta = await pool.query(`UPDATE public."${locacion}"
	SET "Entrada"=0, "Salida"=0, "Perdida"=0 RETURNING *;`)
    if (consulta.rowCount > 0) {
        res.send(consulta.rows)
    } else {
        res.status(409).send('Error: No hubo cambios')
    }
}

/*export const añadirAlmacen = async (req,res)=>{
    const datos = req.body
    const lista = []
    for (let i = 0; i < datos.length; i++) {
        console.log(i)
        console.log(datos[i])
        const {rows} = await pool.query(`INSERT INTO almacen("Nombre", "Tipo", "Unidades", "CantidadPorUnidad", "Area", "Entrada", "Salida", "Perdida", "UltimaModificación") VALUES ('${datos[i].nombre}', '${datos[i].tipo}', 0, 0, '${datos[i].area}', 0, 0, 0, Now()) RETURNING *;`);
        lista[i] = rows
    }
    //const {rows} = await pool.query(`INSERT INTO almacen("Nombre", "Tipo", "Unidades", "CantidadPorUnidad", "Area", "Entrada", "Salida", "Perdida", "UltimaModificación") VALUES ('${datos.nombre}', '${datos.tipo}', 0, 0, '${datos.area}', 0, 0, 0, Now()) RETURNING *;`);
    res.send(lista)
}*/