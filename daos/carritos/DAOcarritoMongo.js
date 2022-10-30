import Contenedor from "../../containers/containerMongo.js";

class DAOcarritosMongo extends Contenedor{
    constructor(){
        super('carritos',{
            productos: {type:Array, default:[]},
            timestamp: {type: String, required:true, default: new Date()}
            })
    }
    async updateCarritoById(idCarrito,producto){
        const carritoPrevio= await super.getById(idCarrito)
        carritoPrevio.productos.push(producto)
        const resutl =await this.db.updateOne({_id:idCarrito},{productos:carritoPrevio.productos})
        if(resutl.modifiedCount ===1){
         return carritoPrevio
        } 
    }
    async deleteProductoById(idCarrito,id_prod){//
        try{
            const carritoPrevio= await super.getById(idCarrito)
            let productos = carritoPrevio.productos
            let filtrado= productos.filter(objeto => objeto._id !=  id_prod) 
            carritoPrevio.productos = filtrado           
            const resutl =await this.db.updateOne({_id:idCarrito},{productos:carritoPrevio.productos})
            if(resutl.modifiedCount ===1){
                return carritoPrevio
            }else{
                return {error: "Carrito no encontrado"}
            }  
            
            
        }catch(err){
            console.log(`hubo un error al borrar producto por id : ${err}`)
        } 
    }
}

export default DAOcarritosMongo


