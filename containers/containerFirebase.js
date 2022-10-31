//import mongoose from "mongoose"
import config from '../config.js'
import admin from 'firebase-admin'


var serviceAccount =config.firebase

admin.initializeApp({
  credential: admin.credential.cert(serviceAccount),
  databaseURL:'https://dbcoder-20280.firebaseio.com'
});

const dbF= admin.firestore()

class Contenedor {
    constructor(coleccion){
        this.db = dbF.collection(coleccion)
        
    }
    async  save(objeto){
        try{
          const doc= await  this.db.add(objeto)
          return doc.id
        }catch(err){
            console.error(`hubo un error al guardar el archivo : ${err}`)
        }
    }
    async getById(numero){
        try{
            const encontrado = await this.db.doc(numero).get()
            let objetos ={id: encontrado.id,...encontrado.data()}
            return objetos
           
        }catch(err){
            console.log(`hubo un error al buscar por id : ${err}`)
        } 
    }

    async updateById(objeto){
        try{
            await this.db.doc(objeto.id).set(objeto)
            return objeto
        }catch(err){
            console.log(`hubo un error al actualizar por id : ${err}`)
        } 

    }


    async getAll(){
        try{
            const encontrado = await this.db.get()
            let objetos =[]
            encontrado.forEach(doc => objetos.push({id: doc.id,...doc.data()}))

            return objetos
        }catch(err){
            console.log(`hubo un error al buscar todos : ${err}`)
        } 
    }
    async deleteById(numero){
        try{
            await this.db.doc(numero).delete()
            return {ok:numero + ' eliminado'}
        }catch(err){
            console.log(`hubo un error al borrar por id : ${err}`)
        } 
    }
    async deleteAll(){
        try{
            const encontrado = await this.db.get()
            let objetos =[]
            encontrado.forEach(doc => objetos.push({id: doc.id}))
            objetos.forEach(objeto => this.deleteById(objeto.id))
            return {ok:objetos.length + ' eliminados'}
 
        }catch(err){
            console.log(`hubo un error al borrar todos : ${err}`)
        } 
    }
}
export default Contenedor