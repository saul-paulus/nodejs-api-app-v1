import supertest from 'supertest';
import { asValue } from 'awilix';
import { setupDIContainer } from '@/container.js';
import { createApp } from '@/app.js';

describe('POST /api/v1/users', () => {
  let app;
  let mockUserRepository;

  beforeEach(() => {
    // 1. Create Mock Repository
    mockUserRepository = {
      findByIdPersonal: jest.fn(),
      createUser: jest.fn(),
      getUsers: jest.fn(),
      countAll: jest.fn(),
      findId: jest.fn(),
      deleteUser: jest.fn(),
      updateUser: jest.fn(),
    };

    // 2. Setup Container and replace userRepository with Mock
    const container = setupDIContainer();
    container.register({
      userRepository: asValue(mockUserRepository),
    });

    // 3. Create App with the mocked container
    app = createApp(container);
  });

  it('should create a new user successfully', async () => {
    const userData = {
      username: 'testuser',
      id_personal: '12345678',
      password: 'password123',
      codeuker: 'UKER001',
      id_wewenang: 1,
    };

    // Mock findByIdPersonal to return null (user doesn't exist)
    mockUserRepository.findByIdPersonal.mockResolvedValue(null);

    // Mock createUser to return a success response
    mockUserRepository.createUser.mockResolvedValue({
      id_personal: userData.id_personal,
      username: userData.username,
    });

    const response = await supertest(app).post('/api/v1/users').send(userData);

    expect(response.status).toBe(201);
    expect(response.body.success).toBe(true);
    expect(response.body.data).toEqual({
      id_personal: userData.id_personal,
      username: userData.username,
    });
    expect(mockUserRepository.createUser).toHaveBeenCalled();
  });

  it('should return 400 if user already exists', async () => {
    const userData = {
      username: 'testuser',
      id_personal: '12345678',
      password: 'password123',
      codeuker: 'UKER001',
      id_wewenang: 1,
    };

    // Mock findByIdPersonal to return an existing user
    mockUserRepository.findByIdPersonal.mockResolvedValue({ id: 1 });

    const response = await supertest(app).post('/api/v1/users').send(userData);

    expect(response.status).toBe(400);
    expect(response.body.success).toBe(false);
    expect(response.body.message).toBe('Id Personal has been registered on system');
  });

  describe('GET /api/v1/users', () => {
    it('should return paginated users with meta and links', async () => {
      const mockUsers = [
        { id_personal: '1', username: 'user1' },
        { id_personal: '2', username: 'user2' },
      ];
      const totalCount = 20;

      mockUserRepository.getUsers.mockResolvedValue(mockUsers);
      mockUserRepository.countAll.mockResolvedValue(totalCount);

      const response = await supertest(app).get('/api/v1/users?page=1&limit=2');

      expect(response.status).toBe(200);
      expect(response.body.success).toBe(true);
      expect(response.body.data).toHaveLength(2);
      expect(response.body.meta).toEqual({
        total: totalCount,
        page: 1,
        limit: 2,
        totalPages: 10,
      });
      expect(response.body.links).toEqual(expect.arrayContaining([expect.objectContaining({ rel: 'self' }), expect.objectContaining({ rel: 'first' }), expect.objectContaining({ rel: 'last' }), expect.objectContaining({ rel: 'next' })]));
    });
  });

  describe('DELETE /api/v1/users/:id', () => {
    it('should delete a user successfully', async () => {
      mockUserRepository.findId.mockResolvedValue({ id: 1 });
      mockUserRepository.deleteUser.mockResolvedValue({ id: 1 });

      const response = await supertest(app).delete('/api/v1/users/1');

      expect(response.status).toBe(200);
      expect(response.body.success).toBe(true);
      expect(response.body.message).toBe('User delete successfully');
    });

    it('should return 404 if user to delete not found', async () => {
      mockUserRepository.findId.mockResolvedValue(null);

      const response = await supertest(app).delete('/api/v1/users/1');

      expect(response.status).toBe(404);
      expect(response.body.success).toBe(false);
    });
  });

  describe('PUT /api/v1/users/:id', () => {
    it('should update a user successfully', async () => {
      const updateData = {
        id_personal: '12345678',
        codeuker: 'UKER_UPDATED',
        id_wewenang: 2,
      };

      mockUserRepository.findId.mockResolvedValue({ id: 1 });
      mockUserRepository.updateUser.mockResolvedValue({ id: 1, ...updateData });

      const response = await supertest(app).put('/api/v1/users/1').send(updateData);

      expect(response.status).toBe(200);
      expect(response.body.success).toBe(true);
      expect(response.body.message).toBe('User update successfully');
    });

    it('should return 404 if user to update not found', async () => {
      const updateData = {
        id_personal: '12345678',
        codeuker: 'UKER_UPDATED',
        id_wewenang: 2,
      };

      mockUserRepository.findId.mockResolvedValue(null);

      const response = await supertest(app).put('/api/v1/users/1').send(updateData);

      expect(response.status).toBe(404);
      expect(response.body.success).toBe(false);
    });
  });
});
