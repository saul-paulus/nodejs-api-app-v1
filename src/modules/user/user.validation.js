import Joi from 'joi';

const userRegistrasiValidation = Joi.object({
  username: Joi.string().required(),
  id_personal: Joi.string().required(),
  password: Joi.string().required(),
  role: Joi.string().required(),
});

export default userRegistrasiValidation;
