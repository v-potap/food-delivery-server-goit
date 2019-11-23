const dbUser = "admin";
const dbPassword = "qazwsx123";

config = {
  port: 3001,
  dbUser,
  dbPassword,
  databaseUrl: `mongodb+srv://admin:${dbPassword}@goit-bc13-nodejs-emarb.mongodb.net/HWofNodeJSCourse?retryWrites=true&w=majority`
};

module.exports = config;
