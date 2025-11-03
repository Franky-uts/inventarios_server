import express from 'express'
import almacen from './rutas/almacen.js'
import areas from './rutas/areas.js'
import tipos from './rutas/tipos.js'
import usuarios from './rutas/usuarios.js'
import ordenes from './rutas/ordenes.js'

const app = express();

app.use((req, res, next) => {
    next();
})

app.get('/', (req, res) => {
    res.send("Servidor de inventarios"+process.env.DATABASE_URL)
})

app.use(express.json())
app.use('/inventario', almacen);
app.use('/usuarios', usuarios);
app.use('/tipos', tipos);
app.use('/areas', areas);
app.use('/ordenes', ordenes);

app.use((req, res, next) => {
    res.status(404).json({ error: "No se encontro " + req.path })
})

const port = process.env.PORT || 4000;

app.listen(port, () => {
    console.log(`Escuchando en el puerto: ${port}`)
})