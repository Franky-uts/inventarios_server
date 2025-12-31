import { Router } from 'express';
import { añadirAlmacen, editarAlmacen, editarAlmacenESP, eliminarAlmacen, getAlmacen, getAlmacenBusqueda, reiniciarMovimientos } from '../controladores/almacen.js';
const rutas = Router();

rutas.get('/:locacion/:filtro', getAlmacen)

rutas.get('/:locacion/:filtro/:busqueda', getAlmacenBusqueda)

rutas.post('/', añadirAlmacen)

rutas.delete('/:id', eliminarAlmacen)

rutas.put('/:locacion/reiniciarMovimientos', reiniciarMovimientos)

rutas.put('/:id/ESP', editarAlmacenESP)

rutas.put('/:id/:columna', editarAlmacen)

export default rutas