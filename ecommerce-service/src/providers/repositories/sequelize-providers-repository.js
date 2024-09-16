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

    this.providerModel = sequelizeClient.sequelize.define('Provider', columns, options);

    // Define the associations
    this.providerModel.associate = function (models) {
      this.providerModel.hasMany(models.Vehicle, {foreignKey: 'providerId', as: 'Vehicle'});
    };

    console.log('SequelizeProvidersRepository Started');
  }

  async getAll() {
    return await this.providerModel.findAll({raw: true});
  }

  async getOne(id) {

    return await this.providerModel.findByPk(id);

  }

  async create(data) {

    const model = await this.providerModel.create(data);
    return model.id;

  }

  async update(data) {

    const options = {
      where: {
        id: data.id,
      }
    };

    await this.providerModel.update(data, options);

  }

  async delete(id) {

    const options = {
      where: {
        id: id,
      }
    };

    await this.providerModel.destroy(options);

  }
}
module.exports = SequelizeProvidersRepository;