const Category = require('../entities/category');

class ManageCategoriesUsecase {
  constructor(categoryRepository) {
    this.categoriesRepository = categoryRepository;
  }

  async getAll() {
    return await this.categoriesRepository.getAll();
  }

  async getOne(id) {
    return await this.categoriesRepository.getOne(id);
  }

  async create(data) {

    const category = new Category(undefined, data.name);
    const id = await this.categoriesRepository.create(category);
    category.id = id;

    return category;

  }

  async update(id, data) {

    const category = new Category(id, data.name);
    await this.categoriesRepository.update(category);

    return category;

  }

  async delete(id) {
    await this.categoriesRepository.delete(id);
  }
}

module.exports = ManageCategoriesUsecase;