const {userSeeder} = require("../../users/seeder/user-seeder");

async function seedDatabase(sequelize) {

  try {
    // Generar y poblar datos
    await userSeeder(sequelize)
    console.log('Database seed successfully');
  } catch (error) {
    console.error('Error seed database:', error);
  }
}

module.exports = {seedDatabase};