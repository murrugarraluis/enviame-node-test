const {generateCoverages} = require("../factory/coverage-factory");

const ROWS = 100;
const ROWS_VEHICLES = 30
const ROWS_PROVIDERS = 10

const coverageSeeder = async (sequelize) => {
  const {Coverage} = sequelize.models;

  try {
    const coverageCount = await Coverage.count();

    if (coverageCount < ROWS) {
      const registers = generateCoverages(ROWS_VEHICLES, ROWS_PROVIDERS, ROWS - coverageCount);
      await Coverage.bulkCreate(registers, {ignoreDuplicates: true});
      console.log('Coverage seeded successfully');
    }
  } catch (error) {
    console.error('Error Coverage seeded:', error);
  }
};

module.exports = {coverageSeeder};