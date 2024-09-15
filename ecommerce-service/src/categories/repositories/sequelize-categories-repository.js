const {log} = require('console');
const {DataTypes} = require('sequelize');

class SequelizeCategoriesRepository {
  constructor(sequelizeClient, test = false) {

    this.sequelizeClient = sequelizeClient;
    this.test = test;

    let tableName = "categories";

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

    this.categoryModel = sequelizeClient.sequelize.define('Category', columns, options);
    console.log('SequelizeCategoriesRepository Started');
  }

  async getAll() {
    return await this.categoryModel.findAll({raw: true});
  }

  async getOne(id) {

    return await this.categoryModel.findByPk(id);

  }

  async create(data) {

    const model = await this.categoryModel.create(data);
    return model.id;

  }

  async update(data) {

    const options = {
      where: {
        id: data.id,
      }
    };

    await this.categoryModel.update(data, options);

  }

  async delete(id) {

    const options = {
      where: {
        id: id,
      }
    };

    await this.categoryModel.destroy(options);

  }
}

module.exports = SequelizeCategoriesRepository;