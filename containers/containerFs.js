import fs from 'fs'
import url from 'url'
import { join } from 'path' 
const __dirname = url.fileURLToPath(new url.URL('.',import.meta.url))
const ruta=join(__dirname,"../db")
class Contenedor {
    constructor(nombreDeArchivo){
        this.nombreDeArchivo=nombreDeArchivo
        this.ruta= ruta
    }
    async  save(objeto){
        let objetos = []
        try{
            let buscarArchivos= await fs.promises.readdir(this.ruta)
            let existe= buscarArchivos.find(archivo => archivo=== this.nombreDeArchivo)
            if(existe){
                let existente = await fs.promises.readFile(`${this.ruta}/${this.nombreDeArchivo}`, 'utf-8')
                if(existente !== ''){
                     objetos = JSON.parse(existente)
                     if(objetos.length > 0){
                        let maxId = objetos[0].id
                        for(let i =0; i< objetos.length; i++){
                            if(maxId < objetos[i].id){
                                maxId=objetos[i].id
                            }
                        objeto.id = maxId+1
                        }
                     }else{
                        objeto.id=1
                     }
                }
            }else{
                objeto.id=1
            }
            objeto.timestamp = new Date()
            objetos.push(objeto)
            await fs.promises.writeFile(`${this.ruta}/${this.nombreDeArchivo}`, JSON.stringify(objetos))
            return objeto.id
        }catch(err){
            console.error(`hubo un error al guardar el archivo : ${err}`)
        }
    }
    async getById(numero){
        try{
            let buscarArchivos= await fs.promises.readdir(this.ruta)
            let existe= buscarArchivos.find(archivo => archivo=== this.nombreDeArchivo)
            if (existe){
                let leer = await fs.promises.readFile(`${this.ruta}/${this.nombreDeArchivo}`, 'utf-8')
                let parsed =  JSON.parse(leer)
                let encontrado =  parsed.find(objeto => objeto.id === parseInt(numero) )
                if(encontrado){
                    return encontrado
                }else{
                    return null
                } 
            }
        }catch(err){
            console.log(`hubo un error al buscar por id : ${err}`)
        } 
    }

    async updateById(id,producto){
        try{
            let buscarArchivos= await fs.promises.readdir(this.ruta)
            let existe= buscarArchivos.find(archivo => archivo=== this.nombreDeArchivo)
            if (existe){
                let leer = await fs.promises.readFile(`${this.ruta}/${this.nombreDeArchivo}`, 'utf-8')
                let parsed =  JSON.parse(leer)
                let encontrado =  parsed.findIndex(objeto => objeto.id === parseInt(id) )
                if(encontrado != -1){
                    producto.id = parseInt(id)
                    parsed[encontrado]=producto
                    await fs.promises.writeFile(`${this.ruta}/${this.nombreDeArchivo}`, JSON.stringify(parsed))
                return producto
                }else{
                    return null
                } 
            }
        }catch(err){
            console.log(`hubo un error al actualizar por id : ${err}`)
        } 
    }


    async deleteById(id){
        try{
            let buscarArchivos= await fs.promises.readdir(this.ruta)
            let existe= buscarArchivos.find(archivo => archivo=== this.nombreDeArchivo)
            if (existe){
                let leer = await fs.promises.readFile(`${this.ruta}/${this.nombreDeArchivo}`, 'utf-8')
                let parsed =  JSON.parse(leer)
                let filtrado =  parsed.filter(objeto => objeto.id !== parseInt(id) )
                console.log(filtrado)
                await fs.promises.writeFile(`${this.ruta}/${this.nombreDeArchivo}`, JSON.stringify(filtrado))
                return filtrado
                
            }
        }catch(err){
            console.log(`hubo un error al actualizar por id : ${err}`)
        } 
    }

    async getAll(){
        try{
            let buscarArchivos= await fs.promises.readdir(this.ruta)
            let existe= buscarArchivos.find(archivo => archivo=== this.nombreDeArchivo)
            if (existe){
                let leer = await fs.promises.readFile(`${this.ruta}/${this.nombreDeArchivo}`, 'utf-8')
                let encontrado =  JSON.parse(leer)
                if(encontrado){
                    return encontrado
                }else{
                    return null
                } 
            }else{
                return ('no existe archivo')
            }

        }catch(err){
            console.log(`hubo un error al buscar todos : ${err}`)
        } 
    }
     async deleteAll(){
        try{
            let buscarArchivos= await fs.promises.readdir(this.ruta)
            let existe= buscarArchivos.find(archivo => archivo=== this.nombreDeArchivo)
            if(existe){
                await fs.promises.writeFile(`${this.ruta}/${this.nombreDeArchivo}`, JSON.stringify([]))
                return null
            }
        }catch(err){
            console.log(`hubo un error al borrar todos : ${err}`)
        } 
    } 
}
export default Contenedor