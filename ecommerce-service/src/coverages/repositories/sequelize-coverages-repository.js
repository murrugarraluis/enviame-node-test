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

    this.coverageModel = sequelizeClient.sequelize.define('Coverage', columns, options);

    // Define the associations
    this.coverageModel.associate = function(models) {
      this.belongsTo(models.Vehicle, { foreignKey: 'vehicleId' });
      this.belongsTo(models.Provider, { foreignKey: 'providerId' });
    };
    console.log('SequelizeCoveragesRepository Started');
  }

  async getAll() {
    return await this.coverageModel.findAll({raw: true});
  }

  async getOne(id) {

    return await this.coverageModel.findByPk(id);

  }

  async create(data) {

    const model = await this.coverageModel.create(data);
    return model.id;

  }

  async update(data) {

    const options = {
      where: {
        id: data.id,
      }
    };

    await this.coverageModel.update(data, options);

  }

  async delete(id) {

    const options = {
      where: {
        id: id,
      }
    };

    await this.coverageModel.destroy(options);

  }
}
module.exports = SequelizeCoveragesRepository;