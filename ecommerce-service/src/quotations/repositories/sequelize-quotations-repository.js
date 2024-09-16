const {log} = require('console');
const {DataTypes, Op} = require('sequelize');

class SequelizeQuotationsRepository {
  constructor(sequelizeClient, test = false) {

    this.sequelizeClient = sequelizeClient;
    this.test = test;

    let tableName = "quotations";

    if (test) {
      tableName += "_test";
    }

    const columns = {

      id: {
        type: DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: true,
      },
      uuid: {
        type: DataTypes.UUID,
        defaultValue: DataTypes.UUIDV4,
        allowNull: false,
        unique: true,
      },
      userId: {
        type: DataTypes.INTEGER,
        references: {
          model: 'users',
          key: 'id',
        },
      },
      coverageId: {
        type: DataTypes.INTEGER,
        references: {
          model: 'coverages',
          key: 'id',
        },
      },
      priceId: {
        type: DataTypes.INTEGER,
        references: {
          model: 'prices',
          key: 'id',
        },
      },
      travelDate: {
        type: DataTypes.DATE,
        allowNull: true,
      },
      passengerCount: {
        type: DataTypes.INTEGER,
        allowNull: true,
      },
      category: {
        type: DataTypes.STRING,
        allowNull: true,
      },
      status: {
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
      },
    };

    const options = {
      tableName: tableName,
      timestamps: true,
      paranoid: true,

    };

    this.quotationModel = sequelizeClient.sequelize.define('Quotation', columns, options);

    // Define the associations
    this.quotationModel.associate = function (models) {
      this.belongsTo(models.User, {foreignKey: 'userId'});
      this.belongsTo(models.Coverage, {foreignKey: 'coverageId'});
      this.belongsTo(models.Price, {foreignKey: 'priceId'});
    };
    console.log('SequelizeQuotationsRepository Started');
  }

  async getAll(query) {
    const { startDate, endDate } = query;
    let whereClause = {};

    if (startDate && endDate) {
      whereClause.travelDate = {
        [Op.between]: [new Date(startDate), new Date(endDate)]
      };
    } else if (startDate) {
      whereClause.travelDate = {
        [Op.gte]: new Date(startDate)
      };
    } else if (endDate) {
      whereClause.travelDate = {
        [Op.lte]: new Date(endDate)
      };
    }

    return await this.quotationModel.findAll({
      where: whereClause,
      raw: true
    });  }

  async getOne(id) {

    return await this.quotationModel.findByPk(id);

  }

  async create(data) {

    try {
      const model = await this.quotationModel.create(data);
      return model.uuid;
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

      await this.quotationModel.update(data, options);
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

    await this.quotationModel.destroy(options);

  }
}

module.exports = SequelizeQuotationsRepository;