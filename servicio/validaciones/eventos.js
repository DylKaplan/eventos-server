import Joi from 'joi';

export const validarEvento = (evento) => {
    const eventoSchema = Joi.object({
        nombre: Joi.string().required(),
        lugar: Joi.string().required(),
        equipamiento: Joi.string().allow(null, ''),
        fecha: Joi.date().iso().required(),
        cantidad_personas: Joi.number().integer().min(1).required(),
    });

    const { error } = eventoSchema.validate(evento);
    if (error) {
        return { result: false, error };
    }

    return { result: true };
};
