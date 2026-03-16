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
