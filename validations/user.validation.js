import Joi from 'joi';
export const userBodyValidation = Joi.object({

  email: Joi.string().min(3).max(50).required(),
  password: Joi.string().min(3).max(20).required()
});
