const {faker} = require('@faker-js/faker');

function generateUsers(count) {
  const users = [];
  for (let i = 0; i < count; i++) {
    users.push({
      name: faker.name.firstName(),
      lastname: faker.name.lastName(),
      email: faker.internet.email(),
      password: faker.internet.password(),
    });
  }
  return users;
}

module.exports = { generateUsers };