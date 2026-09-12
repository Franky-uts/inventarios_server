import { Router } from 'express';
import { getAreas, getCategoria } from '../controladores/areas.js';
const rutas = Router();

rutas.get('/', getAreas)

rutas.get('/producto', getCategoria)

export default rutas