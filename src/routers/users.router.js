const UsersController = require("../controllers/users.controller");

const UsersRouter = {
  "POST /signup": UsersController.signUpUser,
};

module.exports = UsersRouter;
