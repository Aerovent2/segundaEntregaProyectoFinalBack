import * as dotenv from  'dotenv'
dotenv.config()

const daos ={
mongo: async ()=>{
    const {default :DAOcarritoMongo} = await import('./carritos/DAOcarritoMongo.js')
    const {default :DAOproductosMongo} = await import('./productos/DAOproductosMongo.js')
    return {
        DAOcarritos: new DAOcarritoMongo,
        DAOproductos: new DAOproductosMongo
    }
},
mem:async ()=>{
    return
},
firebase: async()=>{
    const {default :DAOcarritosFirebase} = await import('./carritos/DAOcarritosFirebase.js')
    const {default :DAOproductosFirebase} = await import('./productos/DAOproductosFirebase.js')
    return {
        DAOcarritos: new DAOcarritosFirebase,
        DAOproductos: new DAOproductosFirebase
}
},
fs:async ()=>{
    const {default :DAOcarritosFs} = await import('./carritos/DAOcarritosFs.js')
    const {default :DAOproductosFs} = await import('./productos/DAOproductosFs.js')
    return {
        DAOcarritos: new DAOcarritosFs,
        DAOproductos: new DAOproductosFs
}
}

}

export default await daos[process.env.TIPO]()