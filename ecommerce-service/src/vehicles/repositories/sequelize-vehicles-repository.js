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

    this.vehicleModel = sequelizeClient.sequelize.define('Vehicle', columns, options);

    // this.vehicleModel.belongsTo(sequelizeClient.sequelize.models.Provider)

    this.vehicleModel.belongsTo(sequelizeClient.sequelize.models.Provider, {
      foreignKey: "providerId",
      as: "provider"
    });

    this.vehicleModel.belongsToMany(sequelizeClient.sequelize.models.Category, {
      as: "categories",
      through:'vehicles_categories',
      foreignKey: "vehicleId",
      otherKey: "categoryId",
      timestamps: false
    });


    // Define the associations
    // this.vehicleModel.associate = function (models) {
    //   this.vehicleModel.belongsTo(models.Provider, {foreignKey: "providerId", as: "Provider"});
    // };
    console.log('SequelizeVehiclesRepository Started');
  }

  async getAll() {
    return await this.vehicleModel.findAll({raw: true});
  }

  async getOne(id) {
    try {
      return await this.vehicleModel.findByPk(id, {
        include: [
          {
            model: this.vehicleModel.sequelize.models.Provider,
            as: 'provider',
          },
          {
            model: this.vehicleModel.sequelize.models.Category,
            as: 'categories',
          }
        ]
      });
    } catch (error) {
      console.error('Error in getOne:', error);
      throw error;
    }
  }

  async create(data) {

    try {
      const model = await this.vehicleModel.create(data);
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

      await this.vehicleModel.update(data, options);
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
    await this.vehicleModel.destroy(options);
  }
}

module.exports = SequelizeVehiclesRepository;