import {Router} from 'express'
import {getUsuarios, getUsuario, añadirUsuario, borrarUsuario, editarUsuario} from '../controladores/usuarios.js'
const rutas = Router();

rutas.get('/',getUsuarios)

rutas.get('/:usuario/:contr',getUsuario)

rutas.post('/',añadirUsuario)

rutas.delete('/:usuario',borrarUsuario)

rutas.put('/:usuario/:columna',editarUsuario)

export default rutas