const startServer = require('./src/server');
const { port, databaseUrl } = require('./config');
const connectToDB = require('./src/modules/db/connect-db');

startServer(port);
connectToDB(databaseUrl);