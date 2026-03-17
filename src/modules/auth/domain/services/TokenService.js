import ApiError from '@/shared/errors/ApiError.js';

export class TokenService {
  generateAccessToken(payload) {
    throw new ApiError(401, 'Not Implement for token generate');
  }

  verifyAccessToken(token) {
    throw new ApiError(401, 'Not Implement for token generate');
  }
}
