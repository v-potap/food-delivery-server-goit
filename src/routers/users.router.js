const UsersController = require("../controllers/users.controller");
const DefaultController = require("../controllers/default.controller");

const UsersRouter = {
  "/signup": {
    POST: UsersController.signUpUser,
    default: DefaultController.defaultMethod
  }
};

module.exports = UsersRouter;
