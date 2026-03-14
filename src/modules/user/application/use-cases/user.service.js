import bcrypt from 'bcrypt';
import ApiError from '../../../../core/exceptions/api-error.js';

export default ({ userRepository }) => {
  const userRegister = async (request) => {
    const { id_personal: idPersonal } = request;

    const user = await userRepository.findByIdPersonal(idPersonal);

    if (user) {
      throw new ApiError(400, 'Id Personal has been registered on system');
    }

    const passwordHash = await bcrypt.hash(request.password, 9);

    return userRepository.createUser({
      ...request,
      password: passwordHash,
    });
  };

  const getUsers = async ({ page = 1, limit = 10 } = {}) => {
    const skip = (page - 1) * limit;
    const [users, total] = await Promise.all([userRepository.getUsers({ skip, take: limit }), userRepository.countAll()]);

    return {
      users: users ?? [],
      total,
    };
  };

  const getUserByIdPersonal = async (idPersonal) => {
    const user = await userRepository.findByIdPersonalWithSelect(idPersonal);

    if (!user) {
      throw new ApiError(404, 'User not found');
    }

    return user;
  };

  const deleteUser = async (id) => {
    const user = await userRepository.findId(id);

    if (!user) {
      throw new ApiError(404, 'User not found');
    }

    return userRepository.deleteUser(id);
  };

  const updateUser = async (id, data) => {
    const user = await userRepository.findId(id);

    if (!user) {
      throw new ApiError(404, 'User not found');
    }

    return userRepository.updateUser(id, data);
  };

  return {
    userRegister,
    getUsers,
    getUserByIdPersonal,
    deleteUser,
    updateUser,
  };
};
