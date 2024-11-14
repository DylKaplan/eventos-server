import { validar } from "./validaciones/eventos.js"
import ModelMongoDBEventos from "../model/DAOs/eventosMongoDB.js";


class ServicioEventos {
    constructor() {
        this.model = new ModelMongoDBEventos();
    }

    obtenerEventos = async id => {
        if (id) {
            const evento = await this.model.obtenerEvento(id)
            return evento
        }
        else {
            const eventos = await this.model.obtenerEventos()
            return eventos
        }
    }

    guardarEvento = async evento => {
        //validación específica del evento a guardar 
        const rta = validar(evento)
        if (rta.result) {
            const eventoGuardado = await this.model.guardarEvento(evento)
            return eventoGuardado
        }
        else {
            throw rta.error
        }
    }

    actualizarEvento = async (id, evento) => {
        const eventoActualizado = await this.model.actualizarEvento(id, evento)
        return eventoActualizado
    }

    borrarEvento = async id => {
        const eventoEliminado = await this.model.borrarEvento(id)
        return eventoEliminado
    }

}

export default ServicioEventos