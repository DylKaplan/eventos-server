import ServicioUsuario from '../servicio/usuarios.js';

class ControladorUsuarios {
    constructor() {
        this.servicio = new ServicioUsuario();
    }

    iniciarSesion = async (req, res) => {
        try {
            const { user, password } = req.body;
            const resultado = await this.servicio.loginUsuario(user, password);
            res.json(resultado);
        } catch (error) {
            res.status(500).json({ error: error.message });
        }
    };

    registrarUsuario = async (req, res) => {
        try {
            const usuarioData = req.body;
            const usuarioRegistrado = await this.servicio.registrarUsuario(usuarioData);
            res.json(usuarioRegistrado);
        } catch (error) {
            res.status(500).json({ error: error.message });
        }
    };
}

export default ControladorUsuarios;
