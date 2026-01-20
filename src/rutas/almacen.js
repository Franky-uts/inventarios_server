import { Router } from 'express';
import { añadirAlmacen, editarAlmacen, editarAlmacenES, editarAlmacenPerdidas, eliminarAlmacen, getAlmacen, getAlmacenBusqueda, getAlmacenBusquedaProd, getAlmacenProd, getAlmacenProducto, reiniciarMovimientos } from '../controladores/almacen.js';
const rutas = Router();

rutas.get('/Producto/:locacion/:id/', getAlmacenProducto)

rutas.get('/Prod/:filtro', getAlmacenProd)

rutas.get('/Prod/:filtro/:busqueda', getAlmacenBusquedaProd)

rutas.get('/:locacion/:filtro', getAlmacen)

rutas.get('/:locacion/:filtro/:busqueda', getAlmacenBusqueda)

rutas.post('/', añadirAlmacen)

rutas.delete('/:locacion/:id', eliminarAlmacen)

rutas.put('/:locacion/reiniciarMovimientos', reiniciarMovimientos)

rutas.put('/:locacion/:id/ES', editarAlmacenES)

rutas.put('/:locacion/:id/Perdidas', editarAlmacenPerdidas)

rutas.put('/:locacion/:id/:columna', editarAlmacen)

export default rutas