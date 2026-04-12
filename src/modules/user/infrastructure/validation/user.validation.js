import Joi from 'joi';

export const userRegistrasiValidation = {
  body: Joi.object().keys({
    username: Joi.string().required(),
    id_personal: Joi.string().required(),
    password: Joi.string().required(),
    codeuker: Joi.string().required(),
    id_role: Joi.number().required(),
  }),
};

export const userUpdateValidation = {
  params: Joi.object().keys({
    id: Joi.number().required(),
  }),
  body: Joi.object().keys({
    username: Joi.string(),
    codeuker: Joi.string(),
    id_role: Joi.number(),
  }),
};
