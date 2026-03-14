import { asClass, asFunction } from 'awilix';
import HealthController from './infrastructure/http/health.controller.js';
import healthRoutes from './infrastructure/http/health.routes.js';
import healthService from './application/use-cases/health.service.js';

/**
 * Mendaftarkan service, controller dan router dari modul health ke container utama
 */
export const register = (container) => {
  container.register({
    healthService: asFunction(healthService).scoped(),
    healthController: asClass(HealthController).scoped(),
    healthRouter: asFunction(healthRoutes).singleton(),
  });
};
