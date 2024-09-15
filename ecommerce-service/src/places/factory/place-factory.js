const {faker} = require('@faker-js/faker');

function generatePlaces(count) {
  const places = [];
  for (let i = 0; i < count; i++) {
    places.push({
      name: faker.address.city()
    });
  }
  return places;
}

module.exports = { generatePlaces };