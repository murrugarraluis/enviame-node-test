const {log} = require('console');
const {DataTypes} = require('sequelize');

class SequelizePricesRepository {
  constructor(sequelizeClient, test = false) {

    this.sequelizeClient = sequelizeClient;
    this.test = test;

    let tableName = "prices";

    if (test) {
      tableName += "_test";
    }

    const columns = {

      id: {
        type: DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: true,
      },
      coverageId: {
        type: DataTypes.INTEGER,
        references: {
          model: 'coverages',
          key: 'id',
        },
      },
      startDate: {
        type: DataTypes.DATE,
        allowNull: false,
      },
      endDate: {
        type: DataTypes.DATE,
        allowNull: false,
      },
      amount: {
        type: DataTypes.FLOAT,
        allowNull: false,
      },
      currency: {
        type: DataTypes.STRING,
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

    this.priceModel = sequelizeClient.sequelize.define('Price', columns, options);

    // Define the associations
    this.priceModel.associate = function(models) {
      this.belongsTo(models.Coverage, { foreignKey: 'coverageId' });
    };
    console.log('SequelizePricesRepository Started');
  }
}
module.exports = SequelizePricesRepository;