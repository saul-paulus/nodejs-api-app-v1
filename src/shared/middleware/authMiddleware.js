import { StatusCodes } from 'http-status-codes';
import ApiError from '../errors/ApiError.js';

const authMiddleware = ({ tokenService }) => {
  return (req, _res, next) => {
    const authHeader = req.headers.authorization;

    if (!authHeader || !authHeader.startsWith('Bearer ')) {
      return next(new ApiError(StatusCodes.UNAUTHORIZED, 'Authentication failed: No token provided'));
    }

    const token = authHeader.split(' ')[1];

    try {
      const decoded = tokenService.verifyAccessToken(token);
      req.user = decoded;
      return next();
    } catch (error) {
      return next(new ApiError(StatusCodes.UNAUTHORIZED, error.message || 'Authentication failed: Token is invalid or expired'));
    }
  };
};

export default authMiddleware;
