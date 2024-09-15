const {generateQuotations} = require("../factory/quotation-factory");

const ROWS = 50;
const ROWS_USERS = 10
const ROWS_COVERAGES = 100
const ROWS_PRICES = 100

const quotationSeeder = async (sequelize) => {
  const {Quotation} = sequelize.models;

  try {
    const quotationCount = await Quotation.count();

    if (quotationCount < ROWS) {
      const registers = generateQuotations(ROWS_USERS, ROWS_COVERAGES, ROWS_PRICES, ROWS);
      await Quotation.bulkCreate(registers, {ignoreDuplicates: true});
      console.log('Quotation seeded successfully');
    }
  } catch (error) {
    console.error('Error Quotation seeded:', error);
  }
};

module.exports = {quotationSeeder};