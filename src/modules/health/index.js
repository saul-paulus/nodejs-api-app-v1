import { asClass, asFunction } from 'awilix';
import HealthController from './health.controller.js';
import healthRoutes from './health.routes.js';

/**
 * Mendaftarkan controller dan router dari modul health ke container utama
 */
export const register = (container) => {
  container.register({
    healthController: asClass(HealthController).scoped(),
    healthRouter: asFunction(healthRoutes).singleton(),
  });
};
