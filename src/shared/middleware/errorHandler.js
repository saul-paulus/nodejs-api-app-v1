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

  const response = errorResponse(statusCode, message, process.env.NODE_ENV === 'development' ? { stack: err.stack } : null);

  res.status(statusCode).send(response);
};
