import express from "express"
const app= express()
import {routerProductos} from './routes/routeProductos.js'
import routerCarrito from './routes/routeCarrito.js'

app.use(express.json());
app.use(express.urlencoded({ extended: true }));


app.use('/api/productos',routerProductos)
app.use('/api/carrito',routerCarrito)
app.use('*',(req,res)=>{
    res.status(404).send({error:'ruta no implementada'})
})

const server = app.listen(process.env.PORT || 8080, ()=>{console.log(`servidor escuchando en el puerto ${server.address().port}`)})
server.on('error', (error)=>{console.error(error)})

