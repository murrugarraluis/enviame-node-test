const {generateVehicleCategory} = require("../factory/vehicle-categoy-factory");

const ROWS = 100;
const ROWS_VEHICLES = 30
const ROWS_CATEGORIES = 2

const vehicleCategorySeeder = async (sequelize) => {
  const {VehicleCategory} = sequelize.models;

  try {
    const vehicleCategoryCount = await VehicleCategory.count();

    if (vehicleCategoryCount < ROWS) {
      const registers = generateVehicleCategory(ROWS_VEHICLES,ROWS_CATEGORIES,ROWS - vehicleCategoryCount);
      await VehicleCategory.bulkCreate(registers, {ignoreDuplicates: true});
      console.log('VehicleCategory seeded successfully');
    }
  } catch (error) {
    console.error('Error VehicleCategory seeded:', error);
  }
};

module.exports = {vehicleCategorySeeder};