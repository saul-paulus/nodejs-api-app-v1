/**
 * Kelas custom untuk menangani error spesifik dari aplikasi API (Operational Errors).
 */
class ApiError extends Error {
  constructor(responseCode, message, isOperational = true, stack = '', errors = null) {
    super(message);
    this.responseCode = responseCode;
    this.isOperational = isOperational;
    this.errors = errors;

    // Gunakan custom stack trace bila tersedia
    if (stack) {
      this.stack = stack;
    } else {
      Error.captureStackTrace(this, this.constructor);
    }
  }
}

export default ApiError;
