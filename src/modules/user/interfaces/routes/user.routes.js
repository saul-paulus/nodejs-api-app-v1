import express from 'express';
import validate from '#/shared/middleware/validateMiddleware.js';
import { userRegistrasiValidation, userUpdateValidation } from '../../infrastructure/validation/user.validation.js';

export default ({ userController, authMiddleware }) => {
  const router = express.Router();

  router.use(authMiddleware);

  /**
   * @swagger
   * tags:
   *   name: Users
   *   description: API for managing users
   */

  /**
   * @swagger
   * /users:
   *   post:
   *     summary: Create a new user
   *     tags: [Users]
   *     security:
   *       - BearerAuth: []
   *     requestBody:
   *       required: true
   *       content:
   *         application/json:
   *           schema:
   *             $ref: '#/components/schemas/UserRequest'
   *     responses:
   *       201:
   *         description: User created successfully
   */
  router.post('/', validate(userRegistrasiValidation), userController.handlerCreateUser.bind(userController));

  /**
   * @swagger
   * /users:
   *   get:
   *     summary: Get paginated list of users
   *     tags: [Users]
   *     security:
   *       - BearerAuth: []
   *     parameters:
   *       - in: query
   *         name: page
   *         schema:
   *           type: integer
   *           default: 1
   *       - in: query
   *         name: limit
   *         schema:
   *           type: integer
   *           default: 10
   *     responses:
   *       200:
   *         description: List of users retrieved successfully
   */
  router.get('/', (req, res, next) => userController.handlerGetUsers(req, res, next));

  /**
   * @swagger
   * /users/auth/me:
   *   get:
   *     summary: Get current authenticated user profile
   *     tags: [Users]
   *     security:
   *       - BearerAuth: []
   *     responses:
   *       200:
   *         description: User profile retrieved successfully
   */
  router.get('/auth/me', userController.handlerGetMeUserAuth.bind(userController));

  /**
   * @swagger
   * /users/{idPersonal}:
   *   get:
   *     summary: Get user by Personal ID
   *     tags: [Users]
   *     security:
   *       - BearerAuth: []
   *     parameters:
   *       - in: path
   *         name: idPersonal
   *         required: true
   *         schema:
   *           type: string
   *     responses:
   *       200:
   *         description: User retrieved successfully
   */
  router.get('/:idPersonal', (req, res, next) => userController.handlerGetUserByIdPersonal(req, res, next));

  /**
   * @swagger
   * /users/{id}:
   *   delete:
   *     summary: Delete a user
   *     tags: [Users]
   *     security:
   *       - BearerAuth: []
   *     parameters:
   *       - in: path
   *         name: id
   *         required: true
   *         schema:
   *           type: integer
   *     responses:
   *       200:
   *         description: User deleted successfully
   */
  router.delete('/:id', (req, res, next) => userController.handlerDeleteUser(req, res, next));

  /**
   * @swagger
   * /users/{id}:
   *   put:
   *     summary: Update a user
   *     tags: [Users]
   *     security:
   *       - BearerAuth: []
   *     parameters:
   *       - in: path
   *         name: id
   *         required: true
   *         schema:
   *           type: integer
   *     requestBody:
   *       required: true
   *       content:
   *         application/json:
   *           schema:
   *             $ref: '#/components/schemas/UserUpdateRequest'
   *     responses:
   *       200:
   *         description: User updated successfully
   */
  router.put('/:id', validate(userUpdateValidation), userController.handlerUpdateUser.bind(userController));

  return router;
};
