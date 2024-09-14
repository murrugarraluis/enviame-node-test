const {log} = require('console');
const {DataTypes} = require('sequelize');

class SequelizeCoveragesRepository {
  constructor(sequelizeClient, test = false) {

    this.sequelizeClient = sequelizeClient;
    this.test = test;

    let tableName = "coverages";

    if (test) {
      tableName += "_test";
    }

    const columns = {

      id: {
        type: DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: true,
      },
      vehicleId: {
        type: DataTypes.INTEGER,
        references: {
          model: 'vehicles',
          key: 'id',
        },
      },
      providerId: {
        type: DataTypes.INTEGER,
        references: {
          model: 'providers',
          key: 'id',
        },
      },
      departureTime: {
        type: DataTypes.TIME,
        allowNull: false,
      },
      arrivalTime: {
        type: DataTypes.TIME,
        allowNull: false,
      },
      duration: {
        type: DataTypes.TIME,
        allowNull: false,
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

    this.coverageModel = sequelizeClient.sequelize.define('Coverage', columns, options);

    // Define the associations
    this.coverageModel.associate = function(models) {
      this.belongsTo(models.Vehicle, { foreignKey: 'vehicleId' });
      this.belongsTo(models.Provider, { foreignKey: 'providerId' });
    };
    console.log('SequelizeCoveragesRepository Started');
  }
}
module.exports = SequelizeCoveragesRepository;