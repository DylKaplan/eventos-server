import express from 'express'
import ControladorEventos from '../controlador/eventos.js'
import ControladorPersonal from '../controlador/personal.js'
import ControladorUsuarios from '../controlador/usuarios.js'

class Router {
    constructor() {
        this.controladorEventos = new ControladorEventos()
        this.controladorPersonal = new ControladorPersonal()
        this.controladorUsuarios = new ControladorUsuarios()
    }

    start() {
        const router = express.Router()

        router.get('/eventos/obtener/:id?', this.controladorEventos.obtenerEventos)
        router.get('/eventos/reporte', this.controladorEventos.generarReporteEventos);
        router.post('/eventos/guardar', this.controladorEventos.guardarEvento)
        router.put('/eventos/actualizar/:id', this.controladorEventos.actualizarEvento)
        router.delete('/eventos/borrar/:id', this.controladorEventos.borrarEvento)

        router.get('/personal/obtener/:id?', this.controladorPersonal.obtenerPersonal)
        router.post('/personal/guardar', this.controladorPersonal.guardarPersonal)
        router.put('/personal/actualizar/:id', this.controladorPersonal.actualizarPersonal)
        router.delete('/personal/borrar/:id', this.controladorPersonal.borrarPersonal)

        router.post('/usuario/login', this.controladorUsuarios.iniciarSesion)
        router.post('/usuario/registrar', this.controladorUsuarios.registrarUsuario)

        return router
    }
}

export default Router