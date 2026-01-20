import { pool } from '../db.js';

export const getAlmacen = async (req, res) => {
    const { filtro } = req.params
    const { locacion } = req.params
    var tabla = "Articulos"
    if (filtro == "Unidades") {
        tabla = "Almacen"
    }
    const consulta = await pool.query(`SELECT 
        "Almacen"."idProducto" AS "id", "Articulos"."Nombre", "Articulos"."Area", "Articulos"."Tipo", "Articulos"."CodigoBarras", 
        "Articulos"."CantidadPorUnidad", "Unidades", "LimiteProd", "Entradas", "Salidas", 
        "PerdidaCantidad", "PerdidaRazon", "UltimoUsuario", "UltimaModificación" 
        FROM public."Almacen" INNER JOIN "Articulos" on "Almacen"."idProducto" = "Articulos".id WHERE "inventarioNom" = '${locacion}' 
        Order by "${tabla}"."${filtro}";`);
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
    var tabla = "Articulos"
    if (filtro == "Unidades") {
        tabla = "Almacen"
    }
    const consulta = await pool.query(`SELECT 
        "Almacen"."idProducto" AS "id", "Articulos"."Nombre", "Articulos"."Area", "Articulos"."Tipo", "Articulos"."CodigoBarras", 
        "Articulos"."CantidadPorUnidad", "Unidades", "LimiteProd", "Entradas", "Salidas", 
        "PerdidaCantidad", "PerdidaRazon", "UltimoUsuario", "UltimaModificación" 
        FROM public."Almacen" INNER JOIN "Articulos" on "Almacen"."idProducto" = "Articulos"."id" WHERE "inventarioNom" = '${locacion}' 
        and "Articulos"."Nombre"||"Articulos"."Tipo"||"Articulos"."Area" Ilike '%${busqueda}%' 
        Order by "${tabla}"."${filtro}";`);
    if (consulta.rowCount > 0) {
        res.send(consulta.rows)
    } else {
        res.status(409).send('No hay coincidencias.')
    }
}

export const getAlmacenProd = async (req, res) => {
    const { filtro } = req.params
    var tabla = "Articulos"
    if (filtro == "Unidades") {
        tabla = "Almacen"
    }
    const consulta = await pool.query(`SELECT 
        "Almacen"."idProducto" AS "id", "Articulos"."Nombre", "Articulos"."Area", "Articulos"."Tipo", "Articulos"."CodigoBarras", 
        "Articulos"."CantidadPorUnidad", "Unidades", "LimiteProd", "Entradas", "Salidas", 
        "PerdidaCantidad", "PerdidaRazon", "UltimoUsuario", "UltimaModificación" 
        FROM public."Almacen" INNER JOIN "Articulos" on "Almacen"."idProducto" = "Articulos"."id" 
        WHERE "inventarioNom" = 'Cedis' and "Articulos"."MateriaPrima"='True'
        Order by "${tabla}"."${filtro}";`);
    if (consulta.rowCount > 0) {
        res.send(consulta.rows)
    } else {
        res.status(409).send('No hay productos registrados.')
    }
}

export const getAlmacenBusquedaProd = async (req, res) => {
    const { filtro } = req.params
    const { busqueda } = req.params
    var tabla = "Articulos"
    if (filtro == "Unidades") {
        tabla = "Almacen"
    }
    const consulta = await pool.query(`SELECT 
        "Almacen"."idProducto" as "id", "Articulos"."Nombre", "Articulos"."Area", "Articulos"."Tipo", "Articulos"."CodigoBarras", 
        "Articulos"."CantidadPorUnidad", "Unidades", "LimiteProd", "Entradas", "Salidas", 
        "PerdidaCantidad", "PerdidaRazon", "UltimoUsuario", "UltimaModificación" 
        FROM public."Almacen" 
        INNER JOIN "Articulos" on "Almacen"."idProducto" = "Articulos"."id" 
        WHERE "inventarioNom" = 'Cedis' and "Articulos"."MateriaPrima"='True' 
        and "Articulos"."Nombre"||"Articulos"."Tipo"||"Articulos"."Area" Ilike '%${busqueda}%' 
        Order by "${tabla}"."${filtro}";`);
    if (consulta.rowCount > 0) {
        res.send(consulta.rows)
    } else {
        res.status(409).send('No hay coincidencias.')
    }
}

export const getAlmacenProducto = async (req, res) => {
    const { id } = req.params
    const { locacion } = req.params
    const consulta = await pool.query(`SELECT 
        "Almacen"."idProducto" AS id, "Articulos"."Nombre", "Articulos"."Area", "Articulos"."Tipo", "Articulos"."CodigoBarras", 
        "Articulos"."CantidadPorUnidad", "Unidades", "LimiteProd", "Entradas", "Salidas", 
        "PerdidaCantidad", "PerdidaRazon", "UltimoUsuario", "UltimaModificación" 
        FROM public."Almacen" INNER JOIN "Articulos" on "Almacen"."idProducto" = "Articulos"."id" 
        WHERE "Articulos"."id" = '${id}' AND "Almacen"."inventarioNom" = '${locacion}';`);
    if (consulta.rowCount > 0) {
        res.send(consulta.rows)
    } else {
        res.status(409).send('Error: el producto no existe.')
    }
}

