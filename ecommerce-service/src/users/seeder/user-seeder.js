const {generateUsers} = require("../factory/user-factory");

const ROWS = 10;

const userSeeder = async (sequelize) => {
  const {User} = sequelize.models;

  try {
    const userCount = await User.count();

    if (userCount < ROWS) {
      const users = generateUsers(ROWS - userCount); // Genera los usuarios necesarios para alcanzar el límite
      await User.bulkCreate(users, {ignoreDuplicates: true});
      console.log('User seeded successfully');
    }
  } catch (error) {
    console.error('Error User seeded:', error);
  }
};

module.exports = {userSeeder};