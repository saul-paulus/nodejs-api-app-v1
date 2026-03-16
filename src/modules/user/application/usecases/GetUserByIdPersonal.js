import ApiError from '@/shared/exceptions/api-error.js';

export default class GetUserByIdPersonal {
  constructor({ userRepository }) {
    this.userRepository = userRepository;
  }

  async execute(idPersonal) {
    const user = await this.userRepository.findByIdPersonalWithSelect(idPersonal);

    if (!user) {
      throw new ApiError(404, 'User not found');
    }

    return user;
  }
}
