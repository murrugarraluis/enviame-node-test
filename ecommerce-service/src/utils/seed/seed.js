const {userSeeder} = require("../../users/seeder/user-seeder");
const {categorySeeder} = require("../../categories/seed/category-seeder");
const {placeSeeder} = require("../../places/seeder/place-seeder");
const {providerSeeder} = require("../../providers/seeder/provider-seeder");
const {vehicleSeeder} = require("../../vehicles/seeder/vehicle-seeder");
const {vehicleCategorySeeder} = require("../../associations/seeder/vehicle-category-seeder");

async function seedDatabase(sequelize) {

  try {
    await categorySeeder(sequelize);
    await placeSeeder(sequelize);
    await providerSeeder(sequelize);
    await userSeeder(sequelize)
    await vehicleSeeder(sequelize);
    await vehicleCategorySeeder(sequelize)
    console.log('Database seed successfully');
  } catch (error) {
    console.error('Error seed database:', error);
  }
}

module.exports = {seedDatabase};