const {generateVehicles} = require("../factory/vehicle-factory");

const ROWS = 30;

const vehicleSeeder = async (sequelize) => {
  const {Vehicle} = sequelize.models;

  try {
    const vehiclesCount = await Vehicle.count();

    if (vehiclesCount < ROWS) {
      const vehicles = generateVehicles(ROWS - vehiclesCount); // Genera los usuarios necesarios para alcanzar el límite
      await Vehicle.bulkCreate(vehicles, {ignoreDuplicates: true});
      console.log('Vehicle seeded successfully');
    }
  } catch (error) {
    console.error('Error Vehicle seeded:', error);
  }
};

module.exports = {vehicleSeeder};