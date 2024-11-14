import { validar } from "./validaciones/personal.js"
import ModelMongoDBPersonal from "../model/DAOs/personalMongoDB.js";


class ServicioPersonal {
    constructor() {
        this.model = new ModelMongoDBPersonal();
    }

    obtenerPersonal = async id => {
        if (id) {
            const persona = await this.model.obtenerPersona(id)
            return persona
        }
        else {
            const personal = await this.model.obtenerPersonal()
            return personal
        }
    }

    guardarPersonal = async personal => {
        //validación específica del personal a guardar 
        const rta = validar(personal)
        if (rta.result) {
            const personalGuardado = await this.model.guardarPersonal(personal)
            return personalGuardado
        }
        else {
            throw rta.error
        }
    }

    actualizarPersonal = async (id, personal) => {
        const personalActualizado = await this.model.actualizarPersonal(id, personal)
        return personalActualizado
    }

    borrarPersonal = async id => {
        const personalEliminado = await this.model.borrarPersonal(id)
        return personalEliminado
    }

}

export default ServicioPersonal