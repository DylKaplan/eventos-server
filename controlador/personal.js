import Servicio from '../servicio/personal.js'


class ControladorPersonal {
    constructor() {
        this.servicio = new Servicio()
    }

    obtenerPersonal = async (req,res) => {
        try {
           const { id } = req.params
            const personal = await this.servicio.obtenerPersonal(id)
            res.json(personal)
        }
        catch(error) {
            res.status(500).json({error: error.message})
        }
    }

    guardarPersonal = async (req,res) => {
        try {
            const personal = req.body

            if(!Object.keys(personal).length) throw new Error('personal vacío')

            const personalGuardado = await this.servicio.guardarPersonal(personal)
            res.json(personalGuardado)
        }
        catch(error) {
            res.status(500).json({error: error.message})
        }
    }

    actualizarPersonal = async (req,res) => {
        try {
            const { id } = req.params
            const personal = req.body
            const personalActualizado = await this.servicio.actualizarPersonal(id, personal)
            res.json(personalActualizado)
        }
        catch(error) {
            res.status(500).json({error: error.message})
        }
    }

    borrarPersonal = async (req,res) => {
        const { id } = req.params
        const personalEliminado = await this.servicio.borrarPersonal(id)
        res.json(personalEliminado)
    }

}

export default ControladorPersonal