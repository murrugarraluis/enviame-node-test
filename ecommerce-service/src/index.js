const createExpressApp = require('./frameworks/http/express');
const SequelizeClient = require('./frameworks/db/sequelize');

const SequelizeCategoriesRepository = require('./categories/repositories/sequelize-categories-repository');


const sequelizeClient = new SequelizeClient();
const sequelizeBooksRepository = new SequelizeCategoriesRepository(sequelizeClient);
sequelizeClient.syncDatabase();


let routers = [];

const app = createExpressApp(routers);