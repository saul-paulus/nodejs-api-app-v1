import { userPublicSelect } from '@/modules/user/application/dtos/user.public.dto.js';

export default class PrismaUserRepository {
  constructor({ prisma }) {
    this.prisma = prisma;
  }

  async findByIdPersonal(idPersonal) {
    return this.prisma.users.findUnique({
      where: { id_personal: idPersonal },
    });
  }

  async getUsers({ skip = 0, take = 10 } = {}) {
    return this.prisma.users.findMany({
      skip,
      take,
      select: userPublicSelect,
    });
  }

  async countAll() {
    return this.prisma.users.count();
  }

  async findByIdPersonalWithSelect(idPersonal) {
    return this.prisma.users.findUnique({
      where: { id_personal: idPersonal },
      select: userPublicSelect,
    });
  }

  async findById(idUser) {
    return this.prisma.users.findUnique({
      where: { id: idUser },
    });
  }

  async createUser(data) {
    return this.prisma.users.create({
      data,
      select: userPublicSelect,
    });
  }

  async deleteUser(id) {
    return this.prisma.users.delete({
      where: { id },
    });
  }

  async updateUser(idUser, dataUpdate) {
    return this.prisma.users.update({
      where: {
        id: idUser,
      },
      data: dataUpdate,
      select: userPublicSelect,
    });
  }
}
