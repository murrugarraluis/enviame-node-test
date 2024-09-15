const {generatePrices} = require("../factory/price-factory");

const ROWS = 100;
const ROWS_COVERAGE = 100

const priceSeeder = async (sequelize) => {
  const {Price} = sequelize.models;

  try {
    const priceCount = await Price.count();

    if (priceCount < ROWS) {
      const registers = generatePrices(ROWS_COVERAGE, ROWS - priceCount);
      await Price.bulkCreate(registers, {ignoreDuplicates: true});
      console.log('Price seeded successfully');
    }
  } catch (error) {
    console.error('Error Price seeded:', error);
  }
};

module.exports = {priceSeeder};