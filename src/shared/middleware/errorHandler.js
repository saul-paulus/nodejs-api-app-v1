import { StatusCodes } from 'http-status-codes';
import logger from '../../config/logger.js';
import { errorResponse } from '../utils/apiResponse.js';

export default (err, req, res, _next) => {
  let { statusCode, message } = err;

  // Log error stack for debugging (Internal/Server)
  logger.error(err.stack || err.message);

  if (!statusCode) {
    statusCode = StatusCodes.INTERNAL_SERVER_ERROR;
    // Hide original message in production for non-operational errors
    if (process.env.NODE_ENV === 'production' && !err.isOperational) {
      message = 'Internal Server Error';
    }
  }

  res.locals.errorMessage = err.message;

  const isDevelopment = process.env.NODE_ENV === 'development';
  const response = errorResponse(statusCode, message, isDevelopment ? { stack: err.stack, details: err.errors || null } : err.errors || null);

  res.status(statusCode).send(response);
};
