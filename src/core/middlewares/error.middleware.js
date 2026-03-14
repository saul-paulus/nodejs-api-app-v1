import { StatusCodes } from 'http-status-codes';
import ApiError from '../exceptions/api-error.js';
import config from '../../config/index.js';
import logger from '../../config/logger.js';
import { errorResponse } from '../utils/responseApi.js';

/**
 * Error Middleware
 * Digunakan untuk menangkap semua error yang dilempar (throw) dari controller atau middleware sebelumnya.
 * Middleware ini HARUS diletakkan di paling akhir (setelah semua route) dalam stack Express.
 */
const errorMiddleware = (err, req, res, _next) => {
  const statusCode = err.statusCode || err.responseCode || StatusCodes.INTERNAL_SERVER_ERROR;
  let { message } = err;
  const errors = err.errors || null;

  // Logging error untuk kebutuhan debugging
  logger.error(`${statusCode} - ${message} - ${req.originalUrl} - ${req.method} - ${req.ip}`);
  if (config.env === 'development') {
    logger.error(err.stack);
  }

  // Sembunyikan detail error jika di Production demi keamanan
  if (config.env === 'production' && !(err instanceof ApiError)) {
    message = 'Terjadi kesalahan internal pada server';
  }

  // Gunakan formatter errorResponse agar format JSON selalu konsisten
  const finalResponse = errorResponse(statusCode, message, errors);

  // Jika di development, sertakan stack trace
  if (config.env === 'development') {
    finalResponse.stack = err.stack;
  }

  res.status(statusCode).json(finalResponse);
};

export default errorMiddleware;
