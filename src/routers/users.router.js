var express = require("express");

const UsersController = require("../controllers/users.controller");
const DefaultController = require("../controllers/default.controller");

const usersRouter = express.Router();

usersRouter
  .post("/", UsersController.signUpUser)
  .get("/", UsersController.getUsersByQuery)
  .get("/:id([1-9][0-9]{7})", UsersController.getUsersByID)
  .get("*", DefaultController.defaultMethod);

module.exports = usersRouter;
