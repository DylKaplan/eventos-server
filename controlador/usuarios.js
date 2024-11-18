import ServicioUsuario from '../servicio/usuarios.js';

class ControladorUsuarios {
    constructor() {
        this.servicio = new ServicioUsuario();
    }

    iniciarSesion = async (req, res) => {
        try {
            const { user, password } = req.body;
            const resultado = await this.servicio.loginUsuario(user, password);
            res.json({ mensaje: 'Inicio de sesión exitoso', token: resultado.token });
        } catch (error) {
            res.status(401).json({ error: error.message });
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

    validarToken = async (req, res) => {
        try {
            const token = req.headers.authorization?.split(' ')[1];
            const resultado = await this.servicio.validarToken(token);
            res.status(200).json({ mensaje: 'Token válido', user: resultado.user });
        } catch (error) {
            res.status(401).json({ mensaje: error.message });
        }
    };
}

export default ControladorUsuarios;
