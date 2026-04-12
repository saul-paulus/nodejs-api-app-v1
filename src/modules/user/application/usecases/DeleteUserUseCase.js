import ApiError from '#/shared/errors/ApiError.js';

export default class DeleteUserUseCase {
  constructor({ userRepository }) {
    this.userRepository = userRepository;
  }

  async execute(id) {
    const user = await this.userRepository.findById(id);
    if (!user) {
      throw new ApiError(404, 'User not found');
    }
    return this.userRepository.deleteUser(id);
  }
}
