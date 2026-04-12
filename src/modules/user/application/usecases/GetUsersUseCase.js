export default class GetUsersUseCase {
  constructor({ userRepository }) {
    this.userRepository = userRepository;
  }

  async execute({ page = 1, limit = 10 } = {}) {
    const skip = (page - 1) * limit;
    const [users, total] = await Promise.all([this.userRepository.getUsers({ skip, take: limit }), this.userRepository.countAll()]);

    return {
      users: users ?? [],
      total,
    };
  }
}
