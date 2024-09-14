const createExpressApp = require('./frameworks/http/express');
const SequelizeClient = require('./frameworks/db/sequelize');

const SequelizeCategoriesRepository = require('./categories/repositories/sequelize-categories-repository');
const SequelizePlacesRepository = require('./places/repositories/sequelize-places-repository');
const SequelizeProvidersRepository = require('./providers/repositories/sequelize-providers-repository');
const SequelizeUsersRepository = require('./users/repositories/sequelize-users-repository');


const sequelizeClient = new SequelizeClient();

const sequelizeBooksRepository = new SequelizeCategoriesRepository(sequelizeClient);
const sequelizePlacesRepository = new SequelizePlacesRepository(sequelizeClient);
const sequelizeProvidersRepository = new SequelizeProvidersRepository(sequelizeClient);
const sequelizeUsersRepository = new SequelizeUsersRepository(sequelizeClient);



sequelizeClient.syncDatabase();


let routers = [];

const app = createExpressApp(routers);