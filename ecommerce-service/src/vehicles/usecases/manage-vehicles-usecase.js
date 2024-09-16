const Vehicle = require('../entities/vehicle');
const User = require("../../users/entities/user");

class ManageVehiclesUsecase {
  constructor(vehiclesRepository) {
    this.vehiclesRepository = vehiclesRepository;
  }

  async getAll() {
    return await this.vehiclesRepository.getAll();
  }

  async getOne(id) {
    return await this.vehiclesRepository.getOne(id);
  }

  async create({brand, model, year, licensePlate, providerId}) {

    try {
      const vehicle = new Vehicle(undefined, brand, model, year, licensePlate, providerId);
      const id = await this.vehiclesRepository.create(vehicle);
      vehicle.id = id;
      return vehicle;
    } catch (error) {
      throw error;
    }

  }

  async update(id, {brand, model, year, licensePlate, providerId}) {

    try {
      const vehicle = new Vehicle(id, brand, model, year, licensePlate, providerId);
      await this.vehiclesRepository.update(vehicle);

      return vehicle;
    } catch (error) {
      throw error;
    }

  }

  async delete(id) {
    await this.vehiclesRepository.delete(id);
  }
}

module.exports = ManageVehiclesUsecase;