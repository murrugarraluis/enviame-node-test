const {userSeeder} = require("../../users/seeder/user-seeder");
const {categorySeeder} = require("../../categories/seed/category-seeder");
const {placeSeeder} = require("../../places/seeder/place-seeder");

async function seedDatabase(sequelize) {

  try {
    // Generar y poblar datos
    await categorySeeder(sequelize);
    await placeSeeder(sequelize);
    await userSeeder(sequelize)
    console.log('Database seed successfully');
  } catch (error) {
    console.error('Error seed database:', error);
  }
}

module.exports = {seedDatabase};