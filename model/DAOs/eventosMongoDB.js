import { ObjectId } from "mongodb"
import CnxMongoDB from "../DBMongo.js"

class ModelMongoDBEventos {
    constructor() {}

    obtenerEventos = async () => {
        if(!CnxMongoDB.connectionOk) throw Error('ERROR CNX BASE DE DATOS')
        const eventos = await CnxMongoDB.db.collection('eventos').find({}).toArray()
        return eventos
    }

    obtenerEvento = async id => {
        if(!CnxMongoDB.connectionOk) throw Error('ERROR CNX BASE DE DATOS')
        const evento = await CnxMongoDB.db.collection('eventos').findOne({_id: ObjectId.createFromHexString(id)})
        return evento
    }

    guardarEvento = async evento => {
        if(!CnxMongoDB.connectionOk) throw Error('ERROR CNX BASE DE DATOS')

        await CnxMongoDB.db.collection('eventos').insertOne(evento)
        return evento
    }

    actualizarEvento = async (id, evento) => {
        if(!CnxMongoDB.connectionOk) throw Error('ERROR CNX BASE DE DATOS')

        await CnxMongoDB.db.collection('eventos').updateOne(
            {_id: ObjectId.createFromHexString(id)},
            {$set: evento }
        )
        const eventoActualizado = await this.obtenerEvento(id)
        return eventoActualizado
    }

    borrarEvento = async id => {
        if(!CnxMongoDB.connectionOk) throw Error('ERROR CNX BASE DE DATOS')

        const eventoBorrado = await this.obtenerEvento(id)
        await CnxMongoDB.db.collection('eventos').deleteOne({_id: ObjectId.createFromHexString(id)})
        return eventoBorrado
    }
}

export default ModelMongoDBEventos