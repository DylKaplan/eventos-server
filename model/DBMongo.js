//https://www.npmjs.com/package/mongodb

//https://www.npmjs.com/package/mongoose
//https://mongoosejs.com/


import { MongoClient } from 'mongodb'
import config from '../config.js'

class CnxMongoDB {
    static connectionOk = false
    static db = null

    static conectar = async _ => {
        try {
            console.log('Conectado a la base de datos...')
            const client = new MongoClient(config.STRCNX);
            await client.connect()
            console.log('Base de datos conectada!')

            CnxMongoDB.db = client.db(config.BASE)
            CnxMongoDB.connectionOk = true
        }
        catch(error) {
            console.log(`Error en la conexión de base de datos: ${error.message}`)
        }
    }
}

export default CnxMongoDB