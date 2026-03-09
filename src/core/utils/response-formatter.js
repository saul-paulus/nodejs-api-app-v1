/**
 * Format standar untuk API Response sukses
 * @param {any} data - Datanya (Array/Object/String)
 * @param {string} message - Pesan sukses
 */
const successResponse = (data = null, message = 'Success') => {
    return {
        success: true,
        message,
        data,
    };
};

/**
 * Format standar untuk API Response gagal/error
 * @param {string} message - Pesan error utama
 * @param {Array|Object} errors - Detail error (Misal validasi field gagal)
 */
const errorResponse = (message = 'Error', errors = null) => {
    const response = {
        success: false,
        message,
    };

    if (errors) {
        response.errors = errors;
    }

    return response;
};

module.exports = {
    successResponse,
    errorResponse,
};