import express from 'express'
const {Router}= express
const routerCarrito=Router()


import daos from '../daos/index.js'

const dbCarrito= daos.DAOcarritos
const DB = daos.DAOproductos




routerCarrito.get('/:id/productos',async (req,res)=>{//
    try{
        const {id}=req.params
        const data = await dbCarrito.getById(id)
        if(data){
           res.status(200).send(data)  
        }else{
            res.status(404).send({error:'carrito no encontrado'})
        }
    }catch(err){
        res.status(404).send({error:err})
    }
})

routerCarrito.post('/', async(req,res)=>{//
    try{
        const data = await dbCarrito.save()
        res.send({idCarrito:data})
    }catch(err){
            res.send({error: true, err})
        }
})


routerCarrito.post('/:id/productos', async(req,res)=>{//
        const {idProducto}=req.body
        if(!idProducto){
            return  res.status(406).send({error: 'falta idProducto en el req.body'})
        }
        const producto = await DB.getById(idProducto)
        const {id}=req.params
        try{
        const data = await dbCarrito.updateCarritoById(id,producto)
        if(data){
            res.status(200).send(data)
        }else{
            res.status(404).send({error:'carrito no encontrado'})
        }
        }catch(err){
            res.send({error: true, err})
        }
})

routerCarrito.delete('/:id/productos/:id_prod', async(req,res)=>{//
        const {id,id_prod}=req.params
        try{
        const data = await dbCarrito.deleteProductoById(id,id_prod)
        if(data){
            res.status(200).send(data)
        }else{
            res.status(404).send({error:'carrito no encontrado'})
        }
        }catch(err){
            res.send({error: true, err})
        } 
})

routerCarrito.delete('/:id', async(req,res)=>{//
    const {id}=req.params
    try{
    const data = await dbCarrito.deleteById(id)
    if(data){
        res.status(200).send(data)
    }else{
        res.status(404).send({error:'carrito no encontrado'})
    }
    }catch(err){
        res.send({error: true, err})
    } 
})

export default routerCarrito