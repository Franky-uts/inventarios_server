import { Router } from 'express';
import { añadirAlmacen, editarAlmacen, eliminarAlmacen, getAlmacen, getAlmacenBusqueda, reiniciarMovimientos } from '../controladores/almacen.js';
const rutas = Router();

rutas.get('/:filtro/:locacion', getAlmacen)

rutas.get('/:filtro/:locacion/:busqueda', getAlmacenBusqueda)

rutas.post('/:locacion', añadirAlmacen)

rutas.delete('/:id/:locacion', eliminarAlmacen)

rutas.put('/:id/:locacion/:columna', editarAlmacen)

rutas.put('/reiniciarMovimientos/:locacion', reiniciarMovimientos)

export default rutas