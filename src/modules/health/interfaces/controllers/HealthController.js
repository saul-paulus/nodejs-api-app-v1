import { StatusCodes } from 'http-status-codes';
import { successResponse } from '@/shared/utils/responseApi.js';

export default class HealthController {
  constructor({ getHealthStatus }) {
    this.getHealthStatus = getHealthStatus;
  }

  async check(req, res, next) {
    try {
      const data = await this.getHealthStatus.execute();
      res.status(StatusCodes.OK).json(successResponse(StatusCodes.OK, 'Health success', data));
    } catch (error) {
      next(error);
    }
  }
}
