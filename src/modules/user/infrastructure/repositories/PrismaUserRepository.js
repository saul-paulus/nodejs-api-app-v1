import { userPublicSelect } from '../../application/dtos/user.public.dto.js';

export default class PrismaUserRepository {
  constructor({ prisma }) {
    this.prisma = prisma;
  }

  async findByIdPersonal(idPersonal) {
    return this.prisma.user.findUnique({
      where: { id_personal: idPersonal },
    });
  }

  async getUsers({ skip = 0, take = 10 } = {}) {
    return this.prisma.user.findMany({
      skip,
      take,
      select: userPublicSelect,
    });
  }

  async countAll() {
    return this.prisma.user.count();
  }

  async findByIdPersonalWithSelect(idPersonal) {
    return this.prisma.user.findUnique({
      where: { id_personal: idPersonal },
      select: userPublicSelect,
    });
  }

  async findId(idUser) {
    return this.prisma.user.findUnique({
      where: { id: idUser },
    });
  }

  async createUser(data) {
    return this.prisma.user.create({
      data,
      select: userPublicSelect,
    });
  }

  async deleteUser(id) {
    return this.prisma.user.delete({
      where: { id },
    });
  }

  async updateUser(idUser, dataUpdate) {
    return this.prisma.user.update({
      where: {
        id: idUser,
      },
      data: dataUpdate,
      select: userPublicSelect,
    });
  }
}
