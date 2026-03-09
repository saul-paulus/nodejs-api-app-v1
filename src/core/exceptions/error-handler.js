import { StatusCodes } from 'http-status-codes';
import ApiError from './api-error.js';
import config from '../../config/index.js';
import { errorResponse } from '../utils/response-formatter.js';

/**
 * Middleware untuk mengubah exception default menjadi format response yang seragam
 */
export const errorHandler = (err, req, res, _next) => {
  let { statusCode, message } = err;

  // Jika error bukan dari form ApiError (misal: SyntaxError atau runtime error dari library)
  if (!(err instanceof ApiError)) {
    statusCode = err.statusCode || StatusCodes.INTERNAL_SERVER_ERROR;
    message = err.message || 'Internal Server Error';

    // Jangan bocorkan detail error ke user pada produksi
    if (config.env === 'production' && !err.isOperational) {
      statusCode = StatusCodes.INTERNAL_SERVER_ERROR;
      message = 'Terjadi kesalahan sistem internal';
    }
  }

  res.locals.errorMessage = err.message;

  const response = errorResponse(message, err.errors);

  // Tambahkan stack trace jika bukan produksi (untuk mempermudah debugging)
  if (config.env === 'development') {
    response.stack = err.stack;
  }

  res.status(statusCode).send(response);
};
