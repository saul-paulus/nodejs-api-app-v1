/**
 * Format standar untuk API Response sukses
 * @param {any} data - Datanya (Array/Object/String)
 * @param {string} message - Pesan sukses
 */
export const successResponse = (
  data = null,
  message = 'The request has been processed successfully',
  status = 200,
  meta = [],
  links = [],
) => {
  return {
    success: true,
    responseCode: status,
    message,
    data,
    meta,
    links,
  };
};

/**
 * Format standar untuk API Response gagal/error
 * @param {string} message - Pesan error utama
 * @param {Array|Object} errors - Detail error (Misal validasi field gagal)
 */
export const errorResponse = (message = 'Error', status = 400, errors = null) => {
  const response = {
    success: false,
    responseCode: status,
    message,
  };

  if (errors) {
    response.errors = errors;
  }

  return response;
};
