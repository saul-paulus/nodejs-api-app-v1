import supertest from 'supertest';
import { asValue } from 'awilix';
import { setupDIContainer } from '@/container.js';
import { createApp } from '@/app.js';

describe('POST /api/v1/users', () => {
  let app;
  let container;
  let mockUserRepository;

  beforeEach(() => {
    // Setup container
    container = setupDIContainer();

    // Create mock repository
    mockUserRepository = {
      findByIdPersonal: jest.fn(),
      createUser: jest.fn(),
    };

    // Override userRepository in container with mock
    container.register({
      userRepository: asValue(mockUserRepository),
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
      id_wewenang: 1,
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
      id_wewenang: 1,
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
