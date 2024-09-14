const {log} = require('console');
const {DataTypes} = require('sequelize');

class SequelizeVehiclesCategoriesRepository {
  constructor(sequelizeClient, test = false) {

    this.sequelizeClient = sequelizeClient;
    this.test = test;

    let tableName = "vehicles_categories";

    if (test) {
      tableName += "_test";
    }

    const columns = {
      vehicleId: {
        type: DataTypes.INTEGER,
        references: {
          model: 'vehicles',
          key: 'id',
        },
        primaryKey: true,
      },
      categoryId: {
        type: DataTypes.INTEGER,
        references: {
          model: 'categories',
          key: 'id',
        },
        primaryKey: true,
      },
      maximumCapacity: {
        type: DataTypes.INTEGER,
        allowNull: false,
      },
    };

    const options = {
      tableName: tableName,
      timestamps: false,
    };

    this.vehicleCategoryModel = sequelizeClient.sequelize.define('Vehicle', columns, options);

    // Define the associations
    this.vehicleCategoryModel.associate = function(models) {
      this.belongsTo(models.Vehicle, { foreignKey: 'vehicleId' });
      this.belongsTo(models.Category, { foreignKey: 'categoryId' });
    };
    console.log('SequelizeVehiclesCategoriesRepository Started');
  }
}
module.exports = SequelizeVehiclesCategoriesRepository;