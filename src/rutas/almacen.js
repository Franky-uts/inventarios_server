import {Router} from 'express'
import {añadirAlmacen, editarAlmacen, eliminarAlmacen, getAlmacen,getAlmacenBusqueda} from '../controladores/almacen.js'
const rutas = Router();

rutas.get('/:filtro',getAlmacen)

rutas.get('/:filtro/:busqueda',getAlmacenBusqueda)

rutas.post('/',añadirAlmacen)

rutas.delete('/:id',eliminarAlmacen)

rutas.put('/:id/:columna',editarAlmacen)

export default rutas