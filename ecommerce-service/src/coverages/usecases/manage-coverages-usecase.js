const Converage = require('../entities/Coverage');

class ManageCoveragesUsecase {
  constructor(coveragesRepository) {
    this.coveragesRepository = coveragesRepository;
  }

  async getAll() {
    return await this.coveragesRepository.getAll();
  }

  async getOne(id) {
    return await this.coveragesRepository.getOne(id);
  }

  async create(data) {

    const category = new Converage(undefined, data.name);
    const id = await this.coveragesRepository.create(category);
    category.id = id;

    return category;

  }

  async update(id, data) {

    const category = new Converage(id, data.name);
    await this.coveragesRepository.update(category);

    return category;

  }

  async delete(id) {
    await this.coveragesRepository.delete(id);
  }
}

module.exports = ManageCoveragesUsecase;