export const añadirAlmacen = async (req, res) => {
    const datos = req.body
    const fecha = new Date(Date.now());
    const fechaTexto = `${fecha.getDate()}-${fecha.getMonth() + 1}-${fecha.getFullYear()} ${fecha.getHours()}:${fecha.getMinutes()}:${fecha.getSeconds()}`
    const existencia = await pool.query(`Select "id" from public."Articulos" WHERE "id" = '${datos.id}';`)
    if (existencia.rowCount > 0) {
        const consulta = await pool.query(`Select "idProducto" from public."Almacen" WHERE "idProducto" = '${datos.id}' AND "inventarioNom" = '${datos.locacion}';`)
        if (consulta.rowCount < 1) {
            const { rows } = await pool.query(`INSERT INTO public."Almacen" 
                ("idProducto", "inventarioNom", "Unidades", "LimiteProd", "Entradas", "Salidas", "PerdidaCantidad", "PerdidaRazon", "UltimoUsuario", "UltimaModificación")  
                VALUES (${datos.id}, '${datos.locacion}', 0, ${datos.limite}, 0, 0, '{}', '{}', '${datos.usuario}', '${fechaTexto}') 
                RETURNING *;`);
            res.send(rows)
        } else {
            res.status(409).send('Error: El producto ya esta en tu inventario')
        }
    } else {
        res.status(409).send('Error: el producto no existe.')
    }
}

export const eliminarAlmacen = async (req, res) => {
    const { id } = req.params
    const { locacion } = req.params
    const consulta = await pool.query(`Select "idProducto" from public."Almacen" WHERE "idProducto" = '${id}' AND "inventarioNom" = '${locacion}';`)
    if (consulta.rowCount > 0) {
        const { rows } = await pool.query(`DELETE FROM public."Almacen" WHERE "idProducto" = '${id}' AND "inventarioNom" = '${locacion}' RETURNING *;`)
        res.send(rows)
    } else {
        res.status(409).send('Error: El artículo no existe')
    }
}

export const editarAlmacen = async (req, res) => {
    const { id } = req.params
    const { locacion } = req.params
    const consulta = await pool.query(`Select "idProducto" from public."Almacen" WHERE "idProducto" = '${id}' AND "inventarioNom" = '${locacion}';`)
    if (consulta.rowCount > 0) {
        const { columna } = req.params
        const datos = req.body;
        const fecha = new Date(Date.now());
        const fechaTexto = `${fecha.getDate()}-${fecha.getMonth() + 1}-${fecha.getFullYear()} ${fecha.getHours()}:${fecha.getMinutes()}:${fecha.getSeconds()}`
        const { rows } = await pool.query(`UPDATE public."Almacen" SET "${columna}" = '${datos.dato}', 
            "UltimaModificación" = '${fechaTexto}', "UltimoUsuario" = '${datos.usuario}' 
            WHERE "idProducto" = '${id}' AND "inventarioNom" = '${locacion}' RETURNING *;`)
        res.send(rows)
    } else {
        res.status(409).send('Error: El artículo no existe')
    }
}

export const editarAlmacenES = async (req, res) => {
    const { id } = req.params
    const { locacion } = req.params
    const consulta = await pool.query(`Select "Unidades", "Entradas", "Salidas", "PerdidaCantidad", "PerdidaRazon" 
        FROM public."Almacen" WHERE "idProducto" = '${id}' AND "inventarioNom" = '${locacion}';`)
    if (consulta.rowCount > 0) {
        const producto = consulta.rows[0]
        const datos = req.body;
        const fecha = new Date(Date.now());
        const fechaTexto = `${fecha.getDate()}-${fecha.getMonth() + 1}-${fecha.getFullYear()}`
        const fechaHora = `${fecha.getHours()}:${fecha.getMinutes()}:${fecha.getSeconds()}`
        const historial = await pool.query(`Select * from public."Historial_ESP" WHERE "id" = '${id} ${fechaTexto}';`);
        const unidades = producto.Unidades + datos.entradas - datos.salidas
        const entradas = producto.Entradas + datos.entradas
        const salidas = producto.Salidas + datos.salidas
        if (historial.rowCount > 0) {
            const datosHistorial = historial.rows[0]
            datosHistorial.Unidades.push(unidades)
            datosHistorial.Entradas.push(entradas)
            datosHistorial.Salidas.push(salidas)
            datosHistorial.Perdidas.push(producto.PerdidaCantidad.length)
            datosHistorial.ModificacionHoras.push(fechaHora)
            datosHistorial.ModificacionUsuario.push(datos.usuario)
            await pool.query(`UPDATE public."Historial_ESP" SET 
                "Unidades"='{${datosHistorial.Unidades}}', "Entradas"='{${datosHistorial.Entradas}}', 
                "Salidas"='{${datosHistorial.Salidas}}', "Perdidas"='{${datosHistorial.Perdidas}}', 
                "ModificacionHoras"='{${datosHistorial.ModificacionHoras}}', "ModificacionUsuario"='{${datosHistorial.ModificacionUsuario}}'
                WHERE id = '${id} ${fechaTexto}';`)
        } else {
            await pool.query(`INSERT INTO public."Historial_ESP"
                (id, "idProducto", "Fecha", "Unidades", "Entradas", "Salidas", "Perdidas", 
                "PerdidaRazon", "PerdidaCantidad", "ModificacionHoras", "ModificacionUsuario", "Almacen") VALUES
                ('${id} ${fechaTexto}','${id}', '${fechaTexto}', '{${unidades}}', 
                '{${entradas}}', '{${salidas}}', '{${producto.PerdidaCantidad.length}}',
                '{${producto.PerdidaRazon}}', '{${producto.PerdidaCantidad}}', '{${fechaHora}}', '{${datos.usuario}}', '${datos.almacen}');`)
        }
        const { rows } = await pool.query(`UPDATE public."Almacen" SET 
            "Entradas" = '${entradas}', "Salidas" = '${salidas}', "Unidades" = '${unidades}', 
            "UltimaModificación" = '${fechaTexto} ${fechaHora}', "UltimoUsuario" = '${datos.usuario}' 
            WHERE "idProducto" = '${id}' AND "inventarioNom" = '${locacion}' RETURNING *;`)
        res.send(rows)
    } else {
        res.status(409).send('Error: El artículo no existe')
    }
}

