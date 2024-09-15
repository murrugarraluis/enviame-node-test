const { faker } = require('@faker-js/faker');

const PLACE_TYPES = ['ORIGEN', 'DESTINO'];

function createQuotationPlace(quotationId, placesCount) {
  return PLACE_TYPES.map(type => ({
    quotationId,
    placeId: faker.datatype.number({ min: 1, max: placesCount }),
    type
  }));
}

function generateQuotationsPlaces(quotationCount, placesCount) {
  const quotations = [];

  for (let quotationId = 1; quotationId <= quotationCount; quotationId++) {
    quotations.push(...createQuotationPlace(quotationId, placesCount));
  }

  return quotations;
}

module.exports = { generateQuotationsPlaces };