import express from 'express'
import ControladorEventos from '../controlador/eventos.js'
import ControladorPersonal from '../controlador/personal.js'

class Router {
    constructor() {
        this.controladorEventos = new ControladorEventos()
        this.controladorPersonal = new ControladorPersonal()
    }

    start() {
        const router = express.Router()

        router.get('/eventos/obtener/:id?', this.controladorEventos.obtenerEventos)
        router.post('/eventos/guardar', this.controladorEventos.guardarEvento)
        router.put('/eventos/actualizar/:id', this.controladorEventos.actualizarEvento)
        router.delete('/eventos/borrar/:id', this.controladorEventos.borrarEvento)

        router.get('/personal/obtener/:id?', this.controladorPersonal.obtenerPersonal)
        router.post('/personal/guardar', this.controladorPersonal.guardarPersonal)
        router.put('/personal/actualizar/:id', this.controladorPersonal.actualizarPersonal)
        router.delete('/personal/borrar/:id', this.controladorPersonal.borrarPersonal)

        return router
    }
}

export default Router