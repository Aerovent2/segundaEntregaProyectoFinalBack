class Contenedor {
    constructor() {
      this.productos = [];
    }
    save(objeto){
      try{
          if(this.productos){
                   if(this.productos.length > 0){
                      let maxId = this.productos[0].id
                      for(let i =0; i< this.productos.length; i++){
                          if(maxId < this.productos[i].id){
                              maxId=this.productos[i].id
                          }
                      objeto.id = maxId+1
                      }
                   }else{
                    objeto.id=1
                   }
          }else{
              objeto.id=1
          }
          objeto.timestamp = new Date()
          this.productos.push(objeto)
          return objeto.id
      }catch(err){
          console.error(`hubo un error al guardar el archivo : ${err}`)
      }
  }
   getById(numero){
      try{
          if (this.productos){
              let encontrado =  this.productos.find(objeto => objeto.id === parseInt(numero) )
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

   updateById(id,producto){
      try{
          if (this.productos){
              let encontrado =  this.productos.findIndex(objeto => objeto.id === parseInt(id) )
              if(encontrado != -1){
                  producto.id = parseInt(id)
                  this.productos[encontrado]=producto
              return producto
              }else{
                  return null
              } 
          }
      }catch(err){
          console.log(`hubo un error al actualizar por id : ${err}`)
      } 
  }


  deleteById(id){
      try{
          if (this.productos){
              let filtrado =  this.productos.filter(objeto => objeto.id !== parseInt(id) )
              this.productos= filtrado
              return filtrado
              
          }
      }catch(err){
          console.log(`hubo un error al actualizar por id : ${err}`)
      } 
  }

  async getAll(){
      try{
          return this.productos
      }catch(err){
          console.log(`hubo un error al buscar todos : ${err}`)
      } 
  }
  deleteAll(){
      try{
        this.productos=[]
      }catch(err){
          console.log(`hubo un error al borrar todos : ${err}`)
      } 
  } 
  }
  
  export default Contenedor;