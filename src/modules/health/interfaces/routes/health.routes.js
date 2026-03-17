import express from 'express';

export default ({ healthController }) => {
  const router = express.Router();

  /**
   * @swagger
   * /health:
   *   get:
   *     summary: Check API Health
   *     tags: [Health]
   *     responses:
   *       200:
   *         description: API is healthy
   *         content:
   *           application/json:
   *             schema:
   *               type: object
   *               properties:
   *                 success:
   *                   type: boolean
   *                 message:
   *                   type: string
   */
  router.get('/', (req, res, next) => healthController.check(req, res, next));

  return router;
};
