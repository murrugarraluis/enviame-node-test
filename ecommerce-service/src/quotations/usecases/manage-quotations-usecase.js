const Quotation = require('../entities/quotation');
const User = require("../../users/entities/user");

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

  async create({userId, coverageId, priceId, travelDate, passengerCount, category, status}) {

    try {
      const quotation = new Quotation(undefined, userId, coverageId, priceId, travelDate, passengerCount, category, status);
      const id = await this.quotationsRepository.create(quotation);
      quotation.id = id;

      return quotation;
    } catch (error) {
      throw error;
    }

  }

  async update(id, {userId, coverageId, priceId, travelDate, passengerCount, category, status}) {


    try {
      const quotation = new Quotation(id, userId, coverageId, priceId, travelDate, passengerCount, category, status);
      await this.quotationsRepository.update(quotation);

      return quotation;

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