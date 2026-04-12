/**
 * UserRepository interface
 */
export default class UserRepository {
  async findByIdPersonal(_idPersonal) {
    throw new Error('Method not implemented');
  }

  async getUsers(_params) {
    throw new Error('Method not implemented');
  }

  async countAll() {
    throw new Error('Method not implemented');
  }

  async findByIdPersonalWithSelect(_idPersonal) {
    throw new Error('Method not implemented');
  }

  async findId(_idUser) {
    throw new Error('Method not implemented');
  }

  async createUser(_data) {
    throw new Error('Method not implemented');
  }

  async deleteUser(_id) {
    throw new Error('Method not implemented');
  }

  async updateUser(_idUser, _dataUpdate) {
    throw new Error('Method not implemented');
  }
}
