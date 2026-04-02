import express from 'express'
import cors from 'cors'
import almacen from './rutas/almacen.js'
import articulos from './rutas/articulos.js'
import areas from './rutas/areas.js'
import tipos from './rutas/tipos.js'
import usuarios from './rutas/usuarios.js'
import ordenes from './rutas/ordenes.js'
import historial from './rutas/historial.js'
import registros from './rutas/registros.js'
import { pool } from './db.js';
import { fecha } from './db.js';

const app = express();
app.use(cors());

app.use((req, res, next) => {
    res.header("Access-Control-Allow-Origin", "*");
    res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");
    next();
})

app.get('/', (req, res) => {
    res.send("Servidor de inventarios")
})

app.use(express.json())
app.use('/almacen', almacen);
app.use('/articulos', articulos);
app.use('/usuarios', usuarios);
app.use('/tipos', tipos);
app.use('/areas', areas);
app.use('/ordenes', ordenes);
app.use('/historial', historial);
app.use('/registros', registros);

setInterval(async () => {
    var hoy = new Date();
    const fechaTexto = fecha();
    if (hoy.getHours() == 0) {
        var mensaje = 'Error: No se pudo conectar con la base de datos.'
        const consulta = await pool.query(`Select * from "reiniciarAlmacen"('${fechaTexto.dia} ${fechaTexto.hora}');`)
        if (consulta.rowCount > 0) {
            const respuesta = consulta.rows[0];
            mensaje = respuesta.Mensaje
        }
        console.log(mensaje)
    }
}, 3600000);

app.use((req, res, next) => {
    res.status(404).send(`Error: No se encontro la ruta "${req.path}"`)
})

const port = process.env.PORT || 3000;

app.listen(port, () => {
    console.log(`Escuchando en el puerto: ${port}`)
})