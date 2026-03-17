import Joi from 'joi';
import ApiError from '@/shared/errors/ApiError.js';

export default (schema) => (req, res, next) => {
  const validSchema = {};
  Object.keys(schema).forEach((key) => {
    validSchema[key] = schema[key];
  });

  const { value, error } = Joi.compile(validSchema)
    .prefs({ errors: { label: 'key' }, abortEarly: false, allowUnknown: true })
    .validate({
      params: req.params,
      query: req.query,
      body: req.body,
    });

  if (error) {
    const errorMessage = error.details.map((details) => details.message).join(', ');
    return next(new ApiError(400, errorMessage));
  }

  if (value.params) Object.assign(req.params, value.params);
  if (value.query) Object.assign(req.query, value.query);
  if (value.body) req.body = value.body;

  return next();
};
