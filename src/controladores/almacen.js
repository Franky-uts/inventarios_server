import { pool } from '../db.js';
import { fecha } from '../db.js';

/*export const getLenght = async (req, res) => {
    const { locacion } = req.params
    const consulta = await pool.query(`Select * From "getAlmacenLastId"('${locacion}')";`);
    res.header('Access-Control-Allow-Origin', '*')
    if (consulta.rowCount > 0) {
        res.send(consulta.rows)
    } else {
        res.status(409).send('No hay productos registrados.')
    }
}*/

export const getAlmacen = async (req, res) => {
    const { filtro } = req.params
    const { locacion } = req.params
    const consulta = await pool.query(`Select * From "getAlmacen"('${locacion}','') Order By "${filtro}", "Nombre";`);
    res.header('Access-Control-Allow-Origin', '*')
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
    const consulta = await pool.query(`Select * From "getAlmacen"('${locacion}','${busqueda}') Order By "${filtro}";`);
    res.header('Access-Control-Allow-Origin', '*')
    if (consulta.rowCount > 0) {
        res.send(consulta.rows)
    } else {
        res.status(409).send('No hay coincidencias.')
    }
}

export const getAlmacenProd = async (req, res) => {
    const { filtro } = req.params
    const consulta = await pool.query(`Select * From "getAlmacenProd"('') Order By "${filtro}";`);
    res.header('Access-Control-Allow-Origin', '*')
    if (consulta.rowCount > 0) {
        res.send(consulta.rows)
    } else {
        res.status(409).send('No hay productos registrados.')
    }
}

export const getAlmacenBusquedaProd = async (req, res) => {
    const { filtro } = req.params
    const { busqueda } = req.params
    const consulta = await pool.query(`Select * From "getAlmacenProd"('${busqueda}') Order By "${filtro}";`);
    res.header('Access-Control-Allow-Origin', '*')
    if (consulta.rowCount > 0) {
        res.send(consulta.rows)
    } else {
        res.status(409).send('No hay coincidencias.')
    }
}

export const getAlmacenProducto = async (req, res) => {
    const { id } = req.params
    const { locacion } = req.params
    const consulta = await pool.query(`Select * From "getAlmacenProducto"(${id},'${locacion}');`);
    res.header('Access-Control-Allow-Origin', '*')
    if (consulta.rowCount > 0) {
        res.send(consulta.rows)
    } else {
        res.status(409).send('Error: El producto no existe.')
    }
}

export const añadirAlmacen = async (req, res) => {
    const datos = req.body
    const fechaTexto = fecha()
    const consulta = await pool.query(`Select * From "addAlmacen"(${datos.id}, ${datos.limite}, '${datos.usuario}', '${fechaTexto.dia} ${fechaTexto.hora}');`);
    var code = 409
    var mensaje = 'Error: No se pudo conectar con la base de datos.'
    res.header('Access-Control-Allow-Origin', '*')
    if (consulta.rowCount > 0) {
        const respuesta = consulta.rows[0];
        code = respuesta.Código
        mensaje = respuesta.Mensaje
    }
    res.status(code).send(mensaje)
}

export const eliminarAlmacen = async (req, res) => {
    const { id } = req.params
    const { locacion } = req.params
    const consulta = await pool.query(`Select * From "delAlmacen"(${id},'${locacion}');`);
    var code = 409
    var mensaje = 'Error: No se pudo conectar con la base de datos.'
    res.header('Access-Control-Allow-Origin', '*')
    if (consulta.rowCount > 0) {
        const respuesta = consulta.rows[0];
        code = respuesta.Código
        mensaje = respuesta.Mensaje
    }
    res.status(code).send(mensaje)
}

export const editarAlmacen = async (req, res) => {
    const { id } = req.params
    const { columna } = req.params
    const fechaTexto = fecha()
    const datos = req.body
    const consulta = await pool.query(`Select * From "updAlmacen"(${id},'${datos.usuario}','${columna}','${datos.dato}','${fechaTexto.dia} ${fechaTexto.hora}');`)
    var code = 409
    var mensaje = 'Error: No se pudo conectar con la base de datos.'
    res.header('Access-Control-Allow-Origin', '*')
    if (consulta.rowCount > 0) {
        const respuesta = consulta.rows[0];
        code = respuesta.Código
        mensaje = respuesta.Mensaje
    }
    res.status(code).send(mensaje)
}

export const editarAlmacenES = async (req, res) => {
    const { id } = req.params
    const fechaTexto = fecha();
    const datos = req.body
    const consulta = await pool.query(`Select * From "updESAlmacen"(${id}, '${datos.usuario}', ${datos.entradas}, ${datos.entradasPaquete}, ${datos.entradasContenedor}, ${datos.salidas}, ${datos.salidasPaquete}, ${datos.salidasContenedor}, '${fechaTexto.dia}', '${fechaTexto.hora}');`)
    var code = 409
    var mensaje = 'Error: No se pudo conectar con la base de datos.'
    res.header('Access-Control-Allow-Origin', '*')
    if (consulta.rowCount > 0) {
        const respuesta = consulta.rows[0];
        code = respuesta.Código
        mensaje = respuesta.Mensaje
    }
    res.status(code).send(mensaje)
}

export const editarAlmacenMultipleES = async (req, res) => {
    const fechaTexto = fecha();
    const datos = req.body
    //console.log(`Select * From "updMultipleESAlmacen" (array[${datos.productos}], array[${datos.entradas}], array[${datos.entradasPaquete}], array[${datos.salidas}], array[${datos.salidasPaquete}], '${datos.usuario}', '${fechaTexto.dia}', '${fechaTexto.hora}');`)
    const consulta = await pool.query(`Select * From "updMultipleESAlmacen" (array[${datos.productos}], array[${datos.entradas}], array[${datos.entradasPaquete}], array[${datos.entradasContenedor}], array[${datos.salidas}], array[${datos.salidasPaquete}], array[${datos.salidasContenedor}], '${datos.usuario}', '${fechaTexto.dia}', '${fechaTexto.hora}');`)
    var code = 409
    var mensaje = 'Error: No se pudo conectar con la base de datos.'
    res.header('Access-Control-Allow-Origin', '*')
    if (consulta.rowCount > 0) {
        const respuesta = consulta.rows[0];
        code = respuesta.Código
        mensaje = respuesta.Mensaje
    }
    res.status(code).send(mensaje)
}

export const editarAlmacenPerdidas = async (req, res) => {
    const { id } = req.params
    const fechaTexto = fecha();
    const datos = req.body
    const consulta = await pool.query(`Select * From "updPerdidasAlmacen"(${id},'${datos.usuario}','${datos.razon}','${datos.cantidad}','${fechaTexto.dia}', '${fechaTexto.hora}');`)
    var code = 409
    var mensaje = 'Error: No se pudo conectar con la base de datos.'
    res.header('Access-Control-Allow-Origin', '*')
    if (consulta.rowCount > 0) {
        const respuesta = consulta.rows[0];
        code = respuesta.Código
        mensaje = respuesta.Mensaje
    }
    res.status(code).send(mensaje)
}

export const reiniciarMovimientos = async (req, res) => {
    const { locacion } = req.params
    const consulta = await pool.query(`Select * From "reiniciarMovimientos"('${locacion}');`)
    var code = 409
    var mensaje = 'Error: No se pudo conectar con la base de datos.'
    res.header('Access-Control-Allow-Origin', '*')
    if (consulta.rowCount > 0) {
        const respuesta = consulta.rows[0];
        code = respuesta.Código
        mensaje = respuesta.Mensaje
    }
    res.status(code).send(mensaje)
}