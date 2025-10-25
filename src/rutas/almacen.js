import { Router } from 'express';
import { añadirAlmacen, editarAlmacen, eliminarAlmacen, getAlmacen, getAlmacenBusqueda, reiniciarMovimientos } from '../controladores/almacen.js';
const rutas = Router();

rutas.get('/:locacion/:filtro', getAlmacen)

rutas.get('/:locacion/:filtro/:busqueda', getAlmacenBusqueda)

rutas.post('/:locacion', añadirAlmacen)

rutas.delete('/:locacion/:id', eliminarAlmacen)

rutas.put('/:locacion/:id/:columna', editarAlmacen)

rutas.put('/:locacion/reiniciarMovimientos', reiniciarMovimientos)

export default rutas