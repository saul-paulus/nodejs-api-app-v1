import ApiError from '#/shared/errors/ApiError.js';

export default class UpdateUserUseCase {
  constructor({ userRepository }) {
    this.userRepository = userRepository;
  }

  async execute(id, data) {
    const user = await this.userRepository.findById(id);
    if (!user) {
      throw new ApiError(404, 'User not found');
    }
    return this.userRepository.updateUser(id, data);
  }
}
