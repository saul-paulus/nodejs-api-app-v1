import bcrypt from 'bcrypt';
import validated from '../../../../core/utils/validation.js';
import { userRegistrasiValidation } from '../../infrastructure/validation/user.validation.js';
import ApiError from '../../../../core/exceptions/api-error.js';

export default ({ userRepository }) => {
  const userRegister = async (request) => {
    const userValidated = validated(userRegistrasiValidation, request);
    const { id_personal: idPersonal } = userValidated;

    const user = await userRepository.findByIdPersonal(idPersonal);

    if (user) {
      throw new ApiError(400, 'Id Personal has been registered on system');
    }

    const passwordHash = await bcrypt.hash(userValidated.password, 9);

    return userRepository.createUser({
      ...userValidated,
      password: passwordHash,
    });
  };

  const getUsers = async () => {
    const users = await userRepository.getUsers();

    return users ?? [];
  };

  const getUser = async (idPersonal) => {
    const user = await userRepository.findByIdPersonalWithSelect(idPersonal);

    if (!user) {
      throw new ApiError(404, 'User not found');
    }

    return user;
  };

  return {
    userRegister,
    getUsers,
    getUser,
  };
};
