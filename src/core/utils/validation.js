import { StatusCodes } from 'http-status-codes';
import ApiError from '../exceptions/api-error.js';

const validated = (schema, data) => {
  const { value, error } = schema.validate(data, {
    abortEarly: false,
    stripUnknown: true,
  });

  if (error) {
    const errors = error.details?.map((d) => ({
      field: d.path?.join('.') || d.context?.key,
      message: d.message,
      type: d.type,
    }));

    throw new ApiError(StatusCodes.BAD_REQUEST, 'Validation error', true, '', errors);
  }

  return value;
};

export default validated;
