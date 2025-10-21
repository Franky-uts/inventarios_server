import {Router} from 'express'
import { getAreas } from '../controladores/areas.js';
const rutas = Router();

rutas.get('/',getAreas)

export default rutas