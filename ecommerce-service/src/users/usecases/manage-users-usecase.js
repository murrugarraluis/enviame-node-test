const User = require('../entities/user');

class ManageUsersUsecase {
  constructor(usersRepository) {
    this.usersRepository = usersRepository;
  }

  async getAll() {
    return await this.usersRepository.getAll();
  }

  async getOne(id) {
    return await this.usersRepository.getOne(id);
  }

  async create(data) {

    const user = new User(undefined, data.name);
    const id = await this.usersRepository.create(user);
    user.id = id;

    return user;

  }

  async update(id, data) {

    const user = new User(id, data.name);
    await this.usersRepository.update(user);

    return user;

  }

  async delete(id) {
    await this.usersRepository.delete(id);
  }
}

module.exports = ManageUsersUsecase;