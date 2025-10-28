import { Router } from 'express';
import { getOrdenes, añadirOrden, editarOrden, eliminarOrden } from '../controladores/ordenes.js';
const rutas = Router();

rutas.get('/:filtro', getOrdenes)

rutas.post('/', añadirOrden)

rutas.put('/:id/:columna', editarOrden)

rutas.delete('/:id', eliminarOrden)

export default rutas