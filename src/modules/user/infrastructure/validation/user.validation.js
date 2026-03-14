import Joi from 'joi';

const userRegistrasiValidation = Joi.object({
  username: Joi.string().max(255).required(),
  id_personal: Joi.string().max(255).required(),
  password: Joi.string().max(255).required(),
  codeuker: Joi.string().max(255).required(),
  id_wewenang: Joi.number().integer().required(),
});

export { userRegistrasiValidation };
