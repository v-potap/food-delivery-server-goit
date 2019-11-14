const dbUser = "admin";
const dbPassword = "qazwsx123";

config = {
  port: 3001,
  dbUser,
  dbPassword,
  databaseUrl: `mongodb+srv://${dbUser}:${dbPassword}@goit-bc13-nodejs-emarb.mongodb.net/test?retryWrites=true&w=majority`
  // databaseUrl: `mongodb://${dbUser}:${dbPassword}@ds159020.mlab.com:59020/marketplace-test`
  // mongodb+srv://admin:<password>@goit-bc13-nodejs-emarb.mongodb.net/test?retryWrites=true&w=majority
};

module.exports = config;
