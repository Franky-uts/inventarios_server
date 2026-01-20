import { Router } from 'express';
import { getArticulos, getArticuloBusqueda, añadirArticulo, editarArticulos, eliminarArticulo, getDatosArticulo, getArticulo } from '../controladores/articulos.js';
const rutas = Router();

rutas.get('/almacen/:id', getDatosArticulo)

rutas.get('/Articulo/:id', getArticulo)

rutas.get('/:filtro', getArticulos)

rutas.get('/:filtro/:busqueda', getArticuloBusqueda)

rutas.post('/', añadirArticulo)

rutas.delete('/:id', eliminarArticulo)

rutas.put('/:id/:columna', editarArticulos)

export default rutas