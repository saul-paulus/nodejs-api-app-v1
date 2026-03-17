import supertest from 'supertest';
import { setupDIContainer } from '@/container.js';
import { createApp } from '@/app.js';
import PasswordHasher from '@/modules/user/infrastructure/security/PasswordHasher.js';
import { expect } from '@jest/globals';

describe('Integration: POST /api/v1/auth/login', () => {
  let app;
  let container;
  let prisma;
  let token;
  const passwordHasher = new PasswordHasher();

  beforeAll(async () => {
    container = await setupDIContainer();
    prisma = container.resolve('prisma');
    app = createApp(container);

    const hashedLabel = await passwordHasher.hash('password123');

    // Setup Test User
    await prisma.users.upsert({
      where: { id_personal: '007100test' },
      update: { password: hashedLabel },
      create: {
        username: 'Auth Test',
        id_personal: '007100test',
        password: hashedLabel,
        codeuker: '01',
        id_role: 1,
      },
    });
  });

  afterAll(async () => {
    await prisma.users.deleteMany({
      where: { id_personal: '007100test' },
    });
    await prisma.$disconnect();
  });

  it('Should successfully login with valid credentials', async () => {
    const loginData = {
      id_personal: '007100test',
      password: 'password123',
    };

    const response = await supertest(app).post('/api/v1/auth/login').send(loginData);
    token = response.body.data.access_token;

    expect(response.status).toBe(200);
    expect(response.body.success).toBe(true);
    expect(response.body.data).not.toHaveProperty('password');
    expect(response.body.data).toHaveProperty('access_token');
  });

  it('Should fail with invalid password', async () => {
    const loginData = {
      id_personal: '007100test',
      password: 'wrong_password',
    };

    const response = await supertest(app).post('/api/v1/auth/login').send(loginData);

    expect(response.status).toBe(401);
    expect(response.body.success).toBe(false);
    expect(response.body.message).toBe('Id Personal or Password is not valid');
  });

  it('Should fail with non-existent user (security check)', async () => {
    const loginData = {
      id_personal: 'non_existent',
      password: 'any_password',
    };

    const response = await supertest(app).post('/api/v1/auth/login').send(loginData);

    expect(response.status).toBe(401);
    expect(response.body.success).toBe(false);
    expect(response.body.message).toBe('Id Personal or Password is not valid');
  });

  it('Should successfylly get user with jwt token', async () => {
    const response = await supertest(app).get('/api/v1/users/auth/me').set('Authorization', `Bearer ${token}`);

    expect(response.status).toBe(200);
    expect(response.body.data).toHaveProperty('id_personal');
  });
});
