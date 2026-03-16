import Joi from 'joi';

const userRegistrasiValidation = Joi.object({
  username: Joi.string().max(255).required(),
  id_personal: Joi.string().max(255).required(),
  password: Joi.string().max(255).required(),
  codeuker: Joi.string().max(255).required(),
  id_role: Joi.number().integer().required(),
});

const userUpdateValidation = Joi.object({
  username: Joi.string().max(255).required(),
  codeuker: Joi.string().max(255).required(),
  id_role: Joi.number().integer().required(),
});

export { userRegistrasiValidation, userUpdateValidation };
