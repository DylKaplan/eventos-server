import { validarLogin, validarRegistro } from "./validaciones/usuarios.js";
import ModelMongoDBUsuarios from "../model/DAOs/usuariosMongoDB.js";
import dotenv from 'dotenv';
import jwt from 'jsonwebtoken';

dotenv.config();

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

        const token = jwt.sign({ user: usuario }, process.env.JWT_SECRET, { expiresIn: '15m' });

        return { exito: true, token: token };
    };

    registrarUsuario = async (usuarioData) => {
        const rta = validarRegistro(usuarioData);
        if (!rta.result) {
            throw rta.error;
        }

        const usuarioGuardado = await this.model.guardarUsuario(usuarioData);
        return { user: usuarioGuardado.user };
    };

    validarToken = async (token) => {
        if (!token) {
            throw new Error('Token no proporcionado');
        }

        try {
            const decoded = jwt.verify(token, process.env.JWT_SECRET);
            return { user: decoded.user };
        } catch (err) {
            if (err.name === 'TokenExpiredError') {
                throw new Error('Token expirado');
            }
            throw new Error('Token inválido o expirado');
        }
    };
}

export default ServicioUsuario;
