const Vehicle = require('../entities/vehicle');

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

  async create(data) {

    const user = new Vehicle(undefined, data.name);
    const id = await this.vehiclesRepository.create(user);
    user.id = id;

    return user;

  }

  async update(id, data) {

    const user = new Vehicle(id, data.name);
    await this.vehiclesRepository.update(user);

    return user;

  }

  async delete(id) {
    await this.vehiclesRepository.delete(id);
  }
}

module.exports = ManageVehiclesUsecase;