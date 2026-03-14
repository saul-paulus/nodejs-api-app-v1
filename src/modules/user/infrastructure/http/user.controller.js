import { StatusCodes } from 'http-status-codes';
import { successResponse } from '../../../../core/utils/responseApi.js';

class UserController {
  constructor({ userService }) {
    this.userService = userService;
  }

  async register(req, res, next) {
    try {
      const result = await this.userService.userRegister(req.body);

      res
        .status(StatusCodes.CREATED)
        .json(
          successResponse(
            StatusCodes.CREATED,
            'The request has been processed successfully',
            result,
          ),
        );
    } catch (error) {
      next(error);
    }
  }

  async handlerGetUsers(req, res, next) {
    try {
      const users = await this.userService.getUsers();

      res
        .status(StatusCodes.OK)
        .json(successResponse(StatusCodes.OK, 'Users retrieved successfully', users));
    } catch (error) {
      next(error);
    }
  }

  async handlerGetUser(req, res, next) {
    try {
      const { idPersonal } = req.params;
      const user = await this.userService.getUser(idPersonal);

      res
        .status(StatusCodes.OK)
        .json(successResponse(StatusCodes.OK, 'User retrieved successfully', user));
    } catch (error) {
      next(error);
    }
  }
}

export default UserController;
