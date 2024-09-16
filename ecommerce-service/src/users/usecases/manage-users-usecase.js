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

  async create({name, lastname, email, password}) {

    try {
      const user = new User(undefined, name, lastname, email, password);
      const id = await this.usersRepository.create(user);
      user.id = id;
      return user;
    } catch (error) {
      throw error;
    }

  }

  async update(id, {name, lastname, email, password}) {
    try {

      const user = new User(id, name, lastname, email, password);
      await this.usersRepository.update(user);

      return user;
    } catch (error) {
      throw error;
    }

  }

  async delete(id) {
    await this.usersRepository.delete(id);
  }
}

module.exports = ManageUsersUsecase;