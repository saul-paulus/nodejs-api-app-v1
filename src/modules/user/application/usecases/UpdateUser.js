import ApiError from '@/shared/exceptions/api-error.js';

export default class UpdateUser {
  constructor({ userRepository }) {
    this.userRepository = userRepository;
  }

  async execute(id, data) {
    const user = await this.userRepository.findId(id);

    if (!user) {
      throw new ApiError(404, 'User not found');
    }

    return this.userRepository.updateUser(id, data);
  }
}
