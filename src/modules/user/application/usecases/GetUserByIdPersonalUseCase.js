import ApiError from '#/shared/errors/ApiError.js';

export default class GetUserByIdPersonalUseCase {
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
