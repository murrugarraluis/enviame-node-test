const {log} = require('console');
const {DataTypes} = require('sequelize');

class SequelizeCoveragesPlacesRepository {
  constructor(sequelizeClient, test = false) {

    this.sequelizeClient = sequelizeClient;
    this.test = test;

    let tableName = "coverages_places";

    if (test) {
      tableName += "_test";
    }

    const columns = {
      coverageId: {
        type: DataTypes.INTEGER,
        references: {
          model: 'coverages',
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

    this.coveragePlaceModel = sequelizeClient.sequelize.define('Coverage Place', columns, options);

    // Define the associations
    this.coveragePlaceModel.associate = function(models) {
      this.belongsTo(models.Coverage, { foreignKey: 'coverageId' });
      this.belongsTo(models.Place, { foreignKey: 'placeId' });
    };
    console.log('SequelizeCoveragesPlacesRepository Started');
  }
}
module.exports = SequelizeCoveragesPlacesRepository;