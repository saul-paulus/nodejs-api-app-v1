import express from 'express';
import validate from '@/core/middlewares/validate.middleware.js';
import { userRegistrasiValidation, userUpdateValidation } from '../validation/user.validation.js';

export default ({ userController }) => {
  const router = express.Router();

  router.post('/', validate(userRegistrasiValidation), userController.handlerCreateUser.bind(userController));
  router.get('/', (req, res, next) => userController.handlerGetUsers(req, res, next));
  router.get('/:idPersonal', (req, res, next) => userController.handlerGetUserByIdPersonal(req, res, next));
  router.delete('/:id', (req, res, next) => userController.handlerDeleteUser(req, res, next));
  router.put('/:id', validate(userUpdateValidation), userController.handlerUpdateUser.bind(userController));

  return router;
};
