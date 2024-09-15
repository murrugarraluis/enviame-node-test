const createExpressApp = require('./frameworks/http/express');
const SequelizeClient = require('./frameworks/db/sequelize');

const SequelizeCategoriesRepository = require('./categories/repositories/sequelize-categories-repository');
const SequelizePlacesRepository = require('./places/repositories/sequelize-places-repository');
const SequelizeProvidersRepository = require('./providers/repositories/sequelize-providers-repository');
const SequelizeUsersRepository = require('./users/repositories/sequelize-users-repository');
const SequelizeVehiclesRepository = require('./vehicles/repositories/sequelize-vehicles-repository');
const SequelizeVehiclesCategoriesRepository = require('./associations/repositories/sequelize-vehicles-categories-repository');
const SequelizeCoveragesRepository = require('./coverages/repositories/sequelize-coverages-repository');
const SequelizePricesRepository = require('./coverages/repositories/sequelize-prices-repository');
const SequelizeQuotationsRepository = require('./quotations/repositories/sequelize-quotations-repository');
const SequelizeQuotationsPlacesRepository = require('./associations/repositories/sequelize-quotations-places-repository');
const SequelizeCoveragesPlacesRepository = require('./associations/repositories/sequelize-coverages-places-repository');


const sequelizeClient = new SequelizeClient();

const sequelizeBooksRepository = new SequelizeCategoriesRepository(sequelizeClient);
const sequelizePlacesRepository = new SequelizePlacesRepository(sequelizeClient);
const sequelizeProvidersRepository = new SequelizeProvidersRepository(sequelizeClient);
const sequelizeUsersRepository = new SequelizeUsersRepository(sequelizeClient);
const sequelizeVehiclesRepository = new SequelizeVehiclesRepository(sequelizeClient);
const sequelizeVehiclesCategoriesRepository = new SequelizeVehiclesCategoriesRepository(sequelizeClient);
const sequelizeCoveragesRepository = new SequelizeCoveragesRepository(sequelizeClient);
const sequelizePricesRepository = new SequelizePricesRepository(sequelizeClient);
const sequelizeQuotationRepository = new SequelizeQuotationsRepository(sequelizeClient);
const sequelizeQuotationsPlacesRepository = new SequelizeQuotationsPlacesRepository(sequelizeClient);
const sequelizeCoveragesPlacesRepository = new SequelizeCoveragesPlacesRepository(sequelizeClient);

sequelizeClient.syncDatabase();


let routers = [];

const app = createExpressApp(routers);