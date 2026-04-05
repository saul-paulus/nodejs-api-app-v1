import { StatusCodes } from 'http-status-codes';
import { successResponse } from '#/shared/utils/apiResponse.js';

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
