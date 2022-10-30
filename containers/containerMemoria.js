class Contenedor {
    constructor() {
      this.elementos = [];
    }
  
    getById(id) {
      const elem = this.elementos.find((elem) => elem.id == id);
      if (!elem) {
        throw new Error(`Error al listar: elemento no encontrado`);
      } else {
        return elem;
      }
    }
  
    getAll() {
      return [...this.elementos];
    }
  
    save(newElem) {
      this.elementos.push(newElem);
      return newElem;
    }
  
    updateById(elem) {
      elem.id = Number(elem.id);
      const index = this.elementos.findIndex((p) => p.id == elem.id);
      if (index == -1) {
        throw new Error(`Error al actualizar: elemento no encontrado`);
      } else {
        this.elementos[index] = elem;
        return elem;
      }
    }
  
    deleteById(id) {
      const index = this.elementos.findIndex((elem) => elem.id == id);
      if (index == -1) {
        throw new Error(`Error al borrar: elemento no encontrado`);
      } else {
        return this.elementos.splice(index, 1);
      }
    }
  
    deleteAll() {
      this.elementos = [];
    }
  }
  
  export default Contenedor;