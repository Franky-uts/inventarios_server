import {Router} from 'express'
import { getTipos } from '../controladores/tipos.js';
const rutas = Router();

rutas.get('/',getTipos)

export default rutas