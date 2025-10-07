import Joi from 'joi';
export const userBodyValidation = Joi.object({

  email: Joi.string().min(8).max(50).pattern(/^[A-Za-z0-9.]+@[A-Za-z0-9.]+$/).required()
  .messages({ "string.pattern.base": "El Email solo puede contener numeros, letras y el @"}),

  password: Joi.string().min(8).max(30).required().messages({ "string.min": "La contraseña es demasiado corta, debe tener mínimo 8 caracteres"})
}).options({
  allowUnknown: false,
  stripUnknown: true,
  abortEarly: false
  });
