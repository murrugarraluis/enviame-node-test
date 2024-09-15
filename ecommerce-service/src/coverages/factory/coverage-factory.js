const { faker } = require('@faker-js/faker');

function generateCoverages(vehicleCount, providerCount, pivotCount) {
  const coverages = [];
  for (let i = 0; i < pivotCount; i++) {
    const departureTime = faker.date.soon();
    const arrivalTime = new Date(departureTime.getTime() + faker.datatype.number({ min: 1, max: 10 }) * 60 * 60 * 1000);

    const formattedDepartureTime = departureTime.toTimeString().split(' ')[0];
    const formattedArrivalTime = arrivalTime.toTimeString().split(' ')[0];

    coverages.push({
      vehicleId: faker.datatype.number({ min: 1, max: vehicleCount }),
      providerId: faker.datatype.number({ min: 1, max: providerCount }),
      departureTime: formattedDepartureTime,
      arrivalTime: formattedArrivalTime,
      duration: new Date(arrivalTime - departureTime).toISOString().substr(11, 8)
    });
  }
  return coverages;
}

module.exports = { generateCoverages };