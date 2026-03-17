import { successResponse } from '@/shared/utils/apiResponse.js';
import { StatusCodes } from 'http-status-codes';

export default class AuthController {
  constructor({ loginUser }) {
    this.loginUser = loginUser;
  }

  async handlerLoginUser(req, res, next) {
    try {
      const result = await this.loginUser.execute(req.body);
      res.status(StatusCodes.OK).json(successResponse(StatusCodes.OK, 'User has been authenticated', result));
    } catch (error) {
      next(error);
    }
  }
}
