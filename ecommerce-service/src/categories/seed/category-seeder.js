const categorySeeder = async (sequelize) => {
  const {Category} = sequelize.models;


  try {
    const categories = [
      { name: 'standard' },
      { name: 'premium' }
    ];

    for (const category of categories) {
      await Category.findOrCreate({
        where: { name: category.name },
        defaults: category
      });
    }
    console.log('Category seeded successfully');
  } catch (error) {
    console.error('Error User seeded:', error);
  }
};

module.exports = {categorySeeder};