import ApiError from '@/shared/errors/ApiError.js';

export default class CreateUserUseCase {
  constructor({ userRepository, passwordHasher }) {
    this.userRepository = userRepository;
    this.passwordHasher = passwordHasher;
  }

  async execute(request) {
    const { id_personal: idPersonal } = request;
    const user = await this.userRepository.findByIdPersonal(idPersonal);

    if (user) {
      throw new ApiError(400, 'Id Personal has been registered on system');
    }

    const passwordHash = await this.passwordHasher.hash(request.password);

    return this.userRepository.createUser({
      ...request,
      password: passwordHash,
    });
  }
}
