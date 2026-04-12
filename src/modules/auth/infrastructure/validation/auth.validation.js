import Joi from 'joi';

const userLoginValidation = {
  body: Joi.object().keys({
    id_personal: Joi.string().max(100).required(),
    password: Joi.string().max(100).required(),
  }),
};

export { userLoginValidation };
