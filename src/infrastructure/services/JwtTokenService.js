import jwt from 'jsonwebtoken';
import ApiError from '@/shared/errors/ApiError.js';
import { TokenService } from '@/modules/auth/domain/services/TokenService.js';

export default class JwtTokenService extends TokenService {
  constructor() {
    super();
    this.secret = process.env.JWT_SECRET;
    this.expiresIn = '1h';

    if (!this.secret) {
      throw new Error('JWT_SECRET is not defined in environment variables');
    }
  }

  generateAccessToken(payload) {
    return jwt.sign(payload, this.secret, {
      expiresIn: this.expiresIn,
    });
  }

  verifyAccessToken(token) {
    try {
      return jwt.verify(token, this.secret);
    } catch (error) {
      throw new ApiError(401, 'Token is invalid or expired');
    }
  }
}
