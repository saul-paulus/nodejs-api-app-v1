import { jest, describe, it, expect, beforeEach } from '@jest/globals';
import supertest from 'supertest';
import { asValue } from 'awilix';
import { setupDIContainer } from '@/container.js';
import { createApp } from '@/app.js';

describe('POST /api/v1/users', () => {
  let app;
  let container;
  let mockUserRepository;

  beforeEach(async () => {
    // Setup container
    container = await setupDIContainer();

    // Create mock repository
    mockUserRepository = {
      findByIdPersonal: jest.fn(),
      createUser: jest.fn(),
    };

    // Override userRepository and other dependencies in container to prevent resolution failure
    container.register({
      userRepository: asValue(mockUserRepository),
      getUsers: asValue({ execute: jest.fn() }),
      getUserByIdPersonal: asValue({ execute: jest.fn() }),
      deleteUser: asValue({ execute: jest.fn() }),
      updateUser: asValue({ execute: jest.fn() }),
    });

    // Create app with modified container
    app = createApp(container);
  });

  it('Should create a new user successfully', async () => {
    const userData = {
      username: 'testuser',
      id_personal: '1234567890',
      password: 'password123',
      codeuker: 'UKER01',
      id_role: 1,
    };

    // Mock behaviors
    mockUserRepository.findByIdPersonal.mockResolvedValue(null);
    mockUserRepository.createUser.mockResolvedValue({
      id: 1,
      ...userData,
    });

    // Execute request
    const response = await supertest(app).post('/api/v1/users').send(userData);

    // Assertions
    expect(response.status).toBe(201);
    expect(response.body.success).toBe(true);
    expect(response.body.message).toBe('The request has been processed successfully');
    expect(response.body.data.id_personal).toBe(userData.id_personal);

    // Verify mock calls
    expect(mockUserRepository.findByIdPersonal).toHaveBeenCalledWith(userData.id_personal);
    expect(mockUserRepository.createUser).toHaveBeenCalled();
  });

  it('Should return 400 if Id Personal is already registered', async () => {
    const userData = {
      username: 'testuser',
      id_personal: '1234567890',
      password: 'password123',
      codeuker: 'UKER01',
      id_role: 1,
    };

    // Mock that user already exists
    mockUserRepository.findByIdPersonal.mockResolvedValue({ id: 1, ...userData });

    // Execute request
    const response = await supertest(app).post('/api/v1/users').send(userData);

    // Assertions
    expect(response.status).toBe(400);
    expect(response.body.success).toBe(false);
    expect(response.body.message).toBe('Id Personal has been registered on system');
  });
});
