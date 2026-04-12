import ApiError from '#/shared/errors/ApiError.js';

export default class GetMeUserUseCase {
  constructor({ userRepository }) {
    this.userRepository = userRepository;
  }

  async execute(idUser) {
    const user = await this.userRepository.findById(idUser);

    if (!user) {
      throw new ApiError(404, 'User not found in system');
    }

    delete user.password;

    return {
      id_personal: user.id_personal,
      username: user.username,
      codeuker: user.codeuker,
      role: user.id_role,
    };
  }
}
