const {log} = require('console');
const {DataTypes} = require('sequelize');

class SequelizeQuotationsPlacesRepository {
  constructor(sequelizeClient, test = false) {

    this.sequelizeClient = sequelizeClient;
    this.test = test;

    let tableName = "quotations_places";

    if (test) {
      tableName += "_test";
    }

    const columns = {
      quotationId: {
        type: DataTypes.INTEGER,
        references: {
          model: 'quotations',
          key: 'id',
        },
        primaryKey: true,
      },
      placeId: {
        type: DataTypes.INTEGER,
        references: {
          model: 'places',
          key: 'id',
        },
        primaryKey: true,
      },
      type: {
        type: DataTypes.STRING,
        allowNull: false,
        validate: {
          isIn: [['origin', 'destination']],
        },
      },
    };

    const options = {
      tableName: tableName,
      timestamps: false,
    };

    this.quotationPlaceModel = sequelizeClient.sequelize.define('QuotationPlace', columns, options);

    // Define the associations
    this.quotationPlaceModel.associate = function(models) {
      this.belongsTo(models.Quotation, { foreignKey: 'quotationId' });
      this.belongsTo(models.Place, { foreignKey: 'placeId' });
    };
    console.log('SequelizeQuotationsPlacesRepository Started');
  }
}
module.exports = SequelizeQuotationsPlacesRepository;