import express from 'express'
import almacen from './rutas/almacen.js'
import usuarios from './rutas/usuarios.js'

const app = express();

app.use((req,res,next)=>{
    next();
})

app.get('/',(req,res)=>{
    res.send("Servidor de inventarios")
})

app.use(express.json())
app.use('/almacen',almacen);
app.use('/usuarios',usuarios);

app.use((req,res,next)=>{
    res.status(404).json({error:"No se encontro "+req.path})
})

const port = process.env.PORT || 4000;


app.listen(port,()=>{
    console.log(`Escuchando en el puerto: ${port}`)
})