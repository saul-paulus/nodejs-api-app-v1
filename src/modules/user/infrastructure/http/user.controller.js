import { StatusCodes } from 'http-status-codes';
import { successResponse } from '@/core/utils/responseApi.js';

class UserController {
  constructor({ userService }) {
    this.userService = userService;
  }

  async handlerCreateUser(req, res, next) {
    try {
      const result = await this.userService.userRegister(req.body);

      res.status(StatusCodes.CREATED).json(successResponse(StatusCodes.CREATED, 'The request has been processed successfully', result));
    } catch (error) {
      next(error);
    }
  }

  async handlerGetUsers(req, res, next) {
    try {
      const page = parseInt(req.query.page, 10) || 1;
      const limit = parseInt(req.query.limit, 10) || 10;

      const { users, total } = await this.userService.getUsers({ page, limit });

      const totalPages = Math.ceil(total / limit);

      const meta = {
        total,
        page,
        limit,
        totalPages,
      };

      const { protocol } = req;
      const host = req.get('host');
      const baseUrl = `${protocol}://${host}${req.baseUrl}`;

      const links = [
        { rel: 'self', href: `${baseUrl}?page=${page}&limit=${limit}` },
        { rel: 'first', href: `${baseUrl}?page=1&limit=${limit}` },
        { rel: 'last', href: `${baseUrl}?page=${totalPages || 1}&limit=${limit}` },
      ];

      if (page < totalPages) {
        links.push({ rel: 'next', href: `${baseUrl}?page=${page + 1}&limit=${limit}` });
      }

      if (page > 1) {
        links.push({ rel: 'prev', href: `${baseUrl}?page=${page - 1}&limit=${limit}` });
      }

      res.status(StatusCodes.OK).json(successResponse(StatusCodes.OK, 'List of users retrieved successfully', users, meta, links));
    } catch (error) {
      next(error);
    }
  }

  async handlerGetUserByIdPersonal(req, res, next) {
    try {
      const { idPersonal } = req.params;
      const user = await this.userService.getUserByIdPersonal(idPersonal);

      res.status(StatusCodes.OK).json(successResponse(StatusCodes.OK, 'User retrieved successfully', user));
    } catch (error) {
      next(error);
    }
  }

  async handlerDeleteUser(req, res, next) {
    try {
      const { id } = req.params;
      const user = await this.userService.deleteUser(Number(id));

      res.status(StatusCodes.OK).json(successResponse(StatusCodes.OK, 'User delete successfully', user));
    } catch (error) {
      next(error);
    }
  }

  async handlerUpdateUser(req, res, next) {
    try {
      const { id } = req.params;

      const user = await this.userService.updateUser(Number(id), req.body);

      res.status(StatusCodes.OK).json(successResponse(StatusCodes.OK, 'User update successfully', user));
    } catch (error) {
      next(error);
    }
  }
}

export default UserController;
