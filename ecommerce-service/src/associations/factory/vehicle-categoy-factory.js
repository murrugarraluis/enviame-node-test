const { faker } = require('@faker-js/faker');

function generateVehicleCategory(vehicleCount, categoryCount, pivotCount) {
  const vehicleCategory = [];
  for (let i = 0; i < pivotCount; i++) {
    vehicleCategory.push({
      vehicleId: faker.datatype.number({ min: 1, max: vehicleCount }),
      categoryId: faker.datatype.number({ min: 1, max: categoryCount }),
      maximumCapacity: faker.datatype.number({ min: 6, max: 10 })    });
  }
  return vehicleCategory;
}

module.exports = { generateVehicleCategory };