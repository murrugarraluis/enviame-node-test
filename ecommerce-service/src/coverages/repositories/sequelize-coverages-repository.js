const {log} = require('console');
const {DataTypes, QueryTypes} = require('sequelize');

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


    this.coverageModel.belongsTo(sequelizeClient.sequelize.models.Vehicle, {
      foreignKey: "vehicleId",
      as: "vehicle"
    });
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
    let query = `
        SELECT c.id as id,
               p.id as priceId,
               p.amount as amount,
               p.currency,
               v.brand,
               v.model,
               cate.name as category
        FROM coverages c
        INNER JOIN coverages_places cp1 ON c.id = cp1.coverageId
        INNER JOIN coverages_places cp2 ON c.id = cp2.coverageId
        INNER JOIN prices p on c.id = p.coverageId
        INNER JOIN vehicles v on c.vehicleId = v.id
        INNER JOIN vehicles_categories vc on v.id = vc.vehicleId
        INNER JOIN categories cate on vc.categoryId = cate.id
        WHERE (cp1.placeId = :originId AND cp1.type = 'ORIGEN')
          AND (cp2.placeId = :destinationId AND cp2.type = 'DESTINO')
          AND (:travelDate BETWEEN p.startDate AND p.endDate)
          AND (:passengerCount <= vc.maximumCapacity)
      `;
    const replacements = {originId, destinationId, travelDate, passengerCount};

    if (category) {
      query += ' AND (cate.name LIKE :categoryName)';
      replacements.categoryName = category;
    }
    try {
      return await this.sequelizeClient.sequelize.query(query, {
        replacements,
        type: QueryTypes.SELECT
      });
    } catch (error) {
      throw new Error(`Error while searching coverages: ${error.message}`);
    }
  }
}

module.exports = SequelizeCoveragesRepository;