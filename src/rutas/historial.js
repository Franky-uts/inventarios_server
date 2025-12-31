import { Router } from 'express';
import { getHistorial, getHistorialBusqueda } from '../controladores/historial.js';
const rutas = Router();

rutas.get('/:locacion/:filtro', getHistorial)

rutas.get('/:locacion/:filtro/:busqueda', getHistorialBusqueda)

export default rutas