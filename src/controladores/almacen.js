import { pool } from '../db.js';

export const getAlmacen = async (req, res) => {
    const { filtro } = req.params
    const { locacion } = req.params
    const consulta = await pool.query(`SELECT 
        "Almacen".id, "Articulos"."Nombre", "Articulos"."Area", "Articulos"."Tipo", "Articulos"."CodigoBarras", 
        "Articulos"."CantidadPorUnidad", "Unidades", "LimiteProd", "Entradas", "Salidas", 
        "PerdidaCantidad", "PerdidaRazon", "UltimoUsuario", "UltimaModificación" 
        FROM public."Almacen" INNER JOIN "Articulos" on "Almacen"."idProducto" = "Articulos"."id" where "inventarioNom" = '${locacion}' 
        order by "${filtro}";`);
    if (consulta.rowCount > 0) {
        res.send(consulta.rows)
    } else {
        res.status(409).send('No hay productos registrados.')
    }
}

export const getAlmacenBusqueda = async (req, res) => {
    const { filtro } = req.params
    const { locacion } = req.params
    const { busqueda } = req.params
    const consulta = await pool.query(`SELECT 
        "Almacen".id, "Articulos"."Nombre", "Articulos"."Area", "Articulos"."Tipo", "Articulos"."CodigoBarras", 
        "Articulos"."CantidadPorUnidad", "Unidades", "LimiteProd", "Entradas", "Salidas", 
        "PerdidaCantidad", "PerdidaRazon", "UltimoUsuario", "UltimaModificación" 
        FROM public."Almacen" INNER JOIN "Articulos" on "Almacen"."idProducto" = "Articulos"."id" where "inventarioNom" = '${locacion}' 
        and "Articulos"."Nombre"||"Articulos"."Tipo"||"Articulos"."Area" Ilike '%${busqueda}%' order by "${filtro}";`);
    if (consulta.rowCount > 0) {
        res.send(consulta.rows)
    } else {
        res.status(409).send('No hay coincidencias.')
    }
}

export const getAlmacenProd = async (req, res) => {
    const { filtro } = req.params
    const { locacion } = req.params
    const consulta = await pool.query(`SELECT 
        "Almacen".id, "Articulos"."Nombre", "Articulos"."Area", "Articulos"."Tipo", "Articulos"."CodigoBarras", 
        "Articulos"."CantidadPorUnidad", "Unidades", "LimiteProd", "Entradas", "Salidas", 
        "PerdidaCantidad", "PerdidaRazon", "UltimoUsuario", "UltimaModificación" 
        FROM public."Almacen" INNER JOIN "Articulos" on "Almacen"."idProducto" = "Articulos"."id" where "inventarioNom" = 'Cedis' and "Articulos"."MateriaPrima"='True'
        order by "${filtro}";`);
    if (consulta.rowCount > 0) {
        res.send(consulta.rows)
    } else {
        res.status(409).send('No hay productos registrados.')
    }
}

export const getAlmacenBusquedaProd = async (req, res) => {
    const { filtro } = req.params
    const { locacion } = req.params
    const { busqueda } = req.params
    const consulta = await pool.query(`SELECT 
        "Almacen".id, "Articulos"."Nombre", "Articulos"."Area", "Articulos"."Tipo", "Articulos"."CodigoBarras", 
        "Articulos"."CantidadPorUnidad", "Unidades", "LimiteProd", "Entradas", "Salidas", 
        "PerdidaCantidad", "PerdidaRazon", "UltimoUsuario", "UltimaModificación" 
        FROM public."Almacen" INNER JOIN "Articulos" on "Almacen"."idProducto" = "Articulos"."id" where "inventarioNom" = 'Cedis' and "Articulos"."MateriaPrima"='True' 
        and "Articulos"."Nombre"||"Articulos"."Tipo"||"Articulos"."Area" Ilike '%${busqueda}%' order by "${filtro}";`);
    if (consulta.rowCount > 0) {
        res.send(consulta.rows)
    } else {
        res.status(409).send('No hay coincidencias.')
    }
}

export const añadirAlmacen = async (req, res) => {
    const datos = req.body
    const fecha = new Date(Date.now());
    const fechaTexto = `${fecha.getDate()}-${fecha.getMonth() + 1}-${fecha.getFullYear()} ${fecha.getHours()}:${fecha.getMinutes()}:${fecha.getSeconds()}`
    const consulta = await pool.query(`Select "id" from public."Almacen" WHERE "id" = '${datos.id}';`)
    if (consulta.rowCount < 1) {
        const { rows } = await pool.query(`INSERT INTO public."Almacen" 
        (id, "idProducto", "inventarioNom", "Unidades", "LimiteProd", "Entradas", "Salidas", "PerdidaCantidad", "PerdidaRazon", "UltimoUsuario", "UltimaModificación")  
        VALUES ('${datos.id}', ${datos.idProducto}, '${datos.locacion}', 0, ${datos.limite}, 0, 0, '{}', '{}', '${datos.usuario}', '${fechaTexto}') 
        RETURNING *;`);
        res.send(rows)
    } else {
        res.status(409).send('Error: El producto ya esta en tu inventario')
    }
}

export const eliminarAlmacen = async (req, res) => {
    const { id } = req.params
    const consulta = await pool.query(`Select "id" from public."Almacen" WHERE "id" = '${id}';`)
    if (consulta.rowCount > 0) {
        const { rows } = await pool.query(`DELETE FROM public."Almacen" WHERE id = ${id} RETURNING *;`)
        res.send(rows)
    } else {
        res.status(409).send('Error: El artículo no existe')
    }
}

