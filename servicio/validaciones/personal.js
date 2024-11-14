import Joi from 'joi'

export const validarPersonal = (personal) => {
    const personalSchema = Joi.object({
        nombre: Joi.string().required(),
        apellido: Joi.string().required(),
        dni: Joi.string().length(8).pattern(/^[0-9]+$/).required(),
        fecha_nacimiento: Joi.date().iso().required(),
        ocupacion: Joi.string().required(),
    });

    const { error } = personalSchema.validate(personal);
    if (error) {
      return { result: false, error };
    }

    return { result: true };
};
