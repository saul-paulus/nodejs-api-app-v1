import supertest from 'supertest';
import { setupDIContainer } from '@/container.js';
import { createApp } from '@/app.js';
import PasswordHasher from '@/modules/user/infrastructure/security/PasswordHasher.js';

describe('Integration: POST /api/v1/users', () => {
  let app;
  let container;
  let prisma;
  let token;
  const passwordHasher = new PasswordHasher();

  beforeAll(async () => {
    container = await setupDIContainer();
    prisma = container.resolve('prisma');
    app = createApp(container);

    const testAdminId = 'admin_test_integration';
    const hashedPassword = await passwordHasher.hash('admin_password');

    // Create a test admin user for authentication
    await prisma.users.upsert({
      where: { id_personal: testAdminId },
      update: { password: hashedPassword },
      create: {
        username: 'Admin Test',
        id_personal: testAdminId,
        password: hashedPassword,
        codeuker: '01',
        id_role: 1,
      },
    });

    // Login to get JWT Token
    const loginResponse = await supertest(app).post('/api/v1/auth/login').send({
      id_personal: testAdminId,
      password: 'admin_password',
    });
    token = loginResponse.body.data.access_token;

    // Initial Cleanup for test users
    await prisma.users.deleteMany({
      where: {
        id_personal: {
          in: ['test007100', 'test2007100'],
        },
      },
    });
  });

  afterAll(async () => {
    // Final Cleanup
    await prisma.users.deleteMany({
      where: {
        id_personal: {
          in: ['test007100', 'test2007100', 'admin_test_integration'],
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
      id_role: 1,
    };

    // Execute request with Authorization header
    const response = await supertest(app).post('/api/v1/users').set('Authorization', `Bearer ${token}`).send(userData);

    // Assert API Response
    expect(response.status).toBe(201);
    expect(response.body.success).toBe(true);

    // Assert Database State
    const userInDb = await prisma.users.findUnique({
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
      id_role: 1,
    };

    // Execute request with Authorization header
    const response = await supertest(app).post('/api/v1/users').set('Authorization', `Bearer ${token}`).send(userData);

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
      id_role: '',
    };

    // Execute request with Authorization header
    const response = await supertest(app).post('/api/v1/users').set('Authorization', `Bearer ${token}`).send(userData);

    // Assertions
    expect(response.status).toBe(400);
    expect(response.body.success).toBe(false);
  });

  it('Should reject if unauthorized', async () => {
    const userData = {
      username: 'unauthorized',
      id_personal: 'test_unauth',
      password: 'password',
      codeuker: '02',
      id_role: 1,
    };

    // Execute request WITHOUT Authorization header
    const response = await supertest(app).post('/api/v1/users').send(userData);

    // Assertions
    expect(response.status).toBe(401);
    expect(response.body.success).toBe(false);
  });
});
