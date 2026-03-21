import ApiError from '@/shared/errors/ApiError.js';

export default class LoginUserUseCase {
  constructor({ userRepository, passwordHasher, tokenService }) {
    this.userRepository = userRepository;
    this.passwordHasher = passwordHasher;
    this.tokenService = tokenService;
  }

  async execute(request) {
    const { id_personal: idPersonal, password } = request;

    const user = await this.userRepository.findByIdPersonal(idPersonal);

    if (!user) {
      throw new ApiError(401, 'Id Personal or Password is not valid');
    }

    const isPasswordValid = await this.passwordHasher.compare(password, user.password);

    if (!isPasswordValid) {
      throw new ApiError(401, 'Id Personal or Password is not valid');
    }

    // Remove password before returning
    delete user.password;

    const token = this.tokenService.generateAccessToken({
      userId: user.id,
      idPersonal: user.id_personal,
    });

    const userData = {
      username: user.username,
      id_personal: user.id_personal,
      codeuker: user.codeuker,
      id_role: user.id_role,
    };

    return {
      user: userData,
      token_type: 'Bearer',
      access_token: token,
      expires_in: this.tokenService.getExpirationInSeconds(),
    };
  }
}
