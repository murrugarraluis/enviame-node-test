const createExpressApp = require('./frameworks/http/express');
const SequelizeClient = require('./frameworks/db/sequelize');

const sequelizeClient = new SequelizeClient();
sequelizeClient.syncDatabase();


let routers = [];

const app = createExpressApp(routers);