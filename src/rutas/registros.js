import { Router } from 'express';
import { getRegistro, getRegistros, getRegistrosBusqueda, getRegistrosRango, getRegistrosRangoBusqueda, añadirRegistroCompleto } from '../controladores/registros.js';
const rutas = Router();

rutas.get('/Registro/:fecha/:hora/:usuario', getRegistro)

rutas.get('/:locacion/:filtro', getRegistros)

rutas.get('/:locacion/:filtro/:busqueda', getRegistrosBusqueda)

rutas.get('/:locacion/:filtro/:fechaInicial/:fechaFinal', getRegistrosRango)

rutas.get('/:locacion/:filtro/:fechaInicial/:fechaFinal/:busqueda', getRegistrosRangoBusqueda)

rutas.post('/', añadirRegistroCompleto)

export default rutas