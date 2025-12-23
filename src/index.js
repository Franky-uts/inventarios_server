import express from 'express'
import almacen from './rutas/almacen.js'
import articulos from './rutas/articulos.js'
import areas from './rutas/areas.js'
import tipos from './rutas/tipos.js'
import usuarios from './rutas/usuarios.js'
import ordenes from './rutas/ordenes.js'

const app = express();

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

app.use((req, res, next) => {
    res.status(404).send(`Error: No se encontro ${req.path}`)
})

const port = process.env.PORT || 3000;

app.listen(port, () => {
    console.log(`Escuchando en el puerto: ${port}`)
})