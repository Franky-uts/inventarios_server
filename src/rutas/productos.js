import { Router } from 'express';
import { getProducto, getProductos, getProductosBusqueda } from '../controladores/productos.js';
const rutas = Router();

rutas.get('/producto/:id/:inicial/:final/:orden', getProducto)

rutas.get('/:almacen/:filtro/:orden', getProductos)

rutas.get('/:almacen/:filtro/:orden/:busqueda', getProductosBusqueda)

export default rutas