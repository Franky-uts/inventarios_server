import { Router } from 'express';
import { añadirAlmacen, editarAlmacen, editarAlmacenESP, eliminarAlmacen, getAlmacen, getAlmacenBusqueda, getAlmacenBusquedaProd, getAlmacenProd, reiniciarMovimientos } from '../controladores/almacen.js';
const rutas = Router();

rutas.get('/Prod/:filtro', getAlmacenProd)

rutas.get('/Prod/:filtro/:busqueda', getAlmacenBusquedaProd)

rutas.get('/:locacion/:filtro', getAlmacen)

rutas.get('/:locacion/:filtro/:busqueda', getAlmacenBusqueda)

rutas.post('/', añadirAlmacen)

rutas.delete('/:id', eliminarAlmacen)

rutas.put('/:locacion/reiniciarMovimientos', reiniciarMovimientos)

rutas.put('/:id/ESP', editarAlmacenESP)

rutas.put('/:id/:columna', editarAlmacen)

export default rutas