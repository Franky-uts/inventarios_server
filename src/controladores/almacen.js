import {pool} from '../db.js'

export const getAlmacen = async (req,res)=>{
    const {filtro} = req.params
    const {rows} = await pool.query(`SELECT "Almacen"."id", "Almacen"."Nombre", "Tipos"."Nombre" as "Tipo",
        "Unidades", "CantidadPorUnidad", "Areas"."Nombre" as "Area", "Entrada", "Salida", "Perdida", to_char("UltimaModificación", 'HH24:MI DD/MM/YYYY')as "UltimaModificación"
        FROM public."Almacen"
        INNER JOIN "Tipos" ON "Almacen"."Tipo" = "Tipos"."id"
	    INNER JOIN "Areas" ON "Almacen"."Area" = "Areas"."id" 
         ORDER BY "${filtro}";`);
    res.send(rows)
}

export const getAlmacenBusqueda = async (req,res)=>{
    const {filtro} = req.params
    const {busqueda} = req.params
    const {rows} = await pool.query(`SELECT "Almacen"."id", "Almacen"."Nombre", "Tipos"."Nombre" as "Tipo",
        "Unidades", "CantidadPorUnidad", "Areas"."Nombre" as "Area", "Entrada", "Salida", "Perdida", to_char("UltimaModificación", 'HH24:MI DD/MM/YYYY')as "UltimaModificación"
        FROM public."Almacen" 
        INNER JOIN "Tipos" ON "Almacen"."Tipo" = "Tipos"."id"
	    INNER JOIN "Areas" ON "Almacen"."Area" = "Areas"."id" 
        WHERE "Almacen"."Nombre"||"Tipos"."Nombre"||"Areas"."Nombre" ILIKE '%${busqueda}%' ORDER BY "${filtro}";`);
    res.send(rows)
}

export const añadirAlmacen = async (req,res)=>{
    const datos = req.body
    const {rows} = await pool.query(`INSERT INTO public."Almacen"(
	"Nombre", "Unidades", "CantidadPorUnidad", "Entrada", "Salida", "Perdida", "UltimaModificación", "Tipo", "Area") 
    VALUES ('${datos.nombre}', 0, 0, 0, 0, 0, Now(), ${datos.tipo}, '${datos.area}') RETURNING *;`);
    res.send(rows)
}

export const eliminarAlmacen = async(req,res)=>{
    const {id} = req.params
    const {rows} = await pool.query(`DELETE FROM almacen WHERE id = ${id} RETURNING *;`)
    res.send(rows)
}

export const editarAlmacen = async (req,res)=>{
    const {id} = req.params
    const {columna} = req.params
    const datos = req.body;
    const {rows} = await pool.query(`UPDATE public."Almacen" SET "${columna}" = ${datos.dato} WHERE id = ${id} RETURNING *;`)
    res.send(rows)
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