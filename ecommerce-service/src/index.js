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

const sequelizeCategoriesRepository = new SequelizeCategoriesRepository(sequelizeClient);
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

const createCategoriesRouter = require('./categories/http/categories-router');
const ManageCategoriesUsecase = require('./categories/usecases/manage-categories-usecase');

const createPlacesRouter = require('./places/http/places-router');
const ManagePlacesUsecase = require('./places/usecases/manage-places-usecase');

const createProvidersRouter = require('./providers/http/providers-router');
const ManageProvidersUsecase = require('./providers/usecases/manage-providers-usecase');

const createUsersRouter = require('./users/http/users-router');
const ManageUsersUsecase = require('./users/usecases/manage-users-usecase');

const createVehiclesRouter = require('./vehicles/http/vehicles-router');
const ManageVehiclesUsecase = require('./vehicles/usecases/manage-vehicles-usecase');

const createCoveragesRouter = require('./coverages/http/coverages-router');
const ManageCoveragesUsecase = require('./coverages/usecases/manage-coverages-usecase');

sequelizeClient.syncDatabase();

const manageCategoriesUsecase = new ManageCategoriesUsecase(sequelizeCategoriesRepository);
const managePlacesUsecase = new ManagePlacesUsecase(sequelizePlacesRepository);
const manageProvidersUsecase = new ManageProvidersUsecase(sequelizeProvidersRepository);
const manageUsersUsecase = new ManageUsersUsecase(sequelizeUsersRepository);
const manageVehiclesUsecase = new ManageVehiclesUsecase(sequelizeVehiclesRepository);
const manageCoveragesUsecase = new ManageCoveragesUsecase(sequelizeCoveragesRepository);


let routers = [
  createCategoriesRouter(manageCategoriesUsecase),
  createPlacesRouter(managePlacesUsecase),
  createProvidersRouter(manageProvidersUsecase),
  createUsersRouter(manageUsersUsecase),
  createVehiclesRouter(manageVehiclesUsecase),
  createCoveragesRouter(manageCoveragesUsecase)
];

const app = createExpressApp(routers);