export const editarAlmacenPerdidas = async (req, res) => {
    const { id } = req.params
    const { locacion } = req.params
    const consulta = await pool.query(`Select "Almacen"."idProducto", "Almacen"."Unidades", "Almacen"."Entradas", 
        "Almacen"."Salidas", "Almacen"."PerdidaRazon", "Almacen"."PerdidaCantidad", "Articulos"."CantidadPorUnidad" 
        from public."Almacen" INNER JOIN "Articulos" on "Almacen"."idProducto" = "Articulos"."id" 
        WHERE "idProducto" = '${id}' AND "inventarioNom" = '${locacion}';`)
    if (consulta.rowCount > 0) {
        const producto = consulta.rows[0]
        const datos = req.body;
        const fecha = new Date(Date.now());
        const fechaTexto = `${fecha.getDate()}-${fecha.getMonth() + 1}-${fecha.getFullYear()}`
        const fechaHora = `${fecha.getHours()}:${fecha.getMinutes()}:${fecha.getSeconds()}`
        const historial = await pool.query(`Select * from public."Historial_ESP" WHERE "id" = '${id} ${fechaTexto}';`);
        const unidades = producto.Unidades - datos.cantidad / producto.CantidadPorUnidad
        producto.PerdidaCantidad.push(datos.cantidad)
        const cantidades = producto.PerdidaCantidad
        producto.PerdidaRazon.push(datos.razon)
        const razones = producto.PerdidaRazon
        const perdidas = cantidades.length
        if (historial.rowCount > 0) {
            const datosHistorial = historial.rows[0]
            datosHistorial.Unidades.push(unidades)
            datosHistorial.Entradas.push(producto.Entradas)
            datosHistorial.Salidas.push(producto.Salidas)
            datosHistorial.Perdidas.push(perdidas)
            datosHistorial.ModificacionHoras.push(fechaHora)
            datosHistorial.ModificacionUsuario.push(datos.usuario)
            await pool.query(`UPDATE public."Historial_ESP" SET 
                "Unidades"='{${datosHistorial.Unidades}}', "Entradas"='{${datosHistorial.Entradas}}', "Salidas"='{${datosHistorial.Salidas}}', 
                "Perdidas"='{${datosHistorial.Perdidas}}', "PerdidaRazon"='{${razones}}', "PerdidaCantidad"='{${cantidades}}', 
                "ModificacionHoras"='{${datosHistorial.ModificacionHoras}}', "ModificacionUsuario"='{${datosHistorial.ModificacionUsuario}}'
                WHERE id = '${id} ${fechaTexto}';`)
        } else {
            await pool.query(`INSERT INTO public."Historial_ESP"
                (id, "idProducto", "Fecha", "Unidades", "Entradas", "Salidas", "Perdidas", 
                "PerdidaRazon", "PerdidaCantidad", "ModificacionHoras", "ModificacionUsuario", "Almacen") VALUES
                ('${id} ${fechaTexto}','${id}', '${fechaTexto}', '{${unidades}}', 
                '{${producto.Entradas}}', '{${producto.Salidas}}', '{${perdidas}}','{${razones}}', '{${cantidades}}', 
                '{${fechaHora}}', '{${datos.usuario}}', '${datos.almacen}');`)
        }
        const { rows } = await pool.query(`UPDATE public."Almacen" SET 
            "PerdidaCantidad" = '{${cantidades}}', "PerdidaRazon" = '{${razones}}', "Unidades" = '${unidades}', 
            "UltimaModificación" = '${fechaTexto} ${fechaHora}', "UltimoUsuario" = '${datos.usuario}' 
            WHERE "idProducto" = '${id}' AND "inventarioNom" = '${locacion}' RETURNING *;`)
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