import userServiceFactory from '../../src/modules/user/application/use-cases/user.service.js';

describe('UserService (Interface-less Mocking Demo)', () => {
  let userService;
  let mockUserRepository;

  beforeEach(() => {
    // Di JavaScript, kita cukup buat objek "palsu" (Mock) yang
    // memiliki fungsi yang sama dengan repository aslinya.
    // Ini adalah bukti bahwa Service tidak peduli pada class aslinya,
    // hanya peduli pada "kontrak" fungsinya.
    mockUserRepository = {
      findByIdPersonalWithSelect: jest.fn(),
      findByIdPersonal: jest.fn(),
      createUser: jest.fn(),
      getUsers: jest.fn(),
    };

    // Kita inject mock repository ke service
    userService = userServiceFactory({ userRepository: mockUserRepository });
  });

  test('should return user data if user exists', async () => {
    const mockUser = { id_personal: '123', username: 'john_doe' };

    // Kita beritahu Mock behavior-nya (mirip implementasi interface)
    mockUserRepository.findByIdPersonalWithSelect.mockResolvedValue(mockUser);

    const result = await userService.getUser('123');

    expect(result).toEqual(mockUser);
    expect(mockUserRepository.findByIdPersonalWithSelect).toHaveBeenCalledWith('123');
  });

  test('should throw error if user not found', async () => {
    mockUserRepository.findByIdPersonalWithSelect.mockResolvedValue(null);

    await expect(userService.getUser('999')).rejects.toThrow('User not found');
  });
});
