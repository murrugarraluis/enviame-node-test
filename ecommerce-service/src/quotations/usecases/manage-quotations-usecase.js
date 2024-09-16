const Quotation = require('../entities/quotation');
const User = require("../../users/entities/user");

class ManageQuotationsUsecase {
  constructor(quotationsRepository, coverageRepository) {
    this.quotationsRepository = quotationsRepository;
    this.coverageRepository = coverageRepository;
  }

  async getAll() {
    return await this.quotationsRepository.getAll();
  }

  async getOne(id) {
    return await this.quotationsRepository.getOne(id);
  }

  async create({userId, originId, destinationId, travelDate, passengerCount, category = null}) {

    // La cotización inicialmente queda en estado "creada",
    //   retornando un ID de cotización único y
    //   además retorna un listado
    // de coberturas con precios asociados (idealmente el listado entrega ID de Cobertura,
    //   ID de precio, junto con el monto/valor $ y vehículo), en base al origen-destino y
    // la fecha del viaje de la cotización.


    try {
      const status = 'CREADA'
      const quotation = new Quotation(undefined, userId, travelDate, passengerCount, category, status);
      const uuid = await this.quotationsRepository.create(quotation);
      const coverages = await this.coverageRepository.search(originId, destinationId, travelDate, passengerCount, category)
      return {
        uuid,
        coverages
      };
    } catch (error) {
      throw error;
    }

  }

  async update(id, {userId, coverageId, priceId, travelDate, passengerCount, category, status}) {


    try {
      const quotation = new Quotation(id, userId, coverageId, priceId, travelDate, passengerCount, category, status);
      await this.quotationsRepository.update(quotation);

      return quotation;

    } catch (error) {
      throw error;
    }

  }

  async delete(id) {
    await this.quotationsRepository.delete(id);
  }
}

module.exports = ManageQuotationsUsecase;