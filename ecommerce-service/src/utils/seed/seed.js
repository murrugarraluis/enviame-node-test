const {userSeeder} = require("../../users/seeder/user-seeder");
const {categorySeeder} = require("../../categories/seed/category-seeder");
const {placeSeeder} = require("../../places/seeder/place-seeder");
const {providerSeeder} = require("../../providers/seeder/provider-seeder");
const {vehicleSeeder} = require("../../vehicles/seeder/vehicle-seeder");
const {vehicleCategorySeeder} = require("../../associations/seeder/vehicle-category-seeder");
const {coverageSeeder} = require("../../coverages/seeder/coverage-seed");
const {priceSeeder} = require("../../coverages/seeder/price-seed");
const {quotationSeeder} = require("../../quotations/seeder/quotation.seeder");
const {coveragePlaceSeeder} = require("../../associations/seeder/coverage-place-seed");
const {quotationPlaceSeeder} = require("../../associations/seeder/quotation-place-seed");

async function seedDatabase(sequelize) {

  try {
    await categorySeeder(sequelize);
    await placeSeeder(sequelize);
    await providerSeeder(sequelize);
    await userSeeder(sequelize)
    await vehicleSeeder(sequelize);
    await vehicleCategorySeeder(sequelize)
    await coverageSeeder(sequelize)
    await priceSeeder(sequelize)
    await quotationSeeder(sequelize)
    await coveragePlaceSeeder(sequelize)
    await quotationPlaceSeeder(sequelize)
    console.log('Database seed successfully');
  } catch (error) {
    console.error('Error seed database:', error);
  }
}

module.exports = {seedDatabase};