import {pool} from '../db.js'

export const getAlmacen = async (req,res)=>{
    const {filtro} = req.params
    const {rows} = await pool.query(`SELECT "id", "Nombre", "Tipo",
        "Unidades", "CantidadPorUnidad", "Area", "Entrada", 
		"Salida", "Perdida", "UltimaModificación", "UltimoUsuario"
        FROM public."Almacen"
        ORDER BY "${filtro}";`);
    res.send(rows)
}

export const getAlmacenBusqueda = async (req,res)=>{
    const {filtro} = req.params
    const {busqueda} = req.params
    const {rows} = await pool.query(`SELECT "id", "Nombre", "Tipo",
        "Unidades", "CantidadPorUnidad", "Area", "Entrada", 
		"Salida", "Perdida", "UltimaModificación", "UltimoUsuario"
        FROM public."Almacen"
        WHERE "Nombre"||"Tipo"||"Area" ILIKE '%${busqueda}%' ORDER BY "${filtro}";`);
    res.send(rows)
}

export const añadirAlmacen = async (req,res)=>{
    const datos = req.body
    const fecha = new Date(Date.now());
    const fechaTexto = fecha.toLocaleDateString()+" "+fecha.getHours()+":"+fecha.getMinutes()+":"+fecha.getSeconds()
    const {rows} = await pool.query(`INSERT INTO public."Almacen"(
	"Nombre", "Unidades", "CantidadPorUnidad", "Entrada", "Salida", 
    "Perdida", "UltimaModificación", "Tipo", "Area", "UltimoUsuario") 
    VALUES ('${datos.nombre}', 0, ${datos.cantidad}, 0, 0, 0, ${fechaTexto}, '${datos.tipo}', 
    '${datos.area}', '${datos.usuario}') RETURNING *;`);
    res.send(rows)
}

export const eliminarAlmacen = async(req,res)=>{
    const {id} = req.params
    const consulta = await pool.query(`Select "id" from public."Almacen" WHERE "id" = '${id}';`)
    if(consulta.rowCount>0){
        const {rows} = await pool.query(`DELETE FROM public."Almacen" WHERE id = ${id} RETURNING *;`)
        res.send(rows)
    }else{
        res.status(409).send('El artículo no existe')
    }
}

export const editarAlmacen = async (req,res)=>{
    const {id} = req.params
    const consulta = await pool.query(`Select "id" from public."Almacen" WHERE "id" = '${id}';`)
    if(consulta.rowCount>0){
        const {columna} = req.params
        const datos = req.body;
        const fecha = new Date(Date.now());
        const fechaTexto = fecha.toLocaleDateString()+" "+fecha.getHours()+":"+fecha.getMinutes()+":"+fecha.getSeconds()
        const {rows} = await pool.query(`UPDATE public."Almacen" SET "${columna}" = ${datos.dato}, 
            "UltimaModificación" = '${fechaTexto}', "UltimoUsuario" = '${datos.usuario}' WHERE id = ${id} RETURNING *;`)
        res.send(rows)
    }else{
        res.status(409).send('El artículo no existe')
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