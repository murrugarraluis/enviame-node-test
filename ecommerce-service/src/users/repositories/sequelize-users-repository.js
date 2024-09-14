const {log} = require('console');
const {DataTypes} = require('sequelize');

class SequelizeUsersRepository {
  constructor(sequelizeClient, test = false) {

    this.sequelizeClient = sequelizeClient;
    this.test = test;

    let tableName = "users";

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
      lastname: DataTypes.STRING,
      email: {
        type: DataTypes.STRING,
        allowNull: false,
        unique: true,
      },
      password: {
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

    this.bookModel = sequelizeClient.sequelize.define('User', columns, options);
    console.log('SequelizeUsersRepository Started');
  }
}
module.exports = SequelizeUsersRepository;