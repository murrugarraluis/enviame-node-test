const {faker} = require('@faker-js/faker');

function generateVehicles(count) {
  const vehicles = [];
  for (let i = 0; i < count; i++) {
    vehicles.push({
      brand: faker.vehicle.manufacturer(),
      model: faker.vehicle.model(),
      year: faker.date.past(5, new Date()).getFullYear(),
      licensePlate: faker.vehicle.vrm(),
      providerId: faker.datatype.number({ min: 1, max: 10 }),
    });
  }
  return vehicles;
}

module.exports = { generateVehicles };