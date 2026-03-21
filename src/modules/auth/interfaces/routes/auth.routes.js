import express from 'express';
import validate from '#/shared/middleware/validateMiddleware.js';
import { userLoginValidation } from '../../infrastructure/validation/auth.validation.js';

export default ({ authController }) => {
  const router = express.Router();

  /**
   * @swagger
   * /auth/login:
   *   post:
   *     summary: Login user to get access token
   *     tags: [Auth]
   *     requestBody:
   *       required: true
   *       content:
   *         application/json:
   *           schema:
   *             type: object
   *             required:
   *               - id_personal
   *               - password
   *             properties:
   *               id_personal:
   *                 type: string
   *                 example: admin
   *               password:
   *                 type: string
   *                 example: password123
   *     responses:
   *       200:
   *         description: Login successful
   *       401:
   *         description: Invalid credentials
   */
  router.post('/login', validate(userLoginValidation), authController.handlerLoginUser.bind(authController));

  return router;
};
