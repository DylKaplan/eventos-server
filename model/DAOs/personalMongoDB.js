import { ObjectId } from "mongodb"
import CnxMongoDB from "../DBMongo.js"

class ModelMongoDBPersonal {
    constructor() {}

    obtenerPersonal = async () => {
        if(!CnxMongoDB.connectionOk) throw Error('ERROR CNX BASE DE DATOS')
        const personal = await CnxMongoDB.db.collection('personal').find({}).toArray()
        return personal
    }

    obtenerPersona = async id => {
        if(!CnxMongoDB.connectionOk) throw Error('ERROR CNX BASE DE DATOS')
        const persona = await CnxMongoDB.db.collection('personal').findOne({_id: ObjectId.createFromHexString(id)})
        return persona
    }

    guardarPersonal = async personal => {
        if(!CnxMongoDB.connectionOk) throw Error('ERROR CNX BASE DE DATOS')

        await CnxMongoDB.db.collection('personal').insertOne(personal)
        return personal
    }

    actualizarPersonal = async (id, personal) => {
        if(!CnxMongoDB.connectionOk) throw Error('ERROR CNX BASE DE DATOS')

        await CnxMongoDB.db.collection('personal').updateOne(
            {_id: ObjectId.createFromHexString(id)},
            {$set: personal }
        )
        const personalActualizado = await this.obtenerPersonal(id)
        return personalActualizado
    }

    borrarPersonal = async id => {
        if(!CnxMongoDB.connectionOk) throw Error('ERROR CNX BASE DE DATOS')

        const personalBorrado = await this.obtenerPersonal(id)
        await CnxMongoDB.db.collection('personal').deleteOne({_id: ObjectId.createFromHexString(id)})
        return personalBorrado
    }
}

export default ModelMongoDBPersonal