import { validarLogin, validarRegistro } from "./validaciones/usuarios.js";
import ModelMongoDBUsuarios from "../model/DAOs/usuariosMongoDB.js";

class ServicioUsuario {
    constructor() {
        this.model = new ModelMongoDBUsuarios();
    }

    loginUsuario = async (user, password) => {
        const loginData = { user, password };

        console.log("Intentando iniciar sesión con usuario:", loginData.user);

        const rta = validarLogin(loginData);
        if (!rta.result) {
            throw rta.error;
        }

        const usuario = await this.model.obtenerUsuario(loginData.user);

        console.log("Usuario encontrado en la base de datos:", usuario);

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
        return usuarioGuardado;
    };
}

export default ServicioUsuario;
