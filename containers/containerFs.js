import fs from 'fs'


class Contenedor {
    constructor(nombreDeArchivo){
        this.nombreDeArchivo=nombreDeArchivo
    }
    async existe(){
        let buscarArchivos= await fs.promises.readdir('./db')
        let existe= buscarArchivos.find(archivo => archivo=== this.nombreDeArchivo)
        return existe
    }
    async leer(){
        let leer = await fs.promises.readFile(`./db/${this.nombreDeArchivo}`, 'utf-8')
        let parsed =  JSON.parse(leer)
        return parsed
    }
    async  save(objeto){
        let objetos = []
        try{
            let buscarArchivos= await fs.promises.readdir('./db')
            let existe= buscarArchivos.find(archivo => archivo=== this.nombreDeArchivo)
            if(existe){
                let existente = await fs.promises.readFile(`./db/${this.nombreDeArchivo}`, 'utf-8')
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
                     }
                }
            }else{
                objeto.id=1
            }
            objeto.timestamp = new Date()
            objetos.push(objeto)
            await fs.promises.writeFile(`./db/${this.nombreDeArchivo}`, JSON.stringify(objetos))
            return objeto.id
        }catch(err){
            console.error(`hubo un error al guardar el archivo : ${err}`)
        }
    }
    async getById(numero){//
        try{
            if (this.existe()){
                let desdeFs = await this.leer()
                let encontrado =  desdeFs.find(objeto => objeto.id === parseInt(numero) )
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

}
export default Contenedor