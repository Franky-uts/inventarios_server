import { Router } from 'express';
import { añadirUsuario, borrarUsuario, editarUsuario, getUsuario } from '../controladores/usuarios.js';
const rutas = Router();

rutas.get('/:usuario/:contr', getUsuario)

rutas.post('/', añadirUsuario)

rutas.delete('/:usuario', borrarUsuario)

rutas.put('/:usuario/:columna', editarUsuario)

export default rutas