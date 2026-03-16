import express from 'express';
import cors from 'cors';
import helmet from 'helmet';
import { StatusCodes } from 'http-status-codes';
import swaggerUi from 'swagger-ui-express';
import errorMiddleware from './shared/middlewares/error.middleware.js';
import ApiError from './shared/exceptions/api-error.js';
import swaggerSpec from './swagger.js';

/**
 * Membuat dan mengkonfigurasi aplikasi Express
 * @param {Object} container - Awilix DI Container
 * @returns {express.Application}
 */
export const createApp = (container) => {
  const app = express();

  // =====================
  // GLOBAL MIDDLEWARES
  // =====================
  app.use(
    helmet({
      contentSecurityPolicy: false,
    }),
  );
  app.use(cors());
  app.use(express.json());
  app.use(
    express.urlencoded({
      extended: true,
    }),
  );

  // =====================
  // ROUTES REGISTRATION
  // =====================
  // Daftarkan route dengan prefix (Contoh V1 API)
  app.use('/api/v1/health', container.resolve('healthRoutes'));
  app.use('/api/v1/users', container.resolve('userRoutes'));

  // Swagger
  app.use('/api-docs', swaggerUi.serve, swaggerUi.setup(swaggerSpec));

  // =====================
  // 404 & ERROR HANDLING
  // =====================
  app.use((req, res, next) => {
    next(new ApiError(StatusCodes.NOT_FOUND, 'API Route tidak ditemukan'));
  });

  app.use(errorMiddleware);

  return app;
};
