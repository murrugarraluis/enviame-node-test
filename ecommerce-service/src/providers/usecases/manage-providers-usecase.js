const Provider = require('../entities/provider');

class ManageProvidersUsecase {
  constructor(providersRepository) {
    this.providersRepository = providersRepository;
  }

  async getAll() {
    return await this.providersRepository.getAll();
  }

  async getOne(id) {
    return await this.providersRepository.getOne(id);
  }

  async create(data) {

    const place = new Provider(undefined, data.name);
    const id = await this.providersRepository.create(place);
    place.id = id;

    return place;

  }

  async update(id, data) {

    const place = new Provider(id, data.name);
    await this.providersRepository.update(place);

    return place;

  }

  async delete(id) {
    await this.providersRepository.delete(id);
  }
}

module.exports = ManageProvidersUsecase;