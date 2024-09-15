// users/seeder/user-seeder.js
const { generateUsers } = require("../factory/user-factory");

async function userSeeder(sequelize) {
  const User = sequelize.models.User;
  try {
    // Generar y poblar datos
    const users = generateUsers(10); // Genera 10 usuarios
    await User.bulkCreate(users, { ignoreDuplicates: true });
    console.log('User seeded successfully');
  } catch (error) {
    console.error('Error User seeded:', error);
  }
}

module.exports = { userSeeder };