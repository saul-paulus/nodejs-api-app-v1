/**
 * @openapi
 * paths:
 *   /api/v1/user:
 *     post:
 *       tags:
 *         - Users
 *       summary: Register user
 *       requestBody:
 *         required: true
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               required:
 *                 - username
 *                 - id_personal
 *                 - password
 *                 - codeuker
 *                 - id_wewenang
 *               properties:
 *                 username:
 *                   type: string
 *                 id_personal:
 *                   type: string
 *                 password:
 *                   type: string
 *                 codeuker:
 *                   type: string
 *                 id_wewenang:
 *                   type: integer
 *       responses:
 *         '201':
 *           description: User created successfully
 *           content:
 *             application/json:
 *               schema:
 *                 type: object
 *                 properties:
 *                   success:
 *                     type: boolean
 *                   responseCode:
 *                     type: integer
 *                   message:
 *                     type: string
 *                   data:
 *                     type: object
 *                     properties:
 *                       username:
 *                         type: string
 *                       id_personal:
 *                         type: string
 *         '400':
 *           description: Bad request
 *         '500':
 *           description: Internal server error
 *     get:
 *       tags:
 *         - Users
 *       summary: Get all users
 *       responses:
 *         '200':
 *           description: List of users retrieved successfully
 *           content:
 *             application/json:
 *               schema:
 *                 type: object
 *                 properties:
 *                   success:
 *                     type: boolean
 *                   responseCode:
 *                     type: integer
 *                   message:
 *                     type: string
 *                   data:
 *                     type: array
 *                     items:
 *                       type: object
 *                       properties:
 *                         username:
 *                           type: string
 *                         id_personal:
 *                           type: string
 *   /api/v1/user/{idPersonal}:
 *     get:
 *       tags:
 *         - Users
 *       summary: Get user by Personal ID
 *       parameters:
 *         - in: path
 *           name: idPersonal
 *           required: true
 *           schema:
 *             type: string
 *           description: The user's personal ID
 *       responses:
 *         '200':
 *           description: User retrieved successfully
 *           content:
 *             application/json:
 *               schema:
 *                 type: object
 *                 properties:
 *                   success:
 *                     type: boolean
 *                   responseCode:
 *                     type: integer
 *                   message:
 *                     type: string
 *                   data:
 *                     type: object
 *                     properties:
 *                       username:
 *                         type: string
 *                       id_personal:
 *                         type: string
 *         '404':
 *           description: User not found
 *         '500':
 *           description: Internal server error
 */
