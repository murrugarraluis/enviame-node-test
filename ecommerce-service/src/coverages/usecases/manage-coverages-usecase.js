const Converage = require('../entities/Coverage');
const User = require("../../users/entities/user");

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

  async create({name, vehicleId, providerId, departureTime, arrivalTime, duration}) {


    try {
      const coverage = new Converage(undefined, name, vehicleId, providerId, departureTime, arrivalTime, duration);
      const id = await this.coveragesRepository.create(coverage);
      coverage.id = id;

      return coverage;
    } catch (error) {
      throw error;
    }

  }

  async update(id, {name, vehicleId, providerId, departureTime, arrivalTime, duration}) {

    try {
      const category = new Converage(id, name, vehicleId, providerId, departureTime, arrivalTime, duration);
      await this.coveragesRepository.update(category);
      return category;
    } catch (error) {
      throw error;
    }

  }

  async delete(id) {
    await this.coveragesRepository.delete(id);
  }
}

module.exports = ManageCoveragesUsecase;