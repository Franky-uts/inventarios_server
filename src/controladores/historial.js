import { pool } from '../db.js';

export const getHistorialInfo = async (req, res) => {
    const { locacion } = req.params
    const { id } = req.params
    const { fecha } = req.params
    const consulta = await pool.query(`SELECT 
        "Historial_ESP"."idProducto", to_char("Fecha",'DD-MM-YYYY') as "Fecha", "Articulos"."Nombre", "Articulos"."Area", 
        array_length("ModificacionHoras", 1) as "Movimientos","Unidades", "Entradas", "Salidas", 
        "Perdidas", "PerdidaRazon", "PerdidaCantidad", "ModificacionHoras", "ModificacionUsuario" 
	    FROM public."Historial_ESP" INNER JOIN "Articulos" on "Historial_ESP"."idProducto" = "Articulos"."id" 
        Where "Historial_ESP"."Almacen" = '${locacion}' And "Historial_ESP"."idProducto" = '${id}' And "Historial_ESP"."Fecha" = '${fecha}';`);
    if (consulta.rowCount > 0) {
        res.send(consulta.rows)
    } else {
        res.status(409).send('El registro no existe.')
    }
}

export const getHistorial = async (req, res) => {
    const { filtro } = req.params
    const { locacion } = req.params
    var tabla="Articulos"
    if(filtro=="Fecha"){
        tabla = "Historial_ESP"
    }
    const consulta = await pool.query(`SELECT 
        "Historial_ESP"."idProducto", to_char("Fecha",'DD-MM-YYYY') as "Fecha", "Articulos"."Nombre", "Articulos"."Area", 
        array_length("ModificacionHoras", 1) as "Movimientos", "Unidades", "Entradas", "Salidas", 
        "Perdidas", "PerdidaRazon", "PerdidaCantidad", "ModificacionHoras", "ModificacionUsuario" 
	    FROM public."Historial_ESP" INNER JOIN "Articulos" on "Historial_ESP"."idProducto" = "Articulos"."id" 
        Where "Historial_ESP"."Almacen" = '${locacion}'
        order by "${tabla}"."${filtro}";`);
    if (consulta.rowCount > 0) {
        res.send(consulta.rows)
    } else {
        res.status(409).send('No hay cambios registrados.')
    }
}

export const getHistorialBusqueda = async (req, res) => {
    const { filtro } = req.params
    const { locacion } = req.params
    const { busqueda } = req.params
    var tabla="Articulos"
    if(filtro=="Fecha"){
        tabla = "Historial_ESP"
    }
    const consulta = await pool.query(`SELECT 
        "Historial_ESP"."idProducto", to_char("Fecha",'DD-MM-YYYY') as "Fecha", "Articulos"."Nombre", "Articulos"."Area", 
        array_length("ModificacionHoras", 1) as "Movimientos", "Unidades", "Entradas", "Salidas", 
        "Perdidas", "PerdidaRazon", "PerdidaCantidad", "ModificacionHoras", "ModificacionUsuario" 
	    FROM public."Historial_ESP" INNER JOIN "Articulos" on "Historial_ESP"."idProducto" = "Articulos"."id" 
        Where "Historial_ESP"."Almacen" = '${locacion}' and 
        ("Articulos"."Nombre"||"Articulos"."Area" ILike '%${busqueda}%') 
        order by "${tabla}"."${filtro}";`);
    if (consulta.rowCount > 0) {
        res.send(consulta.rows)
    } else {
        res.status(409).send('No hay cambios registrados.')
    }
}

export const getHistorialRango = async (req, res) => {
    const { filtro } = req.params
    const { locacion } = req.params
    const { fechaInicial } = req.params
    const { fechaFinal } = req.params
    var tabla="Articulos"
    if(filtro=="Fecha"){
        tabla = "Historial_ESP"
    }
    const consulta = await pool.query(`SELECT 
        "Historial_ESP"."idProducto", to_char("Fecha",'DD-MM-YYYY') as "Fecha", "Articulos"."Nombre", "Articulos"."Area", 
        array_length("ModificacionHoras", 1) as "Movimientos", "Unidades", "Entradas", "Salidas", 
        "Perdidas", "PerdidaRazon", "PerdidaCantidad", "ModificacionHoras", "ModificacionUsuario" 
	    FROM public."Historial_ESP" INNER JOIN "Articulos" on "Historial_ESP"."idProducto" = "Articulos"."id" 
        Where "Historial_ESP"."Almacen" = '${locacion}' And 
        ("Fecha" >= '${fechaInicial}' And "Fecha" <= '${fechaFinal}')
        order by "${tabla}"."${filtro}";`);
    if (consulta.rowCount > 0) {
        res.send(consulta.rows)
    } else {
        res.status(409).send('No hay cambios registrados.')
    }
}

export const getHistorialRangoBusqueda = async (req, res) => {
    const { filtro } = req.params
    const { locacion } = req.params
    const { busqueda } = req.params
    const { fechaInicial } = req.params
    const { fechaFinal } = req.params
    var tabla="Articulos"
    if(filtro=="Fecha"){
        tabla = "Historial_ESP"
    }
    const consulta = await pool.query(`SELECT 
        "Historial_ESP"."idProducto", to_char("Fecha",'DD-MM-YYYY') as "Fecha", "Articulos"."Nombre", "Articulos"."Area", 
        array_length("ModificacionHoras", 1) as "Movimientos", "Unidades", "Entradas", "Salidas", 
        "Perdidas", "PerdidaRazon", "PerdidaCantidad", "ModificacionHoras", "ModificacionUsuario" 
	    FROM public."Historial_ESP" INNER JOIN "Articulos" on "Historial_ESP"."idProducto" = "Articulos"."id" 
        Where "Historial_ESP"."Almacen" = '${locacion}' and 
        ("Articulos"."Nombre"||"Articulos"."Area" ILike '%${busqueda}%') And 
        ("Fecha" >= '${fechaInicial}' And "Fecha" <= '${fechaFinal}')
        order by "${tabla}"."${filtro}";`);
    if (consulta.rowCount > 0) {
        res.send(consulta.rows)
    } else {
        res.status(409).send('No hay cambios registrados.')
    }
}
