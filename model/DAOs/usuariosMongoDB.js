import bcrypt from 'bcrypt';
import CnxMongoDB from '../DBMongo.js';

class ModelMongoDBUsuarios {
    constructor() {}

    obtenerUsuario = async (username) => {
        if (!CnxMongoDB.connectionOk) throw new Error('ERROR CNX BASE DE DATOS');
        const usuario = await CnxMongoDB.db.collection('usuarios').findOne({ user: username.toUpperCase() });
        return usuario;
    };

    guardarUsuario = async (usuarioData) => {
        if (!CnxMongoDB.connectionOk) throw new Error('ERROR CNX BASE DE DATOS');

        usuarioData.user = usuarioData.user.toUpperCase();

        const usuarioExistente = await this.obtenerUsuario(usuarioData.user);
        if (usuarioExistente) {
            throw new Error('El nombre de usuario ya está en uso.');
        }

        const salt = await bcrypt.genSalt(10);
        usuarioData.password = await bcrypt.hash(usuarioData.password, salt);

        await CnxMongoDB.db.collection('usuarios').insertOne(usuarioData);
        return usuarioData;
    };

    verificarPassword = async (inputPassword, storedPassword) => {
        return bcrypt.compare(inputPassword, storedPassword);
    };
}

export default ModelMongoDBUsuarios;
