import { Router } from 'express';
import { getOrdenes, getAllOrdenes,añadirOrden, editarOrden, eliminarOrden, editarOrdenconfir, getOrden } from '../controladores/ordenes.js';
const rutas = Router();

rutas.get('/Orden/:id', getOrden)

rutas.get('/:filtro/:locacion', getOrdenes)

rutas.get('/:filtro', getAllOrdenes)

rutas.post('/', añadirOrden)

rutas.put('/:id/confirmacion', editarOrdenconfir)

rutas.put('/:id/:columna', editarOrden)

rutas.delete('/:id', eliminarOrden)

export default rutas