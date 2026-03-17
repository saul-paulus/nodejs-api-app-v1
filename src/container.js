import { createContainer, InjectionMode, asValue, Lifetime, asFunction } from 'awilix';
import prisma from './infrastructure/database/prisma.js';

export const setupDIContainer = async () => {
  const container = createContainer({
    injectionMode: InjectionMode.PROXY,
  });

  container.register({
    prisma: asValue(prisma),
  });

  await container.loadModules(['modules/**/application/usecases/*.js', 'modules/**/infrastructure/repositories/*.js', 'modules/**/infrastructure/security/*.js', 'modules/**/interfaces/controllers/*.js', 'modules/**/interfaces/routes/*.js'], {
    formatName: 'camelCase',
    resolverOptions: {
      lifetime: Lifetime.SCOPED,
    },
    cwd: 'src',
    esModules: true,
  });

  container.register({
    /*
      ========================== Management User ============================
    */
    userRepository: asFunction(({ prismaUserRepository }) => prismaUserRepository).scoped(),
    registerUser: asFunction(({ createUserUseCase }) => createUserUseCase).scoped(),
    getUsers: asFunction(({ getUsersUseCase }) => getUsersUseCase).scoped(),
    getUserByIdPersonal: asFunction(({ getUserByIdPersonalUseCase }) => getUserByIdPersonalUseCase).scoped(),
    deleteUser: asFunction(({ deleteUserUseCase }) => deleteUserUseCase).scoped(),
    updateUser: asFunction(({ updateUserUseCase }) => updateUserUseCase).scoped(),
    /*
     ========================== Authenticate User ============================
    */
    loginUser: asFunction(({ loginUserUseCase }) => loginUserUseCase).scoped(),
  });

  return container;
};
