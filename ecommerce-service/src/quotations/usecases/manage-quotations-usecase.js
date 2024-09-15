const Quotation = require('../entities/quotation');

class ManageQuotationsUsecase {
  constructor(quotationsRepository) {
    this.quotationsRepository = quotationsRepository;
  }

  async getAll() {
    return await this.quotationsRepository.getAll();
  }

  async getOne(id) {
    return await this.quotationsRepository.getOne(id);
  }

  async create(data) {

    const category = new Quotation(undefined, data.name);
    const id = await this.quotationsRepository.create(category);
    category.id = id;

    return category;

  }

  async update(id, data) {

    const category = new Quotation(id, data.name);
    await this.quotationsRepository.update(category);

    return category;

  }

  async delete(id) {
    await this.quotationsRepository.delete(id);
  }
}

module.exports = ManageQuotationsUsecase;