const {faker} = require('@faker-js/faker');

function generateProviders(count) {
  const providers = [];
  for (let i = 0; i < count; i++) {
    providers.push({
      name: faker.company.name()
    });
  }
  return providers;
}

module.exports = { generateProviders };