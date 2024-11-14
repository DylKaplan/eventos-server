import Joi from 'joi';

export const validarLogin = (loginData) => {
    const loginSchema = Joi.object({
        user: Joi.string().required(),
        password: Joi.string().required(),
    });

    const { error } = loginSchema.validate(loginData);
    if (error) {
        return { result: false, error };
    }

    return { result: true };
};

export const validarRegistro = (registroData) => {
    const registroSchema = Joi.object({
        user: Joi.string().required(),
        password: Joi.string().min(6).required()
    });

    const { error } = registroSchema.validate(registroData);
    if (error) {
        return { result: false, error };
    }

    return { result: true };
};
