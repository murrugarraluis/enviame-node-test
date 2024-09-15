const {generatePlaces} = require("../factory/place-factory");
const ROWS = 10;

const placeSeeder = async (sequelize) => {
  const {Place} = sequelize.models;

  try {
    const placesCount = await Place.count();

    if (placesCount < ROWS) {
      const places = generatePlaces(ROWS - placesCount); // Genera los usuarios necesarios para alcanzar el límite
      await Place.bulkCreate(places, {ignoreDuplicates: true});
      console.log('Place seeded successfully');
    }
  } catch (error) {
    console.error('Error Place seeded:', error);
  }
};

module.exports = {placeSeeder};