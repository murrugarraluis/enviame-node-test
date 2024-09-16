const {log} = require('console');
const {DataTypes, Op} = require('sequelize');

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

    this.coverageModel = this.sequelizeClient.sequelize.define('Coverage', columns, options);

    // this.coverageModel.associate = (models) => {
    //   // this.coverageModel.belongsTo(models.Vehicle, { foreignKey: 'vehicleId' });
    //   // this.coverageModel.belongsTo(models.Provider, { foreignKey: 'providerId' });
    //   // this.coverageModel.belongsToMany(models.CoveragePlace, { foreignKey: 'coverageId', as: 'places' });
    //   // this.coverageModel.hasMany(models.Price, { foreignKey: 'coverageId', as: 'prices' });
    // };


    // this.coverageModel.belongsTo(sequelizeClient.sequelize.models.Vehicle, {
    //   foreignKey: "vehicleId",
    //   as: "vehicle"
    // });
    // this.coverageModel.belongsTo(sequelizeClient.sequelize.models.Provider, {
    //   foreignKey: "providerId",
    //   as: "provider"
    // });

    this.coverageModel.belongsToMany(sequelizeClient.sequelize.models.Place, {
      as: "originPlace",
      through: 'coverages_places',
      foreignKey: "coverageId",
      otherKey: "placeId",
      timestamps: false
    });
    this.coverageModel.belongsToMany(sequelizeClient.sequelize.models.Place, {
      as: "destinationPlace",
      through: 'coverages_places',
      foreignKey: "coverageId",
      otherKey: "placeId",
      timestamps: false
    });
    // this.coverageModel.hasMany(sequelizeClient.sequelize.models.Price, {
    //   foreignKey: "coverageId",
    //   as: "prices"
    // });


    console.log('SequelizeCoveragesRepository Started');
  }

  async getAll() {
    return await this.coverageModel.findAll({raw: true});
  }

  async getOne(id) {

    return await this.coverageModel.findByPk(id);

  }

  async create(data) {

    try {
      const model = await this.coverageModel.create(data);
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

      await this.coverageModel.update(data, options);
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

    await this.coverageModel.destroy(options);

  }

  async search(originId, destinationId, travelDate, passengerCount, category) {
    const {Coverage, Place, Price, VehicleCategory, Vehicle, Category} = this.sequelizeClient.sequelize.models

    try {
      const results = await Coverage.findAll({
        include: [
          {
            model: Place,
            as: 'originPlace',  // Alias para el lugar de origen
            required: true,
            through: {
              attributes: [],  // No necesitas atributos adicionales de la tabla pivot aquí
              where: {
                placeId: originId,
                type: 'ORIGEN'
              }
            }
          },
          {
            model: Place,
            as: 'destinationPlace',  // Alias para el lugar de destino
            required: true,
            through: {
              attributes: [],  // No necesitas atributos adicionales de la tabla pivot aquí
              where: {
                placeId: destinationId,
                type: 'DESTINO'
              }
            }
          }
          // {
          //   model: Price,
          //   as: 'prices',
          //   required: true,
          //   where: {
          //     startDate: {[Op.lte]: travelDate},
          //     endDate: {[Op.gte]: travelDate}
          //   }
          // },
          // {
          //   model: Vehicle,
          //   as: 'vehicle',
          //   include: [
          //     {
          //       model: VehicleCategory,
          //       as: 'vehicleCategories',
          //       required: true,
          //       where: {
          //         maximumCapacity: {[Op.gte]: passengerCount},
          //       },
          //       include: [
          //         {
          //           model: Category,
          //           as: 'categories',
          //           required: true,
          //           where: {
          //             ...(category !== null && {name: category})
          //           }
          //         }
          //       ]
          //     }
          //   ]
          // }
        ],
        raw: true,
        nest: true,
        logging: console.log
      });

      return results;
    } catch (error) {
      throw new Error(`Error while searching coverages: ${error.message}`);
    }
  }
}

module.exports = SequelizeCoveragesRepository;