export const editarAlmacen = async (req, res) => {
    const { id } = req.params
    const consulta = await pool.query(`Select "id" from public."Almacen" WHERE "id" = '${id}';`)
    if (consulta.rowCount > 0) {
        const { columna } = req.params
        const datos = req.body;
        const fecha = new Date(Date.now());
        const fechaTexto = `${fecha.getDate()}-${fecha.getMonth() + 1}-${fecha.getFullYear()} ${fecha.getHours()}:${fecha.getMinutes()}:${fecha.getSeconds()}`
        const { rows } = await pool.query(`UPDATE public."Almacen" SET "${columna}" = '${datos.dato}', 
            "UltimaModificación" = '${fechaTexto}', "UltimoUsuario" = '${datos.usuario}' WHERE id = '${id}' RETURNING *;`)
        res.send(rows)
    } else {
        res.status(409).send('Error: El artículo no existe')
    }
}

export const editarAlmacenESP = async (req, res) => {
    const { id } = req.params
    const consulta = await pool.query(`Select "id" from public."Almacen" WHERE "id" = '${id}';`)
    if (consulta.rowCount > 0) {
        const datos = req.body;
        const fecha = new Date(Date.now());
        const fechaTexto = `${fecha.getDate()}-${fecha.getMonth() + 1}-${fecha.getFullYear()}`
        const fechaHora = `${fecha.getHours()}:${fecha.getMinutes()}:${fecha.getSeconds()}`
        const historial = await pool.query(`Select * from public."Historial_ESP" WHERE "id" = '${id} ${fechaTexto}';`);
        if (historial.rowCount > 0) {
            const datosHistorial = historial.rows[0]
            datosHistorial.Unidades.push(datos.unidades)
            datosHistorial.Entradas.push(datos.entradas)
            datosHistorial.Salidas.push(datos.salidas)
            datosHistorial.Perdidas.push(datos.perdidas)
            datosHistorial.ModificacionHoras.push(fechaHora)
            datosHistorial.ModificacionUsuario.push(datos.usuario)
            await pool.query(`UPDATE public."Historial_ESP" SET 
                "Unidades"='{${datosHistorial.Unidades}}', "Entradas"='{${datosHistorial.Entradas}}', "Salidas"='{${datosHistorial.Salidas}}', 
                "Perdidas"='{${datosHistorial.Perdidas}}', "PerdidaRazon"='${datos.razones}', "PerdidaCantidad"='${datos.cantidades}', 
                "ModificacionHoras"='{${datosHistorial.ModificacionHoras}}', "ModificacionUsuario"='{${datosHistorial.ModificacionUsuario}}'
                WHERE id = '${id} ${fechaTexto}';`)
        } else {
            await pool.query(`INSERT INTO public."Historial_ESP"
                (id, "idProducto", "Fecha", "Unidades", "Entradas", "Salidas", "Perdidas", 
                "PerdidaRazon", "PerdidaCantidad", "ModificacionHoras", "ModificacionUsuario") VALUES
                ('${id} ${fechaTexto}','${id.substring(0, id.length - 3)}', '${fechaTexto}', '{${datos.unidades}}', 
                '{${datos.entradas}}', '{${datos.salidas}}', '{${datos.perdidas}}','${datos.razones}', '${datos.cantidades}', 
                '{${fechaHora}}', '{${datos.usuario}}');`)
        }
        const { rows } = await pool.query(`UPDATE public."Almacen" SET 
            "Entradas" = '${datos.entradas}', "Salidas" = '${datos.salidas}', "PerdidaCantidad" = '${datos.cantidades}', "PerdidaRazon" = '${datos.razones}', 
            "Unidades" = '${datos.unidades}', "UltimaModificación" = '${fechaTexto} ${fechaHora}', "UltimoUsuario" = '${datos.usuario}' WHERE id = '${id}' RETURNING *;`)
        res.send(rows)
    } else {
        res.status(409).send('Error: El artículo no existe')
    }
}

export const reiniciarMovimientos = async (req, res) => {
    const { locacion } = req.params
    const consulta = await pool.query(`UPDATE public."Almacen"
	SET "Entradas"=0, "Salidas"=0, "PerdidaCantidad"='{}', "PerdidaRazon"='{}' Where "inventarioNom" = '${locacion}' RETURNING *;`)
    if (consulta.rowCount > 0) {
        res.send(consulta.rows)
    } else {
        res.status(409).send('Error: No hubo cambios')
    }
}

/*export const añadirAlmacen = async (req,res)=>{
    for (let i = 0; i < datos.length; i++) {
        const consulta = await pool.query(`INSERT INTO public."${locacion}"(
    "Nombre", "Unidades", "CantidadPorUnidad", "Entrada", "Salida", 
    "Perdida", "UltimaModificación", "Tipo", "Area", "UltimoUsuario") 
    VALUES ('${datos[i].Nombre}', 0, ${datos[i].CantidadPorUnidad}, 0, 0, 0, '${fechaTexto}', '${datos[i].Tipo}', 
    '${datos[i].Area}', '${datos[i].UltimoUsuario}') RETURNING *;`);
        if (consulta.rowCount > 0) {
            lista[i] = consulta.rows
        } else {
            lista[i] = "Contenido invalido"
        }
    }
    res.send(lista)
}*/