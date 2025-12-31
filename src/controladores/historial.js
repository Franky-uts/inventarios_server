import { pool } from '../db.js';

export const getHistorial = async (req, res) => {
    const { filtro } = req.params
    const { locacion } = req.params
    var tabla="Articulos"
    if(filtro=="Fecha"){
        tabla = "Historial_ESP"
    }
    const consulta = await pool.query(`SELECT 
        "Historial_ESP"."id", "Fecha", "Articulos"."Nombre", "Articulos"."Area", "Unidades", "Entradas", "Salidas", 
        "Perdidas", "PerdidaRazon", "PerdidaCantidad", "ModificacionHoras", "ModificacionUsuario"
	    FROM public."Historial_ESP" INNER JOIN "Articulos" on "Historial_ESP"."idProducto" = "Articulos"."id" 
        Where "Historial_ESP"."id" ILike '%${locacion}%' order by "${tabla}"."${filtro}";`);
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
    if(filtro=="fecha"){
        tabla = "Historial_ESP"
    }
    const consulta = await pool.query(`SELECT 
        "Historial_ESP"."id", "Fecha", "Articulos"."Nombre", "Articulos"."Area", "Unidades", "Entradas", "Salidas", 
        "Perdidas", "PerdidaRazon", "PerdidaCantidad", "ModificacionHoras", "ModificacionUsuario"
	    FROM public."Historial_ESP" INNER JOIN "Articulos" on "Historial_ESP"."idProducto" = "Articulos"."id" 
        Where "Historial_ESP"."id" ILike '%${locacion}%' and
        ("Historial_ESP"."Fecha" ILike '%${busqueda}%' or
        "Articulos"."Nombre"||"Articulos"."Area" ILike '%${busqueda}%') 
        order by "${tabla}"."${filtro}";`);
    if (consulta.rowCount > 0) {
        res.send(consulta.rows)
    } else {
        res.status(409).send('No hay cambios registrados.')
    }
}