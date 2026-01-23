import { Router } from 'express';
import { getHistorial, getHistorialBusqueda, getHistorialInfo, getHistorialRango, getHistorialRangoBusqueda } from '../controladores/historial.js';
const rutas = Router();

rutas.get('/Historial/:locacion/:id/:fecha', getHistorialInfo)

rutas.get('/:locacion/:filtro/', getHistorial)

rutas.get('/:locacion/:filtro/:busqueda', getHistorialBusqueda)

rutas.get('/:locacion/:filtro/:fechaInicial/:fechaFinal', getHistorialRango)

rutas.get('/:locacion/:filtro/:fechaInicial/:fechaFinal/:busqueda', getHistorialRangoBusqueda)

export default rutas