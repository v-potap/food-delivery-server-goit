var express = require("express");

const UsersController = require("../controllers/users.controller");
const DefaultController = require("../controllers/default.controller");

const usersRouter = express.Router();

usersRouter
  .post("/", UsersController.signUpUser)
  .get("/:id", UsersController.getUsersByID)
  .put("/:id", UsersController.updateUserByID)
  .get("*", DefaultController.defaultMethod);

module.exports = usersRouter;
