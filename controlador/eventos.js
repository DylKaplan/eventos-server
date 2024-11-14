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

            if(!Object.keys(evento).length) throw new Error('evento vacío')

            const eventoGuardado = await this.servicio.guardarEvento(evento)
            res.json(eventoGuardado)
        }
        catch(error) {
            res.status(500).json({error: error.message})
        }
    }

    actualizarEvento = async (req,res) => {
        try {
            const { id } = req.params
            const evento = req.body
            const eventoActualizado = await this.servicio.actualizarEvento(id, evento)
            res.json(eventoActualizado)
        }
        catch(error) {
            res.status(500).json({error: error.message})
        }
    }

    borrarEvento = async (req,res) => {
        const { id } = req.params
        const eventoEliminado = await this.servicio.borrarEvento(id)
        res.json(eventoEliminado)
    }

    generarReporteEventos = async (req, res) => {
        try {
            const pdfStream = await this.servicio.generarReporteEventos();
            res.setHeader('Content-Type', 'application/pdf');
            res.setHeader('Content-Disposition', 'attachment; filename=reporte_eventos.pdf');
            pdfStream.pipe(res);
            pdfStream.end();
        } catch (error) {
            console.error('Error al generar el reporte PDF:', error);
            res.status(500).json({ mensaje: 'Error al generar el reporte PDF' });
        }
    };

}

export default ControladorEventos