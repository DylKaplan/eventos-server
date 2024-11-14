import { validarPersonal } from "./validaciones/personal.js"
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
        const rta = validarPersonal(personal)
        if (rta.result) {
            const personalGuardado = await this.model.guardarPersonal(personal)
            return personalGuardado
        }
        else {
            throw rta.error
        }
    }

    actualizarPersonal = async (id, personal) => {
        const rta = validarPersonal(personal)
        if (rta.result) {
            const personalActualizado = await this.model.actualizarPersonal(id, personal)
            return personalActualizado
        }
        else {
            throw rta.error
        }
    }

    borrarPersonal = async id => {
        const personalEliminado = await this.model.borrarPersonal(id)
        return personalEliminado
    }

}

export default ServicioPersonal