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
      deletedAt: {
        type: DataTypes.DATE,
        allowNull: true,
        paranoid: true,
      },
    };

    const options = {
      tableName: tableName,
      timestamps: true,
    };

    this.userModel = sequelizeClient.sequelize.define('User', columns, options);
    console.log('SequelizeUsersRepository Started');
  }

  async getAll() {
    return await this.userModel.findAll({raw: true});
  }

  async getOne(id) {

    return await this.userModel.findByPk(id);

  }

  async create(data) {

    try {
      const model = await this.userModel.create(data);
      return model.id;
    } catch (error) {
      throw error;
    }
  }

  async update(data) {

    try {
      const options = {
        where: {
          id: data.id,
        }
      };

      await this.userModel.update(data, options);
    } catch (error) {
      throw error;
    }

  }

  async delete(id) {

    const options = {
      where: {
        id: id,
      }
    };

    await this.userModel.destroy(options);

  }
}
module.exports = SequelizeUsersRepository;