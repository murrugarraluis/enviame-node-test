const {generateProviders} = require("../factory/provider-factory");

const ROWS = 10;

const providerSeeder = async (sequelize) => {
  const {Provider} = sequelize.models;

  try {
    const providerCount = await Provider.count();

    if (providerCount < ROWS) {
      const providers = generateProviders(ROWS - providerCount);
      await Provider.bulkCreate(providers, {ignoreDuplicates: true});
      console.log('Provider seeded successfully');
    }
  } catch (error) {
    console.error('Error Provider seeded:', error);
  }
};

module.exports = {providerSeeder};