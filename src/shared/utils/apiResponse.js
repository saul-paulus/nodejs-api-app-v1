export const successResponse = (responseCode, message, data = null, meta = null, links = null) => {
  return {
    success: true,
    responseCode,
    message,
    data,
    ...(meta && { meta }),
    ...(links && { links }),
  };
};

export const errorResponse = (responseCode, message, errors = null) => {
  return {
    success: false,
    responseCode,
    message,
    ...(errors && { errors }),
  };
};
