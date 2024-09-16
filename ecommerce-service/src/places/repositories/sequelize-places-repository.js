const {log} = require('console');
const {DataTypes} = require('sequelize');

class SequelizePlacesRepository {
  constructor(sequelizeClient, test = false) {

    this.sequelizeClient = sequelizeClient;
    this.test = test;

    let tableName = "places";

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
      deletedAt: {
        type: DataTypes.DATE,
        allowNull: true,
      },
    };

    const options = {
      tableName: tableName,
      timestamps: true,
      paranoid: true,

    };

    this.placeModel = sequelizeClient.sequelize.define('Place', columns, options);
    console.log('SequelizePlacesRepository Started');
  }
  async getAll() {
    return await this.placeModel.findAll({raw: true});
  }

  async getOne(id) {

    return await this.placeModel.findByPk(id);

  }

  async create(data) {

    const model = await this.placeModel.create(data);
    return model.id;

  }

  async update(data) {

    const options = {
      where: {
        id: data.id,
      }
    };

    await this.placeModel.update(data, options);

  }

  async delete(id) {

    const options = {
      where: {
        id: id,
      }
    };

    await this.placeModel.destroy(options);

  }
}
module.exports = SequelizePlacesRepository;