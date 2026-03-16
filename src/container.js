import { createContainer, InjectionMode, asValue, asFunction, Lifetime } from 'awilix';
import prisma from './infrastructure/database/prisma.js';

/**
 * Fungsi untuk melakukan registrasi seluruh dependency aplikasi
 */
export const setupDIContainer = async () => {
  const container = createContainer({
    injectionMode: InjectionMode.PROXY,
  });

  // Registrasi Core Dependencies
  container.register({
    prisma: asValue(prisma),
  });

  // Auto-load Modules
  await container.loadModules(['modules/**/application/usecases/*.js', 'modules/**/infrastructure/repositories/*.js', 'modules/**/infrastructure/security/*.js', 'modules/**/interfaces/controllers/*.js', 'modules/**/interfaces/routes/*.js'], {
    formatName: 'camelCase',
    resolverOptions: {
      lifetime: Lifetime.SCOPED,
    },
    cwd: 'src',
    esModules: true,
  });

  // Alias concrete repository implementation to the port name `userRepository`
  // so use-cases expecting `userRepository` keep working.
  try {
    container.register({
      userRepository: asFunction((cradle) => cradle.prismaUserRepository).scoped(),
    });
  } catch (e) {
    // ignore if prismaUserRepository not present (module not loaded)
  }

  return container;
};
