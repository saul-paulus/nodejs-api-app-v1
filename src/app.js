import express from 'express';
import cors from 'cors';
import helmet from 'helmet';
import {
    StatusCodes
} from 'http-status-codes';
import {
    errorHandler
} from './core/exceptions/error-handler.js';
import ApiError from './core/exceptions/api-error.js';
import swaggerUi from 'swagger-ui-express';
import swaggerSpec from './swagger.js';

/**
 * Membuat dan mengkonfigurasi aplikasi Express
 * @param {Object} container - Awilix DI Container
 * @returns {express.Application}
 */
export const createApp = (container) => {
    const app = express();

    // =====================
    // GOBAL MIDDLEWARES
    // =====================
    app.use(
        helmet({
            contentSecurityPolicy: false,
        })
    );
    app.use(cors());
    app.use(express.json()); // Parsing application/json
    app.use(
        express.urlencoded({
            extended: true,
        }),
    ); // Parsing application/x-www-form-urlencoded

    // =====================
    // ROUTES REGISTRATION
    // =====================
    // Tarik router yang telah di-inject dari container
    const healthRouter = container.resolve('healthRouter');

    // Daftarkan route dengan prefix (Contoh V1 API)
    app.use('/api/v1/health', healthRouter);

    // Swagger
    app.use('/api-docs', swaggerUi.serve, swaggerUi.setup(swaggerSpec));

    // =====================
    // 404 & ERROR HANDLING
    // =====================

    // Route Tidak Ditemukan
    app.use((req, res, next) => {
        next(new ApiError(StatusCodes.NOT_FOUND, 'API Route tidak ditemukan'));
    });

    // Global Error Handler
    app.use(errorHandler);

    return app;
};