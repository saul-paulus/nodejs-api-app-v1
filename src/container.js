import { createContainer, InjectionMode, asValue } from 'awilix';
import prisma from './infrastructure/database/index.js';

// Registrasi masing-masing modul
import * as healthModule from './modules/health/index.js';
import * as userModule from './modules/user/index.js';

/**
 * Fungsi untuk melakukan registrasi seluruh dependency aplikasi
 */
export const setupDIContainer = () => {
  // Buat container secara global (InjectionMode.PROXY sangat disarankan untuk clean architecture)
  const container = createContainer({
    injectionMode: InjectionMode.PROXY,
  });
  // Registrasi Core Dependencies (Konfig DB, Logger, dsb bisa ditaruh di sini nantinya)
  container.register({
    prisma: asValue(prisma),
  });

  // Registrasi Modul-modul fitur
  healthModule.register(container);
  userModule.register(container);

  return container;
};
