const Place = require('../entities/place');

class ManagePlacesUsecase {
  constructor(placesRepository) {
    this.placesRepository = placesRepository;
  }

  async getAll() {
    return await this.placesRepository.getAll();
  }

  async getOne(id) {
    return await this.placesRepository.getOne(id);
  }

  async create(data) {

    const place = new Place(undefined, data.name);
    const id = await this.placesRepository.create(place);
    place.id = id;

    return place;

  }

  async update(id, data) {

    const place = new Place(id, data.name);
    await this.placesRepository.update(place);

    return place;

  }

  async delete(id) {
    await this.placesRepository.delete(id);
  }
}

module.exports = ManagePlacesUsecase;