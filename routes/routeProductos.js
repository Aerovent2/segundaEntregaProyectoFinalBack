import express  from 'express'
const {Router}= express
const routerProductos=Router()
import DAOproductosMongo from '../daos/productos/DAOproductos.js'
const DB = new DAOproductosMongo
const admin = true

const isAdmin = (req,res,next)=>{
    if(admin){
        next()
    }else{
        res.status(401).send({error: `ruta: /api/productos${req.url} necesita permisos de administrador }`})
    }
}

routerProductos.get('/', async(req,res)=>{//
    try{
       const data = await DB.getAll()
       return res.status(200).send(data)
    }catch(err){
        res.status(400).send({error:err})
    }
})

routerProductos.get('/:id',async (req,res)=>{//
    try{
        const {id}=req.params
        const data = await DB.getById(id)
        if(data){
           res.status(200).send(data)  
        }else{
            res.status(404).send({error:'producto no encontrado'})
        }
    }catch(err){
        res.status(404).send({error:err})
    }
})

routerProductos.post('/',isAdmin, async(req,res)=>{//
        const {nombre,descripcion,codigo,url,precio,stock}=req.body
        if(!nombre || !descripcion || !codigo || !url || !precio || !stock){
            return  res.status(406).send({error: 'faltan datos o son incorrectos'})
        }
        const producto={nombre,descripcion,codigo,url,precio:parseFloat(precio),stock:parseInt(stock)}
        try{
        const data = await DB.save(producto)
        producto.id = data
        res.send(producto)
        }catch(err){
            res.send({error: true, err})
        }
})
routerProductos.put('/:id',isAdmin, async(req,res)=>{//
        const {nombre,descripcion,codigo,url,precio,stock}=req.body
        if(!nombre & !descripcion & !codigo & !url & !precio & !stock){
            return  res.status(406).send({error: 'error en mascara de entrada'})
        }
        const {id}=req.params
        const producto={id,nombre,descripcion,codigo,url,precio:parseFloat(precio),stock:parseInt(stock)}
        try{
        const data = await DB.updateById(producto)
        if(data){
            res.status(200).send(data)
        }else{
            res.status(404).send({error:'producto no encontrado'})
        }
        }catch(err){
            res.send({error: true, err})
        }
})

routerProductos.delete('/:id',isAdmin, async(req,res)=>{//
        const {id}=req.params
        try{
        const data = await DB.deleteById(id)
        if(data){
            res.status(200).send(data)
        }else{
            res.status(404).send({error:'producto no encontrado'})
        }
        }catch(err){
            res.send({error: true, err})
        } 
})

routerProductos.delete('/',isAdmin, async(req,res)=>{//
    try{
    const data = await DB.deleteAll()
    if(data){
        res.status(200).send(data)
    }else{
        res.status(404).send({error:'producto no encontrado'})
    }
    }catch(err){
        res.send({error: true, err})
    } 
})


export  {routerProductos,DB}