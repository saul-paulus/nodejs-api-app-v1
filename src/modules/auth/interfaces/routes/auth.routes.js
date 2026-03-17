import express from 'express';
import validate from '@/shared/middleware/validateMiddleware.js';
import { userLoginValidation } from '../../infrastructure/validation/auth.validation.js';

export default ({ authController }) => {
  const router = express.Router();

  router.post('/login', validate(userLoginValidation), authController.handlerLoginUser.bind(authController));

  return router;
};
