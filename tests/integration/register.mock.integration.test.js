import { jest, describe, it, expect, beforeAll } from '@jest/globals';
import supertest from 'supertest';
import { createContainer, InjectionMode, asValue, Lifetime, asFunction } from 'awilix';
import { createApp } from '@/app.js';

// Simple in-memory mock for Prisma 'users' model
const createMockPrisma = () => {
  const store = { users: [] };

  return {
    users: {
      async findUnique({ where }) {
        if (where.id_personal) return store.users.find((u) => u.id_personal === where.id_personal) || null;
        if (where.id) return store.users.find((u) => u.id === where.id) || null;
        return null;
      },
      async create({ data, select }) {
        const user = { id: store.users.length + 1, ...data };
        store.users.push(user);
        if (select) {
          const res = {};
          Object.keys(select).forEach((k) => {
            if (select[k]) res[k] = user[k];
          });
          return res;
        }
        return user;
      },
      async deleteMany() {
        store.users = [];
        return { count: 0 };
      },
      async findMany({ select } = {}) {
        if (select)
          return store.users.map((u) => {
            const r = {};
            Object.keys(select).forEach((k) => {
              if (select[k]) r[k] = u[k];
            });
            return r;
          });
        return store.users;
      },
      async count() {
        return store.users.length;
      },
    },
    // prisma clients sometimes use $disconnect
    async $disconnect() {
      /* noop */
    },
  };
};

describe('Integration (mocked prisma): POST /api/v1/users', () => {
  let app;
  let container;

  beforeAll(async () => {
    const mockPrisma = createMockPrisma();

    container = createContainer({ injectionMode: InjectionMode.PROXY });
    // register mock prisma before loading modules so repositories receive it
    container.register({ prisma: asValue(mockPrisma) });

    // load app modules (usecases, repos, controllers, routes)
    await container.loadModules(['modules/**/application/usecases/*.js', 'modules/**/infrastructure/repositories/*.js', 'modules/**/infrastructure/security/*.js', 'modules/**/interfaces/controllers/*.js', 'modules/**/interfaces/routes/*.js'], {
      formatName: 'camelCase',
      resolverOptions: { lifetime: Lifetime.SCOPED },
      cwd: 'src',
      esModules: true,
    });

    // Register aliases as in real container.js
    container.register({
      userRepository: asFunction(({ prismaUserRepository }) => prismaUserRepository).scoped(),
      registerUser: asFunction(({ createUserUseCase }) => createUserUseCase).scoped(),
      getUsers: asFunction(({ getUsersUseCase }) => getUsersUseCase).scoped(),
      getUserByIdPersonal: asFunction(({ getUserByIdPersonalUseCase }) => getUserByIdPersonalUseCase).scoped(),
      deleteUser: asFunction(({ deleteUserUseCase }) => deleteUserUseCase).scoped(),
      updateUser: asFunction(({ updateUserUseCase }) => updateUserUseCase).scoped(),
    });

    app = createApp(container);
  });

  it('creates a user then rejects duplicate id_personal', async () => {
    const userData = {
      username: 'mock user',
      id_personal: 'mock123',
      password: 'secret',
      codeuker: '02',
      id_role: 1,
    };

    const res1 = await supertest(app).post('/api/v1/users').send(userData);
    if (res1.status !== 201) console.error('FAIL res1:', res1.body);
    expect(res1.status).toBe(201);
    expect(res1.body.success).toBe(true);

    // Second attempt should fail with duplicate id_personal
    const res2 = await supertest(app).post('/api/v1/users').send(userData);
    expect(res2.status).toBe(400);
    expect(res2.body.success).toBe(false);
    expect(res2.body.message).toBe('Id Personal has been registered on system');
  });
});
