const { faker } = require('@faker-js/faker');

const COVERAGE_TYPES = ['ORIGEN', 'DESTINO'];

function createPlaceCoverage(coverageId, placesCount) {
  return COVERAGE_TYPES.map(type => ({
    coverageId: coverageId,
    placeId: faker.datatype.number({ min: 1, max: placesCount }),
    type: type,
  }));
}

function generateCoveragesPlaces(coveragesCount, placesCount) {
  const coverages = [];

  for (let coverageId = 1; coverageId <= coveragesCount; coverageId++) {
    coverages.push(...createPlaceCoverage(coverageId, placesCount));
  }

  return coverages;
}

module.exports = { generateCoveragesPlaces };