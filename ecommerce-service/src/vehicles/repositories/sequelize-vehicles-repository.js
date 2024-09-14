const {log} = require('console');
const {DataTypes} = require('sequelize');

class SequelizeVehiclesRepository {
  constructor(sequelizeClient, test = false) {

    this.sequelizeClient = sequelizeClient;
    this.test = test;

    let tableName = "vehicles";

    if (test) {
      tableName += "_test";
    }

    const columns = {

      id: {
        type: DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: true,
      },
      brand: {
        type: DataTypes.STRING,
        allowNull: false,
      },
      model: {
        type: DataTypes.STRING,
        allowNull: false,
      },
      year: {
        type: DataTypes.INTEGER,
        allowNull: false,
      },
      licensePlate: {
        type: DataTypes.STRING,
        allowNull: false,
      },
      providerId: {
        type: DataTypes.INTEGER,
        references: {
          model: 'providers', // Make sure this matches the table name of your Provider model
          key: 'id',
        },
      },
      createdAt: {
        type: DataTypes.DATE,
        allowNull: false,
        defaultValue: DataTypes.NOW,
      },
      updatedAt: {
        type: DataTypes.DATE,
        allowNull: false,
        defaultValue: DataTypes.NOW,
      },
    };

    const options = {
      tableName: tableName,
      timestamps: true,
    };

    this.vehicleModel = sequelizeClient.sequelize.define('Vehicle', columns, options);

    // Define the associations
    this.vehicleModel.associate = function(models) {
      this.belongsTo(models.Provider, { foreignKey: 'providerId' });
    };
    console.log('SequelizeVehiclesRepository Started');
  }
}
module.exports = SequelizeVehiclesRepository;