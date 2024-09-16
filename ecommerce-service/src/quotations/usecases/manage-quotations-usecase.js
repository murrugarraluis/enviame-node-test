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

  async changeStatusReserved(id, { coverageId, priceId, category }) {
    try {
      const quotation = await this.quotationsRepository.getOne(id);
      const coverage = await this.coverageRepository.getOne(coverageId);

      if (!quotation) {
        return quotation;
      }

      const { userId, travelDate, passengerCount } = quotation;

      if (quotation.status !== 'CREADA') {
        throw new Error('Quotation cannot be updated or reserved unless it is in "CREADA" status');
      }

      const categoryVehicle = coverage?.vehicle?.categories.find(c => c.name === category);

      if (!categoryVehicle) {
        throw new Error('Invalid vehicle category provided.');
      }

      let { maximumCapacity } = categoryVehicle.vehicles_categories.dataValues;

      if (passengerCount > maximumCapacity) {
        throw new Error('Reservation cannot be made as the number of registered passengers exceeds the vehicle\'s maximum capacity.');
      }

      const quotationUpdate = new Quotation(
        id, userId, travelDate, passengerCount, category, "RESERVA", coverageId, priceId
      );

      await this.quotationsRepository.update(quotationUpdate);
      return quotationUpdate;

    } catch (e) {
      throw e;
    }
  }
  async changeStatusReservedCanceled(id) {
    try {
      const quotation = await this.quotationsRepository.getOne(id);

      if (!quotation) {
        return quotation;
      }

      const { userId, travelDate, passengerCount,category,coverageId,priceId } = quotation;

      if (quotation.status !== 'RESERVA') {
        throw new Error('Quotation cannot be updated or reserved unless it is in "RESERVA" status');
      }

      const quotationUpdate = new Quotation(
        id, userId, travelDate, passengerCount, category, "RESERVA_CANCELADA", coverageId, priceId
      );

      await this.quotationsRepository.update(quotationUpdate);
      return quotationUpdate;

    } catch (e) {
      throw e;
    }
  }
}

module.exports = ManageQuotationsUsecase;