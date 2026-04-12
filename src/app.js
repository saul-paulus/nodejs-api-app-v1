import express from 'express';
import cors from 'cors';
import helmet from 'helmet';
import { StatusCodes } from 'http-status-codes';
import swaggerUi from 'swagger-ui-express';
import errorHandler from './shared/middleware/errorHandler.js';
import ApiError from './shared/errors/ApiError.js';
import swaggerSpec from './swagger.js';

export const createApp = (container) => {
  const app = express();

  app.use(
    helmet({
      contentSecurityPolicy: {
        directives: {
          ...helmet.contentSecurityPolicy.getDefaultDirectives(),
          'script-src': ["'self'", "'unsafe-inline'"],
          'style-src': ["'self'", "'unsafe-inline'"],
          'img-src': ["'self'", 'data:', 'validator.swagger.io'],
        },
      },
    }),
  );
  app.use(cors());
  app.use(express.json());
  app.use(express.urlencoded({ extended: true }));

  // Routes
  app.use('/api/v1/health', container.resolve('healthRoutes'));
  app.use('/api/v1/users', container.resolve('userRoutes'));
  app.use('/api/v1/auth', container.resolve('authRoutes'));

  app.use('/api-docs', swaggerUi.serve, swaggerUi.setup(swaggerSpec));

  app.use((_req, _res, next) => {
    next(new ApiError(StatusCodes.NOT_FOUND, 'API Route tidak ditemukan'));
  });

  app.use(errorHandler);

  return app;
};
