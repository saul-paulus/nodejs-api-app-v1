/**
 * Format standar untuk API Response sukses
 * @param {any} data - Datanya (Array/Object/String)
 * @param {string} message - Pesan sukses
 */
export const successResponse = (responseCode = 200, message = 'The request has been processed successfully', data = null, meta = [], links = []) => {
  return {
    success: true,
    responseCode: responseCode || 200,
    message: message || 'The request has been processed successfully',
    data: data || null,
    meta: meta || [],
    links: links || [],
  };
};

/**
 * Format standar untuk API Response gagal/error
 * @param {string} message - Pesan error utama
 * @param {Array|Object} errors - Detail error (Misal validasi field gagal)
 */
export const errorResponse = (responseCode = 400, message = 'The request has not been processed', errors = null) => {
  const response = {
    success: false,
    responseCode: responseCode || 400,
    message: message || 'The request has not been processed',
  };

  if (errors) {
    response.errors = errors;
  }

  return response;
};

export default {
  successResponse,
  errorResponse,
};
