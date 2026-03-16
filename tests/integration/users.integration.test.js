import supertest from 'supertest';
import { setupDIContainer } from '@/container.js';
import { createApp } from '@/app.js';

describe('Integration: POST /api/v1/users', () => {
  let app;
  let container;
  let prisma;

  beforeAll(async () => {
    container = setupDIContainer();
    prisma = container.resolve('prisma');
    app = createApp(container);

    // Initial Cleanup
    await prisma.user.deleteMany({
      where: {
        id_personal: {
          in: ['test007100', 'test2007100'],
        },
      },
    });
  });

  afterAll(async () => {
    // Final Cleanup
    await prisma.user.deleteMany({
      where: {
        id_personal: {
          in: ['test007100', 'test2007100'],
        },
      },
    });
    await prisma.$disconnect();
  });

  it('Should successfully insert a new user into the REAL database', async () => {
    const userData = {
      username: 'user test',
      id_personal: 'test007100',
      password: 'test_password',
      codeuker: '02',
      id_wewenang: 1,
    };

    // Execute request
    const response = await supertest(app).post('/api/v1/users').send(userData);

    // Assert API Response
    expect(response.status).toBe(201);
    expect(response.body.success).toBe(true);

    // Assert Database State
    const userInDb = await prisma.user.findUnique({
      where: { id_personal: userData.id_personal },
    });

    expect(userInDb).not.toBeNull();
    expect(userInDb.username).toBe(userData.username);
    expect(userInDb.codeuker).toBe(userData.codeuker);
  });

  it('Should fail when inserting a user with a duplicate ID Personal', async () => {
    // First user already exists from the previous test if successful
    const userData = {
      username: 'user test2',
      id_personal: 'test007100',
      password: 'test_password',
      codeuker: '02',
      id_wewenang: 1,
    };

    // Execute request
    const response = await supertest(app).post('/api/v1/users').send(userData);

    // Assertions
    expect(response.status).toBe(400);
    expect(response.body.success).toBe(false);
    expect(response.body.message).toBe('Id Personal has been registered on system');
  });

  it('Should reject if request is invalid', async () => {
    const userData = {
      username: '',
      id_personal: '',
      password: '',
      codeuker: '',
      id_wewenang: '',
    };

    // Execute rqeuest
    const response = await supertest(app).post('/api/v1/users').send(userData);

    // Assertions
    expect(response.status).toBe(400);
    expect(response.body.success).toBe(false);
  });
});
