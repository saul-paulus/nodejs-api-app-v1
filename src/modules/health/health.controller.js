import { StatusCodes } from 'http-status-codes';
import { successResponse } from '../../core/utils/response-formatter.js';

class HealthController {
  // Nanti constructor ini berguna kalau butuh inject 'SomeService'
  // constructor(/*{ someService }*/) {
  // this.someService = someService;
  // }

  /**
   * Cek API status
   */
  check(req, res, next) {
    try {
      const data = {
        uptime: process.uptime(),
        message: 'OK',
        timestamp: Date.now(),
      };

      res.status(StatusCodes.OK).json(successResponse(data, 'API is healthy.'));
    } catch (error) {
      next(error);
    }
  }
}

export default HealthController;
