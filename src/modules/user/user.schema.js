/**
 * @openapi
 * paths:
 *   /users:
 *     get:
 *       tags:
 *         - Users
 *       summary: Get all users
 *       responses:
 *         '200':
 *           description: A list of users
 *           content:
 *             application/json:
 *               schema:
 *                 type: array
 *                 items:
 *                   type: object
 *                   properties:
 *                     id:
 *                       type: integer
 *                     username:
 *                       type: string
 *                     id_personal:
 *                       type: string
 *                     password:
 *                       type: string
 *                     role:
 *                       type: string
 *                     id_role:
 *                       type: string
 *                     codeuker:
 *                       type: String
 *                     created_at:
 *                       type: string
 *                     updated_at:
 *                       type: string
 *         '500':
 *           description: Internal server error
 *
 *     post:
 *       tags:
 *         - Users
 *       summary: Create a new user
 *       requestBody:
 *         required: true
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 username:
 *                   type: string
 *                 id_personal:
 *                   type: string
 *                 password:
 *                   type: string
 *       responses:
 *         '201':
 *           description: User created successfully
 *           content:
 *             application/json:
 *               schema:
 *                 type: object
 *                 properties:
 *                   id:
 *                     type: integer
 *                   username:
 *                     type: string
 *                   id_personal:
 *                     type: string
 *                   password:
 *                     type: string
 *                   role:
 *                     type: integer
 *                   created_at:
 *                     type: string
 *                   updated_at:
 *                     type: string
 *         '400':
 *           description: Bad request
 *         '500':
 *           description: Internal server error
 *
 *   /users/{id}:
 *     get:
 *       tags:
 *         - Users
 *       summary: Get a user by id
 *       parameters:
 *         - name: id
 *           in: path
 *           required: true
 *           schema:
 *             type: integer
 *       responses:
 *         '200':
 *           description: User found successfully
 *           content:
 *             application/json:
 *               schema:
 *                 type: object
 *                 properties:
 *                   id:
 *                     type: integer
 *                   username:
 *                     type: string
 *                   id_personal:
 *                     type: string
 *                   password:
 *                     type: string
 *                   role:
 *                     type: integer
 *                   created_at:
 *                     type: string
 *                   updated_at:
 *                     type: string
 *         '404':
 *           description: User not found
 *         '500':
 *           description: Internal server error
 *
 *     put:
 *       tags:
 *         - Users
 *       summary: Update a user
 *       parameters:
 *         - name: id
 *           in: path
 *           required: true
 *           schema:
 *             type: integer
 *       requestBody:
 *         required: true
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 username:
 *                   type: string
 *                 id_personal:
 *                   type: string
 *                 password:
 *                   type: string
 *                 role:
 *                   type: integer
 *       responses:
 *         '200':
 *           description: User updated successfully
 *           content:
 *             application/json:
 *               schema:
 *                 type: object
 *                 properties:
 *                   id:
 *                     type: integer
 *                   username:
 *                     type: string
 *                   id_personal:
 *                     type: string
 *                   password:
 *                     type: string
 *                   role:
 *                     type: integer
 *                   created_at:
 *                     type: string
 *                   updated_at:
 *                     type: string
 *         '400':
 *           description: Bad request
 *         '500':
 *           description: Internal server error
 *
 *     patch:
 *       tags:
 *         - Users
 *       summary: Update a user
 *       parameters:
 *         - name: id
 *           in: path
 *           required: true
 *           schema:
 *             type: integer
 *       requestBody:
 *         required: true
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 username:
 *                   type: string
 *                 id_personal:
 *                   type: string
 *                 password:
 *                   type: string
 *                 role:
 *                   type: integer
 *       responses:
 *         '200':
 *           description: User updated successfully
 *           content:
 *             application/json:
 *               schema:
 *                 type: object
 *                 properties:
 *                   id:
 *                     type: integer
 *                   username:
 *                     type: string
 *                   id_personal:
 *                     type: string
 *                   password:
 *                     type: string
 *                   role:
 *                     type: integer
 *                   created_at:
 *                     type: string
 *                   updated_at:
 *                     type: string
 *
 *     delete:
 *       tags:
 *         - Users
 *       summary: Delete a user
 *       parameters:
 *         - name: id
 *           in: path
 *           required: true
 *           schema:
 *             type: integer
 *       responses:
 *         '204':
 *           description: User deleted successfully
 *         '404':
 *           description: User not found
 *         '500':
 *           description: Internal server error
 */
