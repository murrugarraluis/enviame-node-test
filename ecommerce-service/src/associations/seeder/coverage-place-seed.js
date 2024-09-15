const {generateCoveragesPlaces} = require("../factory/coverage-place-factory");

const ROWS_COVERAGE = 100
const ROWS_PLACE = 10

const coveragePlaceSeeder = async (sequelize) => {
  const {CoveragePlace} = sequelize.models;

  try {
    const coveragePlaceCount = await CoveragePlace.count();
    if (coveragePlaceCount === 0) {
      const registers = generateCoveragesPlaces(ROWS_COVERAGE, ROWS_PLACE);
      await CoveragePlace.bulkCreate(registers, {ignoreDuplicates: true});
      console.log('CoveragePlace seeded successfully');
    }
  } catch (error) {
    console.error('Error CoveragePlace seeded:', error);
  }
};

module.exports = {coveragePlaceSeeder};