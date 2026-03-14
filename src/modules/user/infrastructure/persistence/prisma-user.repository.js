import { userPublicSelect } from '../../application/dtos/user.public.dto.js';

export default ({ prisma }) => {
  const findByIdPersonal = async (idPersonal) => {
    return prisma.user.findUnique({
      where: { id_personal: idPersonal },
    });
  };

  const getUsers = async () => {
    return prisma.user.findMany({
      select: userPublicSelect,
    });
  };

  const findByIdPersonalWithSelect = async (idPersonal) => {
    return prisma.user.findUnique({
      where: { id_personal: idPersonal },
      select: userPublicSelect,
    });
  };

  const createUser = async (data) => {
    return prisma.user.create({
      data,
      select: userPublicSelect,
    });
  };

  return {
    findByIdPersonal,
    findByIdPersonalWithSelect,
    getUsers,
    createUser,
  };
};
