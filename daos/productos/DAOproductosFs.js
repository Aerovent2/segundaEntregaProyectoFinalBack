import baseDeDatos from "../../db/dbProductos.js"

class DAOproductosFs extends baseDeDatos{
    constructor(){
        super('productos.json')
    }

}

export default DAOproductosFs