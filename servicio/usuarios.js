import { validarLogin, validarRegistro } from "./validaciones/usuarios.js";
import ModelMongoDBUsuarios from "../model/DAOs/usuariosMongoDB.js";

class ServicioUsuario {
    constructor() {
        this.model = new ModelMongoDBUsuarios();
    }

    loginUsuario = async (user, password) => {
        const loginData = { user, password };

        const rta = validarLogin(loginData);
        if (!rta.result) {
            throw rta.error;
        }

        const usuario = await this.model.obtenerUsuario(loginData.user);

        if (!usuario) {
            throw new Error("Usuario no encontrado");
        }

        const esPasswordValida = await this.model.verificarPassword(password, usuario.password);
        if (!esPasswordValida) {
            throw new Error("Contraseña incorrecta");
        }

        return { exito: true };
    };

    registrarUsuario = async (usuarioData) => {
        const rta = validarRegistro(usuarioData);
        if (!rta.result) {
            throw rta.error;
        }

        const usuarioGuardado = await this.model.guardarUsuario(usuarioData);
        return { user: usuarioGuardado.user };
    };
}

export default ServicioUsuario;
