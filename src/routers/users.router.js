const UsersController = require("../controllers/users.controller");

const UsersRouter = {
  "/signup": { POST: UsersController.signUpUser }
};

module.exports = UsersRouter;
