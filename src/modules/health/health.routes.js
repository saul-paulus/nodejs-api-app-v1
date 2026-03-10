import express from 'express';

/**
 * Route untuk health check module
 * @param {Object} opts - Container Awilix.
 */
export default ({
    healthController
}) => {
    const router = express.Router();

    // Awilix akan secara otomatis men-inject 'healthController' ke sini

    /**
     * @openapi
     * /api/v1/health:
     *   get:
     *     tags:
     *       - Health
     *     summary: Check API Health Status
     *     description: Endpoint untuk mengecek status kesehatan dan uptime dari API
     *     responses:
     *       200:
     *         description: API is healthy
     *         content:
     *           application/json:
     *             schema:
     *               type: object
     *               properties:
     *                 status:
     *                   type: integer
     *                   example: 200
     *                 message:
     *                   type: string
     *                   example: API is healthy.
     *                 data:
     *                   type: object
     *                   properties:
     *                     uptime:
     *                       type: number
     *                       example: 123.456
     *                     message:
     *                       type: string
     *                       example: OK
     *                     timestamp:
     *                       type: integer
     *                       example: 1678901234567
     */
    router.get('/', (req, res, next) => healthController.check(req, res, next));

    return router;
};