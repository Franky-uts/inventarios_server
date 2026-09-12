import { Router } from 'express';
import { getTipos, getTiposProducto } from '../controladores/tipos.js';
const rutas = Router();

rutas.get('/', getTipos)

rutas.get('/producto', getTiposProducto)

export default rutas