import { userPublicSelect } from '../../application/dtos/user.public.dto.js';

export default ({ prisma }) => {
  const findByIdPersonal = async (idPersonal) => {
    return prisma.user.findUnique({
      where: { id_personal: idPersonal },
    });
  };

  const getUsers = async ({ skip = 0, take = 10 } = {}) => {
    return prisma.user.findMany({
      skip,
      take,
      select: userPublicSelect,
    });
  };

  const countAll = async () => {
    return prisma.user.count();
  };

  const findByIdPersonalWithSelect = async (idPersonal) => {
    return prisma.user.findUnique({
      where: { id_personal: idPersonal },
      select: userPublicSelect,
    });
  };

  const findId = async (idUser) => {
    return prisma.user.findUnique({
      where: { id: idUser },
    });
  };

  const createUser = async (data) => {
    return prisma.user.create({
      data,
      select: userPublicSelect,
    });
  };

  const deleteUser = async (id) => {
    return prisma.user.delete({
      where: { id },
    });
  };

  const updateUser = async (idUser, dataUpdate) => {
    return prisma.user.update({
      where: {
        id: idUser,
      },
      data: dataUpdate,
      select: userPublicSelect,
    });
  };

  return {
    findByIdPersonal,
    findByIdPersonalWithSelect,
    getUsers,
    countAll,
    createUser,
    deleteUser,
    findId,
    updateUser,
  };
};
