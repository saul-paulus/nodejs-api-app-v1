import { asClass, asFunction } from 'awilix';
import UserController from './infrastructure/http/user.controller.js';
import userRoutes from './infrastructure/http/user.routes.js';
import userService from './application/use-cases/user.service.js';
import userRepository from './infrastructure/persistence/prisma-user.repository.js';

export const register = (container) => {
  container.register({
    userRepository: asFunction(userRepository).scoped(),
    userService: asFunction(userService).scoped(),
    userController: asClass(UserController).scoped(),
    userRouter: asFunction(userRoutes).singleton(),
  });
};
