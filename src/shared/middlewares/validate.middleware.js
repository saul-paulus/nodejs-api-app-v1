import validated from '../utils/validation.js';

/**
 * Middleware untuk memvalidasi request body, query, atau params
 * @param {Object} schema - Joi schema object
 * @param {String} source - Sumber data ('body', 'query', 'params')
 */
const validate =
  (schema, source = 'body') =>
  (req, res, next) => {
    try {
      // Memvalidasi data menggunakan utilitas yang sudah ada
      // Jika validasi gagal, utilitas 'validated' akan melempar ApiError
      const validatedData = validated(schema, req[source]);

      // Update data di request dengan yang sudah divalidasi (sanitized)
      req[source] = validatedData;

      next();
    } catch (error) {
      next(error);
    }
  };

export default validate;
