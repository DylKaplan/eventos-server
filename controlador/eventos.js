import Servicio from '../servicio/eventos.js'


class ControladorEventos {
    constructor() {
        this.servicio = new Servicio()
    }

    obtenerEventos = async (req,res) => {
        try {
           const { id } = req.params
            const eventos = await this.servicio.obtenerEventos(id)
            res.json(eventos)
        }
        catch(error) {
            res.status(500).json({error: error.message})
        }
    }

    guardarEvento = async (req,res) => {
        try {
            const evento = req.body

            //validación genérica del evento a guardar
            if(!Object.keys(evento).length) throw new Error('evento vacío')

            const eventoGuardado = await this.servicio.guardarEvento(evento)
            res.json(eventoGuardado)
        }
        catch(error) {
            res.status(500).json({error: error.message})
        }
    }

    actualizarEvento = async (req,res) => {
        const { id } = req.params
        const evento = req.body
        const eventoActualizado = await this.servicio.actualizarEvento(id, evento)
        res.json(eventoActualizado)
    }

    borrarEvento = async (req,res) => {
        const { id } = req.params
        const eventoEliminado = await this.servicio.borrarEvento(id)
        res.json(eventoEliminado)
    }

}

export default ControladorEventos