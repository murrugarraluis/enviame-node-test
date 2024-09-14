const {log} = require('console');
const {DataTypes} = require('sequelize');

class SequelizeProvidersRepository {
  constructor(sequelizeClient, test = false) {

    this.sequelizeClient = sequelizeClient;
    this.test = test;

    let tableName = "providers";

    if (test) {
      tableName += "_test";
    }

    const columns = {

      id: {
        type: DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: true,
      },
      name: DataTypes.STRING,
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

    this.bookModel = sequelizeClient.sequelize.define('Provider', columns, options);
    console.log('SequelizeProvidersRepository Started');
  }
}
module.exports = SequelizeProvidersRepository;