import fs from 'fs'


class Contenedor {
    constructor(nombreDeArchivo){
        this.nombreDeArchivo=nombreDeArchivo
    }
    async  save(objeto){
        let elementos = []
        try{
            let buscarArchivos= await fs.promises.readdir('./')
            let existe= buscarArchivos.find(archivo => archivo=== this.nombreDeArchivo)
            if(existe){
                let existente = await fs.promises.readFile(this.nombreDeArchivo, 'utf-8')
                if(existente !== ''){
                     elementos = JSON.parse(existente)
                     if(elementos.length > 0){
                        let maxId = elementos[0].id
                        for(let i =0; i< elementos.length; i++){
                            if(maxId < elementos[i].id){
                                maxId=elementos[i].id
                            }
                        objeto.id = maxId+1
                        }
                     }
                }
            }else{
                objeto.id=1
            }
            elementos.push(objeto)
            await fs.promises.writeFile(this.nombreDeArchivo, JSON.stringify(elementos))
            return objeto.id
        }catch(err){
            console.error(`hubo un error al guardar el archivo : ${err}`)
        }
    }
    async getById(numero){
        try{
            let leer = await fs.promises.readFile(this.nombreDeArchivo, 'utf-8')
            let encontrado =  JSON.parse(leer).find(objeto => objeto.id === numero)
            if(encontrado){
                return encontrado
            }else{
                return null
            } 
        }catch(err){
            console.log(`hubo un error al buscar por id : ${err}`)
        } 
    }
    async getAll(){
        try{
            let leer = await fs.promises.readFile(this.nombreDeArchivo, 'utf-8')
            let encontrado =  JSON.parse(leer)
            if(encontrado){
                return encontrado
            }else{
                return null
            } 
        }catch(err){
            console.log(`hubo un error al buscar todos : ${err}`)
        } 
    }
    async deleteById(numero){
        try{
            let leer = await fs.promises.readFile(this.nombreDeArchivo, 'utf-8')
            let encontrado =  JSON.parse(leer)
            let filtrado = encontrado.filter(objeto => objeto.id !== numero)
            await fs.promises.writeFile(this.nombreDeArchivo, JSON.stringify(filtrado))
 
        }catch(err){
            console.log(`hubo un error al borrar por id : ${err}`)
        } 
    }
    async deleteAll(){
        try{
            await fs.promises.writeFile(this.nombreDeArchivo, '')
 
        }catch(err){
            console.log(`hubo un error al borrar todos : ${err}`)
        } 
    }
}
export default Contenedor