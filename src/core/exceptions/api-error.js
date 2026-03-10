/**
 * Kelas custom untuk menangani error spesifik dari aplikasi API (Operational Errors).
 * Daripada menggunakan 'throw new Error()', gunakan ini untuk response yang lebih seragam.
 */
class ApiError extends Error {
    constructor(statusCode, message, isOperational = true, stack = '') {
        super(message);
        this.statusCode = statusCode;
        this.isOperational = isOperational;

        // Gunakan custom stack trace bila tersedia
        if (stack) {
            this.stack = stack;
        } else {
            Error.captureStackTrace(this, this.constructor);
        }
    }
}

export default ApiError;