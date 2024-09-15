const {generateQuotationsPlaces} = require("../factory/quotations-place-factory");

const ROWS_QUOTATION = 50
const ROWS_PLACE = 10

const quotationPlaceSeeder = async (sequelize) => {
  const {QuotationPlace} = sequelize.models;

  try {
    const quotationPlaceCount = await QuotationPlace.count();
    if (quotationPlaceCount === 0) {
      const registers = generateQuotationsPlaces(ROWS_QUOTATION, ROWS_PLACE);
      await QuotationPlace.bulkCreate(registers, {ignoreDuplicates: true});
      console.log('QuotationPlace seeded successfully');
    }
  } catch (error) {
    console.error('Error QuotationPlace seeded:', error);
  }
};

module.exports = {quotationPlaceSeeder};