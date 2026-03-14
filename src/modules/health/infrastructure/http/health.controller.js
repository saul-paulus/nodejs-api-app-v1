import { StatusCodes } from 'http-status-codes';
import { successResponse } from '../../../../core/utils/responseApi.js';

class HealthController {
  constructor({ healthService }) {
    this.healthService = healthService;
  }

  /**
   * Cek API status
   */
  async check(req, res, next) {
    try {
      const data = await this.healthService.getHealthStatus();

      res.status(StatusCodes.OK).json(successResponse(StatusCodes.OK, 'Health success', data));
    } catch (error) {
      next(error);
    }
  }
}

export default HealthController;
