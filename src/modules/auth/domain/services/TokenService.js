import ApiError from '#/shared/errors/ApiError.js';

export class TokenService {
  generateAccessToken(_payload) {
    throw new ApiError(401, 'Not Implement for token generate');
  }

  verifyAccessToken(_token) {
    throw new ApiError(401, 'Not Implement for token generate');
  }
}
